const DeduplicationRecord = require('../models/DeduplicationRecord');

/**
 * Checks if a scheduled automation has already executed for a task within the active window.
 * If not, inserts an idempotency record with a TTL to prevent duplicate runs.
 * 
 * @param {string} workflowId 
 * @param {string} taskId 
 * @param {string} triggerType 
 * @param {number} windowHours 
 * @param {string} userId 
 * @returns {Promise<boolean>} true if already executed (duplicate), false if first execution allowed
 */
const checkAndLockExecution = async (workflowId, taskId, triggerType, windowHours = 24, userId) => {
  // Quantize by date window
  const dateBucket = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const dedupKey = `wf_${workflowId}_task_${taskId}_type_${triggerType}_date_${dateBucket}`;

  try {
    const existing = await DeduplicationRecord.findOne({ dedupKey });
    if (existing) {
      return true; // Already executed today
    }

    // Lock for windowHours + 12 hours buffer
    const expiresAt = new Date(Date.now() + (windowHours + 12) * 60 * 60 * 1000);
    await DeduplicationRecord.create({
      user: userId,
      workflowId,
      taskId,
      dedupKey,
      expiresAt
    });

    return false; // Successfully acquired execution lock
  } catch (error) {
    if (error.code === 11000) {
      return true; // Concurrent lock contention, treat as duplicate
    }
    console.error('[DedupService Error]', error.message);
    return false;
  }
};

module.exports = { checkAndLockExecution };
