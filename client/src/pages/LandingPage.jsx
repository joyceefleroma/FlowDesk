import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock, Sliders, Bell } from 'lucide-react';
import { Button } from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow">
            <Zap className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">FlowDesk</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="glow" size="sm" icon={ArrowRight}>
              Get Started Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Personal Workflow Automation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl">
          Automate Repetitive Tasks with{' '}
          <span className="gradient-text">Intelligent Workflows</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mt-6 leading-relaxed">
          Stop manually re-prioritizing deadlines, reminding yourself of urgent assignments, or
          creating follow-ups. Build custom <strong>Trigger $\rightarrow$ Condition $\rightarrow$ Action</strong> rules in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link to="/register">
            <Button variant="glow" size="lg" icon={Zap} className="w-full sm:w-auto text-base px-8 py-3">
              Start Automating Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-3">
              View Live Demo
            </Button>
          </Link>
        </div>

        {/* Visual Engine Preview Card */}
        <div className="mt-14 w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">Workflow Rule Preview</span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Active Rule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30">
              <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">
                WHEN (Trigger)
              </span>
              <h5 className="text-sm font-bold text-white">Deadline Approaching</h5>
              <p className="text-slate-400 mt-1">Within 24 hours of task due date</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                IF (Condition)
              </span>
              <h5 className="text-sm font-bold text-white">Status = To Do</h5>
              <p className="text-slate-400 mt-1">Task remains incomplete</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                THEN (Actions)
              </span>
              <h5 className="text-sm font-bold text-white">Priority $\rightarrow$ URGENT</h5>
              <p className="text-slate-400 mt-1">+ Create in-app reminder alert</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Visual Rule Builder</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              No code required. Define complex condition chains and multiple automated actions with intuitive selectors.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Scheduled Automation</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Time-window scanning engine that automatically detects impending deadlines and overdue tasks without duplicate triggers.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Audit Trail & Telemetry</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Complete execution history showing evaluated condition diffs, execution millisecond benchmarks, and failure traces.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 FlowDesk. Personal Workflow Automation & Task Orchestration Platform.</p>
      </footer>
    </div>
  );
};
