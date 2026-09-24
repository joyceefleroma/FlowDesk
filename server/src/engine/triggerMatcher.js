const Workflow = require('../models/Workflow');
const Task = require('../models/Task');
const { evaluateAllConditions } = require('./conditionEvaluator');
const { executeAllActions } = require('./actionExecutor');
const { logExecution } = require('./executionLogger');
const { checkRecursionLimit } = require('./recursionGuard');
const { EXECUTION_STATUS } = require('../config/constants');

/**
 * Handles incoming trigger events, finds matching workflows, and orchestrates execution.
 */
const processTriggerEvent = async (triggerType, payload = {}) => {
  const startTime = Date.now();
  const { user: userId, taskId, task: rawTask, context = {} } = payload;

  if (!userId) return;

  try {
    // Check recursion limit
    if (!checkRecursionLimit(context)) {
      console.warn(`[Engine] Recursion limit exceeded (depth: ${context.depth}). Aborting event cascade.`);
      return;
    }

    // Retrieve active workflows for this user and trigger type
    const workflows = await Workflow.find({
      user: userId,
      'trigger.type': triggerType,
      isActive: true
    }).lean();

    if (!workflows || workflows.length === 0) {
      return; // No active workflows matching trigger
    }

    // Ensure we have current task snapshot
    let task = rawTask;
    if (!task && taskId) {
      task = await Task.findById(taskId).lean();
    }

    if (!task) return;

    // Process each matching workflow
    for (const workflow of workflows) {
      const wfStartTime = Date.now();
      
      // 1. Evaluate Conditions
      const conditionEvaluation = evaluateAllConditions(workflow.conditions, task);

      if (!conditionEvaluation.allPassed) {
        // Skip execution and log evaluation details
        await logExecution({
          userId,
          workflowId: workflow._id,
          workflowName: workflow.name,
          taskId: task._id,
          taskTitle: task.title,
          triggerType,
          status: EXECUTION_STATUS.SKIPPED,
          evaluatedConditions: conditionEvaluation.results,
          actionsExecuted: [],
          executionDurationMs: Date.now() - wfStartTime
        });
        continue;
      }

      // 2. Execute Actions
      const actionResults = await executeAllActions(workflow.actions, task, workflow, context);
      const hasActionErrors = actionResults.some(res => res.status === 'FAILED');

      // 3. Log Telemetry
      await logExecution({
        userId,
        workflowId: workflow._id,
        workflowName: workflow.name,
        taskId: task._id,
        taskTitle: task.title,
        triggerType,
        status: hasActionErrors ? EXECUTION_STATUS.FAILED : EXECUTION_STATUS.SUCCESS,
        evaluatedConditions: conditionEvaluation.results,
        actionsExecuted: actionResults,
        errorMessage: hasActionErrors ? actionResults.find(r => r.error)?.error : null,
        executionDurationMs: Date.now() - wfStartTime
      });
    }
  } catch (error) {
    console.error(`[Engine Error processing ${triggerType}]:`, error.message);
  }
};

module.exports = { processTriggerEvent };
