const AutomationLog = require('../models/AutomationLog');

const getLogs = async (userId, queryParams = {}) => {
  const { workflowId, status, page = 1, limit = 50 } = queryParams;
  const query = { user: userId };

  if (workflowId) {
    query.workflowId = workflowId;
  }
  if (status && status !== 'ALL') {
    query.status = status;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [logs, total] = await Promise.all([
    AutomationLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    AutomationLog.countDocuments(query)
  ]);

  return {
    logs,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};

const getAutomationStats = async (userId) => {
  const [totalExecutions, successCount, failedCount, skippedCount] = await Promise.all([
    AutomationLog.countDocuments({ user: userId }),
    AutomationLog.countDocuments({ user: userId, status: 'SUCCESS' }),
    AutomationLog.countDocuments({ user: userId, status: 'FAILED' }),
    AutomationLog.countDocuments({ user: userId, status: 'SKIPPED' })
  ]);

  return {
    totalExecutions,
    successCount,
    failedCount,
    skippedCount,
    successRate: totalExecutions > 0 ? Math.round((successCount / totalExecutions) * 100) : 100
  };
};

module.exports = {
  getLogs,
  getAutomationStats
};
