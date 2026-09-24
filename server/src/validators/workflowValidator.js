const { z } = require('zod');
const { TRIGGER_TYPE, CONDITION_OPERATOR, ACTION_TYPE } = require('../config/constants');

const conditionRuleSchema = z.object({
  field: z.enum(['status', 'priority', 'category', 'tags', 'dueDateDistanceHours', 'subtasksCompleted', 'title']),
  operator: z.enum(Object.values(CONDITION_OPERATOR)),
  value: z.any(),
  logicalOperator: z.enum(['AND', 'OR']).optional().default('AND')
});

const actionItemSchema = z.object({
  type: z.enum(Object.values(ACTION_TYPE)),
  payload: z.record(z.any()).optional().default({}),
  order: z.number().optional().default(0)
});

const createWorkflowSchema = z.object({
  name: z.string().min(1, 'Workflow name is required').max(120),
  description: z.string().max(500).optional().default(''),
  isActive: z.boolean().optional().default(true),
  trigger: z.object({
    type: z.enum(Object.values(TRIGGER_TYPE)),
    config: z.object({
      advanceNoticeHours: z.number().min(1).max(168).optional().default(24)
    }).optional().default({ advanceNoticeHours: 24 })
  }),
  conditions: z.array(conditionRuleSchema).optional().default([]),
  actions: z.array(actionItemSchema).min(1, 'At least one action is required')
});

const updateWorkflowSchema = createWorkflowSchema.partial();

const toggleWorkflowSchema = z.object({
  isActive: z.boolean()
});

const testWorkflowSchema = z.object({
  taskId: z.string().min(1, 'Target Task ID is required for simulation')
});

module.exports = {
  createWorkflowSchema,
  updateWorkflowSchema,
  toggleWorkflowSchema,
  testWorkflowSchema
};
