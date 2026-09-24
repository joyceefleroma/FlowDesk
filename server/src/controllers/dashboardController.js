const dashboardService = require('../services/dashboardService');

const getOverview = async (req, res, next) => {
  try {
    const overview = await dashboardService.getDashboardOverview(req.user._id);
    res.status(200).json({
      success: true,
      data: overview
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOverview
};
