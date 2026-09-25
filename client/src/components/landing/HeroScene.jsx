import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Zap, Play, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroScene = () => {
  return (
    <section id="hero" className="min-h-screen pt-32 pb-20 px-4 sm:px-8 flex flex-col items-center justify-center text-center relative z-10">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-lightRed text-xs font-bold mb-8 shadow-glow-red backdrop-blur-xl animate-in fade-in duration-700">
        <Sparkles className="w-3.5 h-3.5 text-brand-lightRed animate-pulse" />
        <span>Next-Generation Personal Automation & Task Orchestration</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] max-w-5xl">
        Automate Your Workflow.{' '}
        <span className="bg-gradient-to-r from-brand-red via-rose-400 to-white bg-clip-text text-transparent drop-shadow-sm">
          Focus on What Matters.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mt-7 leading-relaxed font-normal">
        FlowDesk helps you orchestrate daily tasks and automate repetitive busywork using an intuitive{' '}
        <strong className="text-white font-semibold">Trigger $\rightarrow$ Condition $\rightarrow$ Action</strong> engine.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-9 w-full sm:w-auto">
        <Link to="/register" className="w-full sm:w-auto">
          <Button variant="glow" size="lg" icon={Flame} className="w-full sm:w-auto text-base px-9 py-4 font-bold">
            Get Started Free
          </Button>
        </Link>
        <a href="#concept" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" icon={Play} className="w-full sm:w-auto text-base px-8 py-4">
            Explore Workflows
          </Button>
        </a>
      </div>

      {/* Futuristic Interactive 3D Node Pipeline Card Preview */}
      <div className="mt-16 w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-left relative overflow-hidden backdrop-blur-3xl group">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-brand-red shadow-glow-red" />
              <span className="w-3 h-3 rounded-full bg-rose-400/80" />
              <span className="w-3 h-3 rounded-full bg-white/60" />
            </div>
            <span className="text-xs font-mono font-bold text-white/90 tracking-wide">
              LIVE WORKFLOW EXECUTION NODE GRAPH
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              Engine Active
            </span>
          </div>
        </div>

        {/* 3-Step Node Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Node 1: Trigger */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-red/40 transition-all backdrop-blur-md relative group/node">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-black tracking-wider text-white bg-brand-red px-2.5 py-0.5 rounded shadow-glow-red">
                WHEN (Trigger)
              </span>
              <span className="text-[10px] font-mono text-white/40">NODE_01</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Deadline Approaching
            </h4>
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
              Task is within 24 hours of its scheduled due date & time.
            </p>
          </div>

          {/* Node 2: Condition */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all backdrop-blur-md relative group/node">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-black tracking-wider text-brand-lightRed bg-brand-red/20 border border-brand-red/30 px-2.5 py-0.5 rounded">
                IF (Condition)
              </span>
              <span className="text-[10px] font-mono text-white/40">NODE_02</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Status ≠ Completed
            </h4>
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
              Evaluates task state in real-time. Unfinished tasks proceed.
            </p>
          </div>

          {/* Node 3: Action */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-brand-red/40 shadow-glow-red backdrop-blur-md relative group/node">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-black tracking-wider text-white bg-gradient-to-r from-brand-red to-rose-600 px-2.5 py-0.5 rounded shadow-glow-red">
                THEN (Action)
              </span>
              <span className="text-[10px] font-mono text-brand-lightRed">NODE_03</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Escalate to URGENT
            </h4>
            <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
              Mutate priority + generate immediate in-app push notification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
