const Workflow = require('../models/Workflow');
const Task = require('../models/Task');
const { evaluateAllConditions } = require('../engine/conditionEvaluator');

const createWorkflow = async (userId, workflowData) => {
  return Workflow.create({
    ...workflowData,
    user: userId
  });
};

const getWorkflows = async (userId, queryParams = {}) => {
  const query = { user: userId };
  if (queryParams.isActive !== undefined) {
    query.isActive = queryParams.isActive === 'true';
  }

  return Workflow.find(query).sort({ createdAt: -1 });
};

const getWorkflowById = async (userId, workflowId) => {
  const workflow = await Workflow.findOne({ _id: workflowId, user: userId });
  if (!workflow) {
    const error = new Error('Workflow not found.');
    error.statusCode = 404;
    throw error;
  }
  return workflow;
};

const updateWorkflow = async (userId, workflowId, updateData) => {
  const workflow = await Workflow.findOneAndUpdate(
    { _id: workflowId, user: userId },
    updateData,
    { new: true, runValidators: true }
  );

  if (!workflow) {
    const error = new Error('Workflow not found.');
    error.statusCode = 404;
    throw error;
  }

  return workflow;
};

const toggleWorkflowActive = async (userId, workflowId, isActive) => {
  const workflow = await Workflow.findOneAndUpdate(
    { _id: workflowId, user: userId },
    { isActive },
    { new: true }
  );

  if (!workflow) {
    const error = new Error('Workflow not found.');
    error.statusCode = 404;
    throw error;
  }

  return workflow;
};

const deleteWorkflow = async (userId, workflowId) => {
  const workflow = await Workflow.findOneAndDelete({ _id: workflowId, user: userId });
  if (!workflow) {
    const error = new Error('Workflow not found.');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Workflow deleted successfully.' };
};

/**
 * Dry-run simulator: Evaluates conditions against target task without committing mutations.
 */
const testWorkflowSimulation = async (userId, workflowId, taskId) => {
  const [workflow, task] = await Promise.all([
    Workflow.findOne({ _id: workflowId, user: userId }),
    Task.findOne({ _id: taskId, user: userId })
  ]);

  if (!workflow) {
    const error = new Error('Workflow not found.');
    error.statusCode = 404;
    throw error;
  }

  if (!task) {
    const error = new Error('Task not found for simulation.');
    error.statusCode = 404;
    throw error;
  }

  const evaluation = evaluateAllConditions(workflow.conditions, task);

  return {
    workflowName: workflow.name,
    taskTitle: task.title,
    triggerType: workflow.trigger.type,
    conditionsMet: evaluation.allPassed,
    evaluatedConditions: evaluation.results,
    actionsConfigured: workflow.actions,
    simulationSummary: evaluation.allPassed
      ? `All ${workflow.conditions.length} conditions matched! In live execution, ${workflow.actions.length} action(s) would trigger.`
      : `Conditions were NOT met. Workflow would be skipped in live execution.`
  };
};

module.exports = {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  toggleWorkflowActive,
  deleteWorkflow,
  testWorkflowSimulation
};
