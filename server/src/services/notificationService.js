const Notification = require('../models/Notification');

const getNotifications = async (userId, queryParams = {}) => {
  const { isRead, limit = 50 } = queryParams;
  const query = { user: userId };

  if (isRead !== undefined) {
    query.isRead = isRead === 'true';
  }

  const [notifications, unreadCount] = await Promise.all([
    Notification.find(query).sort({ createdAt: -1 }).limit(Number(limit)),
    Notification.countDocuments({ user: userId, isRead: false })
  ]);

  return {
    notifications,
    unreadCount
  };
};

const markAsRead = async (userId, notificationId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    const error = new Error('Notification not found.');
    error.statusCode = 404;
    throw error;
  }

  return notification;
};

const markAllAsRead = async (userId) => {
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true }
  );

  return { message: 'All notifications marked as read.' };
};

const deleteNotification = async (userId, notificationId) => {
  const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
  if (!notification) {
    const error = new Error('Notification not found.');
    error.statusCode = 404;
    throw error;
  }

  return { message: 'Notification deleted successfully.' };
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};
