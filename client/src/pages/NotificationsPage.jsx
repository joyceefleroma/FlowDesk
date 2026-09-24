import React, { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { format, formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, Trash2, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRead, setFilterRead] = useState('ALL'); // 'ALL' | 'UNREAD' | 'READ'
  const toast = useToast();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterRead === 'UNREAD') params.isRead = false;
      if (filterRead === 'READ') params.isRead = true;

      const res = await notificationService.getNotifications(params);
      if (res.success && res.data) {
        setNotifications(res.data);
      }
    } catch (err) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filterRead]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      toast.success('All notifications marked as read');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      toast.info('Notification deleted');
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      toast.error('Failed to delete notification');
    }
  };

  const getIcon = (type, priority) => {
    if (priority === 'URGENT' || type === 'TASK_OVERDUE') {
      return <AlertTriangle className="w-5 h-5 text-rose-400" />;
    }
    if (type === 'TASK_DUE') {
      return <Clock className="w-5 h-5 text-amber-400" />;
    }
    return <Sparkles className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Automated alerts, approaching deadline triggers, and task completion notices.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <Button
            variant="outline"
            icon={CheckCheck}
            onClick={handleMarkAllAsRead}
            className="self-start sm:self-auto"
          >
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {['ALL', 'UNREAD', 'READ'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterRead(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterRead === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'ALL' ? 'All Alerts' : tab === 'UNREAD' ? 'Unread' : 'Archived'}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up! When workflows trigger notifications or deadlines approach, alerts will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.isRead && handleMarkAsRead(n._id)}
              className={`p-4 sm:p-5 rounded-2xl glass-panel border transition-all flex items-start gap-4 ${
                n.isRead
                  ? 'opacity-70 border-white/5 hover:opacity-100 hover:border-white/10'
                  : 'border-indigo-500/30 bg-indigo-950/20 shadow-glow cursor-pointer'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {getIcon(n.type, n.priority)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight">{n.title}</h4>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : ''}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(n._id);
                }}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                title="Delete notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
