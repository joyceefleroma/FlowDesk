const workflowService = require('../services/workflowService');

const createWorkflow = async (req, res, next) => {
  try {
    const workflow = await workflowService.createWorkflow(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: 'Workflow created successfully.',
      data: workflow
    });
  } catch (err) {
    next(err);
  }
};

const getWorkflows = async (req, res, next) => {
  try {
    const workflows = await workflowService.getWorkflows(req.user._id, req.query);
    res.status(200).json({
      success: true,
      data: workflows
    });
  } catch (err) {
    next(err);
  }
};

const getWorkflowById = async (req, res, next) => {
  try {
    const workflow = await workflowService.getWorkflowById(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      data: workflow
    });
  } catch (err) {
    next(err);
  }
};

const updateWorkflow = async (req, res, next) => {
  try {
    const workflow = await workflowService.updateWorkflow(req.user._id, req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Workflow updated successfully.',
      data: workflow
    });
  } catch (err) {
    next(err);
  }
};

const toggleWorkflowActive = async (req, res, next) => {
  try {
    const workflow = await workflowService.toggleWorkflowActive(req.user._id, req.params.id, req.body.isActive);
    res.status(200).json({
      success: true,
      message: `Workflow ${req.body.isActive ? 'enabled' : 'disabled'} successfully.`,
      data: workflow
    });
  } catch (err) {
    next(err);
  }
};

const deleteWorkflow = async (req, res, next) => {
  try {
    const result = await workflowService.deleteWorkflow(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    next(err);
  }
};

const testWorkflow = async (req, res, next) => {
  try {
    const result = await workflowService.testWorkflowSimulation(req.user._id, req.params.id, req.body.taskId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  toggleWorkflowActive,
  deleteWorkflow,
  testWorkflow
};
