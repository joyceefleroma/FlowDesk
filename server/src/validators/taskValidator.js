const { z } = require('zod');
const { TASK_STATUS, TASK_PRIORITY } = require('../config/constants');

const subtaskInputSchema = z.object({
  title: z.string().min(1, 'Subtask title is required').max(200),
  isCompleted: z.boolean().optional()
});

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(5000).optional().default(''),
  status: z.enum(Object.values(TASK_STATUS)).optional().default(TASK_STATUS.TODO),
  priority: z.enum(Object.values(TASK_PRIORITY)).optional().default(TASK_PRIORITY.MEDIUM),
  category: z.string().max(50).optional().default('General'),
  tags: z.array(z.string().max(30)).optional().default([]),
  dueDate: z.string().datetime({ offset: true }).nullable().optional(),
  dueTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)').nullable().optional(),
  subtasks: z.array(subtaskInputSchema).optional().default([])
});

const updateTaskSchema = createTaskSchema.partial();

const updateStatusSchema = z.object({
  status: z.enum(Object.values(TASK_STATUS))
});

const addSubtaskSchema = z.object({
  title: z.string().min(1, 'Subtask title is required').max(200)
});

const toggleSubtaskSchema = z.object({
  isCompleted: z.boolean()
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateStatusSchema,
  addSubtaskSchema,
  toggleSubtaskSchema
};
