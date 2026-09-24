const AutomationLog = require('../models/AutomationLog');
const Workflow = require('../models/Workflow');
const { EXECUTION_STATUS } = require('../config/constants');

/**
 * Persists execution telemetry into MongoDB.
 */
const logExecution = async ({
  userId,
  workflowId,
  workflowName,
  taskId = null,
  taskTitle = '',
  triggerType,
  status = EXECUTION_STATUS.SUCCESS,
  evaluatedConditions = [],
  actionsExecuted = [],
  errorMessage = null,
  executionDurationMs = 0
}) => {
  try {
    const log = await AutomationLog.create({
      user: userId,
      workflowId,
      workflowName,
      taskId,
      taskTitle,
      triggerType,
      status,
      evaluatedConditions,
      actionsExecuted,
      errorMessage,
      executionDurationMs
    });

    // Increment execution count and timestamp on the Workflow document
    if (status === EXECUTION_STATUS.SUCCESS) {
      await Workflow.findByIdAndUpdate(workflowId, {
        $inc: { executionCount: 1 },
        lastExecutedAt: new Date()
      });
    }

    return log;
  } catch (error) {
    console.error('[ExecutionLogger Error]', error.message);
    return null;
  }
};

module.exports = { logExecution };
