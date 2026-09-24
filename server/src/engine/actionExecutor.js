const Task = require('../models/Task');
const Notification = require('../models/Notification');
const { ACTION_TYPE, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY, TASK_STATUS, TASK_PRIORITY } = require('../config/constants');
const { nextDepthContext, checkRecursionLimit } = require('./recursionGuard');

/**
 * Executes a single action payload for a given task and workflow.
 */
const executeSingleAction = async (action, task, workflow, context = {}) => {
  const { type, payload = {} } = action;
  const userId = workflow.user;

  try {
    switch (type) {
      case ACTION_TYPE.CHANGE_PRIORITY: {
        const newPriority = payload.priority || TASK_PRIORITY.HIGH;
        const previousPriority = task.priority;
        
        await Task.findByIdAndUpdate(task._id, {
          priority: newPriority,
          lastAutomatedAt: new Date()
        });

        // If priority actually changed and recursion allows, emit event
        if (newPriority !== previousPriority && checkRecursionLimit(context)) {
          const eventBus = require('./eventBus');
          eventBus.emitAsync('TASK_PRIORITY_CHANGED', {
            user: userId,
            taskId: task._id,
            previousPriority,
            newPriority,
            context: nextDepthContext(context)
          });
        }

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Changed priority from ${previousPriority} to ${newPriority}`
        };
      }

      case ACTION_TYPE.CHANGE_STATUS: {
        const newStatus = payload.status || TASK_STATUS.COMPLETED;
        const previousStatus = task.status;

        const updateData = {
          status: newStatus,
          lastAutomatedAt: new Date()
        };

        if (newStatus === TASK_STATUS.COMPLETED) {
          updateData.completedAt = new Date();
        }

        await Task.findByIdAndUpdate(task._id, updateData);

        if (newStatus !== previousStatus && checkRecursionLimit(context)) {
          const eventBus = require('./eventBus');
          eventBus.emitAsync('TASK_STATUS_CHANGED', {
            user: userId,
            taskId: task._id,
            previousStatus,
            newStatus,
            context: nextDepthContext(context)
          });
        }

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Changed status from ${previousStatus} to ${newStatus}`
        };
      }

      case ACTION_TYPE.ADD_TAG: {
        const tag = String(payload.tag || '').trim().toLowerCase();
        if (tag) {
          await Task.findByIdAndUpdate(task._id, {
            $addToSet: { tags: tag },
            lastAutomatedAt: new Date()
          });
        }
        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Added tag '${tag}' to task`
        };
      }

      case ACTION_TYPE.REMOVE_TAG: {
        const tag = String(payload.tag || '').trim().toLowerCase();
        if (tag) {
          await Task.findByIdAndUpdate(task._id, {
            $pull: { tags: tag },
            lastAutomatedAt: new Date()
          });
        }
        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Removed tag '${tag}' from task`
        };
      }

      case ACTION_TYPE.CREATE_NOTIFICATION: {
        const title = payload.title || `Automation: ${workflow.name}`;
        const message = payload.message || `Workflow "${workflow.name}" triggered on "${task.title}".`;
        
        await Notification.create({
          user: userId,
          title,
          message,
          type: NOTIFICATION_TYPE.AUTOMATION_ACTION,
          priority: payload.priority || NOTIFICATION_PRIORITY.INFO,
          relatedTaskId: task._id,
          relatedWorkflowId: workflow._id
        });

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Created in-app notification: "${title}"`
        };
      }

      case ACTION_TYPE.CREATE_REMINDER: {
        const title = payload.title || `Reminder: ${task.title}`;
        const message = payload.message || `Deadline alert for "${task.title}". Please review your task.`;

        await Notification.create({
          user: userId,
          title,
          message,
          type: NOTIFICATION_TYPE.TASK_DUE,
          priority: NOTIFICATION_PRIORITY.URGENT,
          relatedTaskId: task._id,
          relatedWorkflowId: workflow._id
        });

        await Task.findByIdAndUpdate(task._id, { lastAutomatedAt: new Date() });

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Dispatched urgent reminder for "${task.title}"`
        };
      }

      case ACTION_TYPE.CREATE_FOLLOW_UP_TASK: {
        const followUpTitle = payload.title || `Follow-up: ${task.title}`;
        const offsetDays = Number(payload.offsetDays || 2);
        const newDueDate = new Date();
        newDueDate.setDate(newDueDate.getDate() + offsetDays);

        const newTask = await Task.create({
          user: userId,
          title: followUpTitle,
          description: payload.description || `Automated follow-up created by workflow "${workflow.name}" upon completing "${task.title}".`,
          priority: payload.priority || TASK_PRIORITY.MEDIUM,
          category: task.category || 'General',
          tags: [...(task.tags || []), 'follow-up'],
          status: TASK_STATUS.TODO,
          dueDate: newDueDate,
          subtasks: []
        });

        if (checkRecursionLimit(context)) {
          const eventBus = require('./eventBus');
          eventBus.emitAsync('TASK_CREATED', {
            user: userId,
            task: newTask,
            context: nextDepthContext(context)
          });
        }

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Created follow-up task "${newTask.title}" (Due in ${offsetDays} days)`
        };
      }

      case ACTION_TYPE.ADD_SUBTASK: {
        const subtaskTitle = payload.title || 'Automated follow-up step';
        await Task.findByIdAndUpdate(task._id, {
          $push: { subtasks: { title: subtaskTitle, isCompleted: false } },
          lastAutomatedAt: new Date()
        });

        return {
          type,
          payload,
          status: 'SUCCESS',
          resultMessage: `Appended subtask "${subtaskTitle}"`
        };
      }

      default:
        return {
          type,
          payload,
          status: 'FAILED',
          error: `Unsupported action type: ${type}`
        };
    }
  } catch (err) {
    return {
      type,
      payload,
      status: 'FAILED',
      error: err.message
    };
  }
};

/**
 * Sequentially executes all actions configured in a workflow.
 */
const executeAllActions = async (actions = [], task, workflow, context = {}) => {
  const sortedActions = [...actions].sort((a, b) => (a.order || 0) - (b.order || 0));
  const results = [];

  for (const action of sortedActions) {
    // Re-fetch updated task representation between sequential actions
    const freshTask = await Task.findById(task._id).lean() || task;
    const actionResult = await executeSingleAction(action, freshTask, workflow, context);
    results.push(actionResult);
  }

  return results;
};

module.exports = {
  executeSingleAction,
  executeAllActions
};
