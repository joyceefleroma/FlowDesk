const Task = require('../models/Task');
const eventBus = require('../engine/eventBus');
const { TRIGGER_TYPE, TASK_STATUS } = require('../config/constants');

const createTask = async (userId, taskData) => {
  const task = await Task.create({
    ...taskData,
    user: userId
  });

  // Emit event asynchronously
  eventBus.emitAsync(TRIGGER_TYPE.TASK_CREATED, {
    user: userId,
    taskId: task._id,
    task: task.toObject(),
    context: { originTrigger: 'TASK_CREATED', depth: 0 }
  });

  return task;
};

const getTasks = async (userId, queryParams = {}) => {
  const {
    status,
    priority,
    category,
    tag,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 50
  } = queryParams;

  const query = { user: userId };

  if (status && status !== 'ALL') {
    query.status = status;
  }
  if (priority && priority !== 'ALL') {
    query.priority = priority;
  }
  if (category && category !== 'ALL') {
    query.category = category;
  }
  if (tag) {
    query.tags = tag.toLowerCase();
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sort).skip(skip).limit(Number(limit)),
    Task.countDocuments(query)
  ]);

  return {
    tasks,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const updateTask = async (userId, taskId, updateData) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  const prevStatus = task.status;
  const prevPriority = task.priority;

  Object.assign(task, updateData);

  if (updateData.status === TASK_STATUS.COMPLETED && prevStatus !== TASK_STATUS.COMPLETED) {
    task.completedAt = new Date();
  }

  await task.save();

  // Lifecycle event dispatching
  if (updateData.status && updateData.status !== prevStatus) {
    if (updateData.status === TASK_STATUS.COMPLETED) {
      eventBus.emitAsync(TRIGGER_TYPE.TASK_COMPLETED, {
        user: userId,
        taskId: task._id,
        task: task.toObject(),
        context: { originTrigger: 'TASK_COMPLETED', depth: 0 }
      });
    }
    eventBus.emitAsync(TRIGGER_TYPE.TASK_STATUS_CHANGED, {
      user: userId,
      taskId: task._id,
      task: task.toObject(),
      previousStatus: prevStatus,
      newStatus: updateData.status,
      context: { originTrigger: 'TASK_STATUS_CHANGED', depth: 0 }
    });
  }

  if (updateData.priority && updateData.priority !== prevPriority) {
    eventBus.emitAsync(TRIGGER_TYPE.TASK_PRIORITY_CHANGED, {
      user: userId,
      taskId: task._id,
      task: task.toObject(),
      previousPriority: prevPriority,
      newPriority: updateData.priority,
      context: { originTrigger: 'TASK_PRIORITY_CHANGED', depth: 0 }
    });
  }

  return task;
};

const updateTaskStatus = async (userId, taskId, newStatus) => {
  return updateTask(userId, taskId, { status: newStatus });
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }
  return { message: 'Task deleted successfully.' };
};

const addSubtask = async (userId, taskId, title) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  task.subtasks.push({ title, isCompleted: false });
  await task.save();
  return task;
};

const toggleSubtask = async (userId, taskId, subtaskId, isCompleted) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) {
    const error = new Error('Subtask not found.');
    error.statusCode = 404;
    throw error;
  }

  subtask.isCompleted = isCompleted;
  subtask.completedAt = isCompleted ? new Date() : null;
  await task.save();

  if (isCompleted) {
    eventBus.emitAsync(TRIGGER_TYPE.SUBTASK_COMPLETED, {
      user: userId,
      taskId: task._id,
      task: task.toObject(),
      subtask: subtask.toObject(),
      context: { originTrigger: 'SUBTASK_COMPLETED', depth: 0 }
    });
  }

  return task;
};

const deleteSubtask = async (userId, taskId, subtaskId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    const error = new Error('Task not found.');
    error.statusCode = 404;
    throw error;
  }

  task.subtasks.pull(subtaskId);
  await task.save();
  return task;
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
