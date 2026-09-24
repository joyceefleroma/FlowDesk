const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const workflowRoutes = require('./workflowRoutes');
const automationRoutes = require('./automationRoutes');
const notificationRoutes = require('./notificationRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/workflows', workflowRoutes);
router.use('/automation', automationRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
