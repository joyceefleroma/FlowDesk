const cron = require('node-cron');
const Task = require('../models/Task');
const Workflow = require('../models/Workflow');
const eventBus = require('../engine/eventBus');
const { checkAndLockExecution } = require('../engine/dedupService');
const { evaluateAllConditions } = require('../engine/conditionEvaluator');
const { executeAllActions } = require('../engine/actionExecutor');
const { logExecution } = require('../engine/executionLogger');
const { TRIGGER_TYPE, TASK_STATUS, EXECUTION_STATUS } = require('../config/constants');

/**
 * Scans tasks for approaching deadlines and executes matching workflows with deduplication.
 */
const checkApproachingDeadlines = async () => {
  try {
    const activeWorkflows = await Workflow.find({
      'trigger.type': TRIGGER_TYPE.DEADLINE_APPROACHING,
      isActive: true
    }).lean();

    if (!activeWorkflows || activeWorkflows.length === 0) return;

    const now = new Date();

    for (const workflow of activeWorkflows) {
      const advanceHours = workflow.trigger?.config?.advanceNoticeHours || 24;
      const targetThreshold = new Date(now.getTime() + advanceHours * 60 * 60 * 1000);

      // Find user tasks due between now and threshold that are not completed
      const matchingTasks = await Task.find({
        user: workflow.user,
        status: { $in: [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS] },
        dueDate: { $gte: now, $lte: targetThreshold }
      });

      for (const task of matchingTasks) {
        // Deduplication check: prevent duplicate notifications for this task window
        const isDuplicate = await checkAndLockExecution(
          workflow._id,
          task._id,
          TRIGGER_TYPE.DEADLINE_APPROACHING,
          advanceHours,
          workflow.user
        );

        if (isDuplicate) continue;

        const wfStartTime = Date.now();
        const conditionEvaluation = evaluateAllConditions(workflow.conditions, task);

        if (!conditionEvaluation.allPassed) {
          await logExecution({
            userId: workflow.user,
            workflowId: workflow._id,
            workflowName: workflow.name,
            taskId: task._id,
            taskTitle: task.title,
            triggerType: TRIGGER_TYPE.DEADLINE_APPROACHING,
            status: EXECUTION_STATUS.SKIPPED,
            evaluatedConditions: conditionEvaluation.results,
            actionsExecuted: [],
            executionDurationMs: Date.now() - wfStartTime
          });
          continue;
        }

        const actionResults = await executeAllActions(workflow.actions, task, workflow);
        const hasErrors = actionResults.some(r => r.status === 'FAILED');

        await logExecution({
          userId: workflow.user,
          workflowId: workflow._id,
          workflowName: workflow.name,
          taskId: task._id,
          taskTitle: task.title,
          triggerType: TRIGGER_TYPE.DEADLINE_APPROACHING,
          status: hasErrors ? EXECUTION_STATUS.FAILED : EXECUTION_STATUS.SUCCESS,
          evaluatedConditions: conditionEvaluation.results,
          actionsExecuted: actionResults,
          errorMessage: hasErrors ? actionResults.find(r => r.error)?.error : null,
          executionDurationMs: Date.now() - wfStartTime
        });
      }
    }
  } catch (err) {
    console.error('[Scheduler: checkApproachingDeadlines Error]', err.message);
  }
};

/**
 * Scans tasks that are past their due date and marks them as OVERDUE, triggering workflows.
 */
const checkOverdueTasks = async () => {
  try {
    const now = new Date();

    const overdueTasks = await Task.find({
      status: { $in: [TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS] },
      dueDate: { $lt: now }
    });

    for (const task of overdueTasks) {
      task.status = TASK_STATUS.OVERDUE;
      task.lastAutomatedAt = new Date();
      await task.save();

      // Emit TASK_OVERDUE event
      eventBus.emitAsync(TRIGGER_TYPE.TASK_OVERDUE, {
        user: task.user,
        taskId: task._id,
        task,
        context: { originTrigger: 'CRON_OVERDUE', depth: 0 }
      });
    }
  } catch (err) {
    console.error('[Scheduler: checkOverdueTasks Error]', err.message);
  }
};

/**
 * Starts the node-cron scheduler.
 */
const startScheduler = () => {
  const cronExpression = process.env.CRON_SCHEDULE || '*/5 * * * *';
  console.log(`[Scheduler] Initializing automated cron poller with schedule: "${cronExpression}"`);

  cron.schedule(cronExpression, async () => {
    console.log(`[Scheduler Tick] Running periodic automation scan at ${new Date().toISOString()}...`);
    await checkOverdueTasks();
    await checkApproachingDeadlines();
  });
};

module.exports = {
  startScheduler,
  checkApproachingDeadlines,
  checkOverdueTasks
};
