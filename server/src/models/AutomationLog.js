const mongoose = require('mongoose');
const { EXECUTION_STATUS } = require('../config/constants');

const automationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true,
    index: true
  },
  workflowName: {
    type: String,
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  taskTitle: {
    type: String,
    default: ''
  },
  triggerType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(EXECUTION_STATUS),
    required: true,
    index: true
  },
  evaluatedConditions: [{
    field: String,
    operator: String,
    expectedValue: mongoose.Schema.Types.Mixed,
    actualValue: mongoose.Schema.Types.Mixed,
    passed: Boolean
  }],
  actionsExecuted: [{
    type: { type: String },
    payload: mongoose.Schema.Types.Mixed,
    status: { type: String, enum: ['SUCCESS', 'FAILED'] },
    resultMessage: String,
    error: String
  }],
  errorMessage: {
    type: String,
    default: null
  },
  executionDurationMs: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

automationLogSchema.index({ user: 1, createdAt: -1 });
automationLogSchema.index({ workflowId: 1, createdAt: -1 });

module.exports = mongoose.model('AutomationLog', automationLogSchema);
