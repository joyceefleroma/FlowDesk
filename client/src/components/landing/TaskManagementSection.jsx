import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, Tag, Zap, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TaskManagementSection = () => {
  return (
    <section id="tasks" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-glow-yellow">
          Task Orchestration
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Your Tasks.{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
            Your Rules.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Every task property—from subtask completion to approaching deadlines—acts as a reactive automation trigger.
        </p>
      </div>

      {/* Single Centered Premium Task Card Visualization */}
      <div className="max-w-2xl mx-auto relative">
        {/* Surrounding Workflow Trigger & Automation Signals */}
        <div className="hidden sm:flex items-center gap-2 absolute -top-5 -left-6 z-20 px-3.5 py-1.5 rounded-full bg-[#1e0f0a] border border-red-500/40 text-red-300 text-xs font-mono font-bold shadow-glow-red backdrop-blur-xl">
          <Zap className="w-3.5 h-3.5 text-red-400" />
          <span>TRIGGER: Deadline Approaching</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 absolute -bottom-5 -right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#1c1508] border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-glow-yellow backdrop-blur-xl">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>AUTOMATION: Auto-Escalated Priority</span>
        </div>

        {/* Main Central Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/15 bg-[#140a08]/90 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-300/80 uppercase tracking-widest">
                ACTIVE TASK
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                Complete project documentation
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono text-white/70">SYNCED</span>
            </div>
          </div>

          {/* Task Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* Priority */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">
                Priority
              </span>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                  HIGH
                </span>
              </div>
            </div>

            {/* Deadline */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">
                Deadline
              </span>
              <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-white">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Tomorrow</span>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] font-mono uppercase font-bold text-white/50 tracking-wider">
                Status
              </span>
              <div className="mt-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Subtask & Progress Track */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/70 mb-2 font-mono">
              <span>Task Execution Milestones</span>
              <span className="font-bold text-white">3 / 4 completed (75%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-red-500 w-[75%]" />
            </div>
          </div>

          {/* Footer Automation Diff */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-white/40">RULE:</span>
              <span className="text-amber-300">if due &lt; 24h $\rightarrow$ bump priority</span>
            </div>
            <span className="text-[11px] font-mono text-yellow-400">STATUS: MATCHED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

