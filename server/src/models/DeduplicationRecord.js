const mongoose = require('mongoose');

const deduplicationRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workflow',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  dedupKey: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '0s' } // MongoDB TTL index to auto-delete expired records
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DeduplicationRecord', deduplicationRecordSchema);
