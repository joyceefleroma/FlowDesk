import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { NotificationFlyout } from './NotificationFlyout';
import { notificationService } from '../../services/notificationService';

export const TopHeader = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await notificationService.getNotifications({ limit: 1 });
        if (res.success) {
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (err) {
        // silent fail on polling count
      }
    };
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // 30s poll
    return () => clearInterval(interval);
  }, []);

  const getPageMeta = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return { title: 'Dashboard', desc: 'Real-time productivity & automation telemetry' };
    if (path === '/tasks') return { title: 'Task Manager', desc: 'Organize, prioritize, and track your tasks' };
    if (path === '/workflows') return { title: 'Workflows', desc: 'Automate repetitive actions with Trigger-Condition rules' };
    if (path === '/workflows/new') return { title: 'Create Workflow', desc: 'Build an automated Trigger → Condition → Action rule' };
    if (path.includes('/workflows/') && path.includes('/edit')) return { title: 'Edit Workflow', desc: 'Update automation parameters' };
    if (path.startsWith('/automation/history')) return { title: 'Automation History', desc: 'Audit log and execution telemetry' };
    if (path.startsWith('/notifications')) return { title: 'Notification Center', desc: 'System alerts and automation notifications' };
    if (path.startsWith('/profile')) return { title: 'Profile & Settings', desc: 'Manage your preferences and timezone' };
    return { title: 'FlowDesk', desc: 'Personal Workflow Automation' };
  };

  const meta = getPageMeta();

  return (
    <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#0c0205]/75 backdrop-blur-2xl flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight">{meta.title}</h2>
          <p className="text-xs text-slate-300 hidden sm:block">{meta.desc}</p>
        </div>
      </div>

      {/* Right: Quick Actions & Notifications */}
      <div className="flex items-center gap-3">
        {location.pathname !== '/workflows/new' && (
          <Button
            size="sm"
            variant="primary"
            icon={Zap}
            onClick={() => navigate('/workflows/new')}
            className="hidden sm:inline-flex shadow-glow"
          >
            New Workflow
          </Button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsFlyoutOpen((prev) => !prev)}
            className="relative p-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-black text-white flex items-center justify-center animate-pulse shadow-glow">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <NotificationFlyout
            isOpen={isFlyoutOpen}
            onClose={() => setIsFlyoutOpen(false)}
            onNotificationCountChange={(count) => setUnreadCount(count)}
          />
        </div>
      </div>
    </header>
  );
};
