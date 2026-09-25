import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Zap,
  History,
  Bell,
  User,
  LogOut,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare },
    { to: '/workflows', label: 'Workflows', icon: Zap, badge: 'Automate' },
    { to: '/automation/history', label: 'History & Logs', icon: History },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0d0205]/75 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between shrink-0 shadow-2xl">
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-white flex items-center justify-center text-white shadow-glow">
            <Flame className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
              FlowDesk
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md bg-red-600/25 text-red-200 border border-red-500/40">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-slate-300 font-medium">Personal Orchestrator</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600/25 to-rose-600/15 text-white border border-red-500/50 shadow-glow'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 border border-transparent'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 shrink-0 text-red-400" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-200 border border-red-500/40">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white text-xs font-black uppercase shadow-glow shrink-0">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">{user?.name || 'User'}</h5>
              <p className="text-[10px] text-slate-300 truncate">{user?.email || 'user@flowdesk.io'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/15 rounded-xl transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
