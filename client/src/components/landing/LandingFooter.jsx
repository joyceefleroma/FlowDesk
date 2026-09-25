import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Shield, Terminal, Globe } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#060103]/90 backdrop-blur-2xl py-12 px-4 sm:px-8 relative z-10 text-xs text-white/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-red via-rose-600 to-white flex items-center justify-center text-white shadow-glow-red">
            <Flame className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-sm font-black text-white tracking-tight">FlowDesk</span>
          <span className="text-white/30">|</span>
          <span>Personal Workflow Automation & Task Orchestration</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-white transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="hover:text-white transition-colors">
            Create Account
          </Link>
          <a href="#hero" className="hover:text-white transition-colors">
            Back to top ↑
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
        <p>© 2026 FlowDesk Platform. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>All Automation Engine Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};
