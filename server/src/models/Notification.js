const mongoose = require('mongoose');
const { NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } = require('../config/constants');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: Object.values(NOTIFICATION_TYPE),
    default: NOTIFICATION_TYPE.AUTOMATION_ACTION,
    index: true
  },
  priority: {
    type: String,
    enum: Object.values(NOTIFICATION_PRIORITY),
    default: NOTIFICATION_PRIORITY.INFO
  },
  relatedTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    default: null
  },
  relatedWorkflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workflow',
    default: null
  },
  isRead: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true
});

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
