import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Trash2, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../../context/ToastContext';

export const NotificationFlyout = ({ isOpen, onClose, onNotificationCountChange }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const flyoutRef = useRef(null);
  const toast = useToast();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationService.getNotifications({ limit: 20 });
      if (res.success && res.data) {
        setNotifications(res.data);
        if (onNotificationCountChange) {
          onNotificationCountChange(res.unreadCount || 0);
        }
      }
    } catch (err) {
      console.error('[NotificationFlyout] Failed to load:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      if (onNotificationCountChange) {
        onNotificationCountChange((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      toast.error('Could not mark notification as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      if (onNotificationCountChange) onNotificationCountChange(0);
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Could not mark all as read');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await notificationService.deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.info('Notification removed');
    } catch (err) {
      toast.error('Could not delete notification');
    }
  };

  const getNotificationIcon = (type, priority) => {
    if (priority === 'URGENT' || type === 'TASK_OVERDUE') {
      return <AlertTriangle className="w-4 h-4 text-rose-400" />;
    }
    if (type === 'TASK_DUE') {
      return <Clock className="w-4 h-4 text-amber-300" />;
    }
    return <Sparkles className="w-4 h-4 text-red-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={flyoutRef}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-14 w-80 sm:w-96 glass-panel rounded-3xl p-4 shadow-2xl border border-white/15 z-50 max-h-[500px] flex flex-col shadow-glow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-black text-white tracking-tight">Notifications</h4>
            </div>
            {notifications.some((n) => !n.isRead) && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 divide-y divide-white/5 py-1 -mx-2 px-2">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-slate-400">No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                  className={`p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 my-1 ${
                    n.isRead
                      ? 'opacity-65 hover:opacity-100 hover:bg-white/5'
                      : 'bg-red-950/40 border border-red-500/30 hover:bg-red-950/60 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 p-1.5 rounded-xl bg-black/60 border border-white/10">
                    {getNotificationIcon(n.type, n.priority)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs font-bold text-white truncate">{n.title}</h5>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200 mt-0.5 leading-snug line-clamp-2">{n.message}</p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(n._id, e)}
                    className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-white/5 transition-all"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
