const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/logs', automationController.getLogs);
router.get('/stats', automationController.getStats);

module.exports = router;
