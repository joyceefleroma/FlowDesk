const mongoose = require('mongoose');
const { TRIGGER_TYPE, CONDITION_OPERATOR, ACTION_TYPE } = require('../config/constants');

const conditionSchema = new mongoose.Schema({
  field: {
    type: String,
    required: [true, 'Condition field is required'],
    enum: ['status', 'priority', 'category', 'tags', 'dueDateDistanceHours', 'subtasksCompleted', 'title']
  },
  operator: {
    type: String,
    required: [true, 'Condition operator is required'],
    enum: Object.values(CONDITION_OPERATOR)
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Condition value is required']
  },
  logicalOperator: {
    type: String,
    enum: ['AND', 'OR'],
    default: 'AND'
  }
}, { _id: false });

const actionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Action type is required'],
    enum: Object.values(ACTION_TYPE)
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Action payload is required'],
    default: {}
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: false });

const workflowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Workflow name is required'],
    trim: true,
    maxlength: [120, 'Workflow name cannot exceed 120 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  trigger: {
    type: {
      type: String,
      required: [true, 'Trigger type is required'],
      enum: Object.values(TRIGGER_TYPE),
      index: true
    },
    config: {
      advanceNoticeHours: {
        type: Number,
        default: 24,
        min: 1,
        max: 168
      }
    }
  },
  conditions: [conditionSchema],
  actions: [actionSchema],
  executionCount: {
    type: Number,
    default: 0
  },
  lastExecutedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Compound indexes
workflowSchema.index({ user: 1, 'trigger.type': 1, isActive: 1 });
workflowSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Workflow', workflowSchema);
