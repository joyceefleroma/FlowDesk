const Task = require('../models/Task');
const Workflow = require('../models/Workflow');
const AutomationLog = require('../models/AutomationLog');
const { TASK_STATUS, TASK_PRIORITY } = require('../config/constants');

const getDashboardOverview = async (userId) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  // 1. Task Counts
  const [
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    overdueTasks,
    dueTodayTasks,
    activeWorkflows,
    totalWorkflows,
    totalAutomations
  ] = await Promise.all([
    Task.countDocuments({ user: userId }),
    Task.countDocuments({ user: userId, status: TASK_STATUS.COMPLETED }),
    Task.countDocuments({ user: userId, status: TASK_STATUS.IN_PROGRESS }),
    Task.countDocuments({ user: userId, status: TASK_STATUS.TODO }),
    Task.countDocuments({ user: userId, status: TASK_STATUS.OVERDUE }),
    Task.countDocuments({
      user: userId,
      status: { $ne: TASK_STATUS.COMPLETED },
      dueDate: { $gte: startOfToday, $lte: endOfToday }
    }),
    Workflow.countDocuments({ user: userId, isActive: true }),
    Workflow.countDocuments({ user: userId }),
    AutomationLog.countDocuments({ user: userId, status: 'SUCCESS' })
  ]);

  // 2. Priority Distribution
  const [lowCount, mediumCount, highCount, urgentCount] = await Promise.all([
    Task.countDocuments({ user: userId, priority: TASK_PRIORITY.LOW, status: { $ne: TASK_STATUS.COMPLETED } }),
    Task.countDocuments({ user: userId, priority: TASK_PRIORITY.MEDIUM, status: { $ne: TASK_STATUS.COMPLETED } }),
    Task.countDocuments({ user: userId, priority: TASK_PRIORITY.HIGH, status: { $ne: TASK_STATUS.COMPLETED } }),
    Task.countDocuments({ user: userId, priority: TASK_PRIORITY.URGENT, status: { $ne: TASK_STATUS.COMPLETED } })
  ]);

  const priorityDistribution = [
    { name: 'Low', count: lowCount, color: '#10b981' },
    { name: 'Medium', count: mediumCount, color: '#f59e0b' },
    { name: 'High', count: highCount, color: '#f43f5e' },
    { name: 'Urgent', count: urgentCount, color: '#8b5cf6' }
  ];

  // 3. 7-Day Completion Trend
  const past7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });

    const [created, completed] = await Promise.all([
      Task.countDocuments({ user: userId, createdAt: { $gte: dayStart, $lte: dayEnd } }),
      Task.countDocuments({ user: userId, completedAt: { $gte: dayStart, $lte: dayEnd } })
    ]);

    past7Days.push({
      day: dayLabel,
      created,
      completed
    });
  }

  // 4. Recent Tasks & Logs
  const [recentTasks, recentLogs] = await Promise.all([
    Task.find({ user: userId }).sort({ createdAt: -1 }).limit(5).lean(),
    AutomationLog.find({ user: userId }).sort({ createdAt: -1 }).limit(5).lean()
  ]);

  return {
    kpis: {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
      dueTodayTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      activeWorkflows,
      totalWorkflows,
      totalAutomations
    },
    priorityDistribution,
    completionTrends: past7Days,
    recentTasks,
    recentLogs
  };
};

module.exports = { getDashboardOverview };
