const taskService = require('../services/taskService');

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully.',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    res.status(200).json({
      success: true,
      data: result.tasks,
      meta: result.meta
    });
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.user._id, req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully.',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(req.user._id, req.params.id, req.body.status);
    res.status(200).json({
      success: true,
      message: `Task status updated to ${req.body.status}.`,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(req.user._id, req.params.id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    next(err);
  }
};

const addSubtask = async (req, res, next) => {
  try {
    const task = await taskService.addSubtask(req.user._id, req.params.id, req.body.title);
    res.status(201).json({
      success: true,
      message: 'Subtask added successfully.',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const toggleSubtask = async (req, res, next) => {
  try {
    const task = await taskService.toggleSubtask(req.user._id, req.params.id, req.params.subtaskId, req.body.isCompleted);
    res.status(200).json({
      success: true,
      message: 'Subtask status updated.',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

const deleteSubtask = async (req, res, next) => {
  try {
    const task = await taskService.deleteSubtask(req.user._id, req.params.id, req.params.subtaskId);
    res.status(200).json({
      success: true,
      message: 'Subtask deleted.',
      data: task
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
  addSubtask,
  toggleSubtask,
  deleteSubtask
};
