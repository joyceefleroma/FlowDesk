const automationService = require('../services/automationService');

const getLogs = async (req, res, next) => {
  try {
    const result = await automationService.getLogs(req.user._id, req.query);
    res.status(200).json({
      success: true,
      data: result.logs,
      meta: result.meta
    });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await automationService.getAutomationStats(req.user._id);
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLogs,
  getStats
};
