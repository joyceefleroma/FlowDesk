import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, ShieldCheck, Sparkles, Clock, Sliders } from 'lucide-react';
import { Button } from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#080204] text-white flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Background ambient red glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="px-6 sm:px-12 py-5 border-b border-white/10 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-white flex items-center justify-center text-white shadow-glow">
            <Flame className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">FlowDesk</span>
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
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-500/40 text-red-200 text-xs font-bold mb-6 shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Next-Gen Personal Workflow Automation</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl">
          Automate Repetitive Tasks with{' '}
          <span className="gradient-text">Intelligent Workflows</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mt-6 leading-relaxed">
          Stop manually re-prioritizing deadlines, reminding yourself of urgent assignments, or
          creating follow-ups. Build custom <strong>Trigger $\rightarrow$ Condition $\rightarrow$ Action</strong> rules in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link to="/register">
            <Button variant="glow" size="lg" icon={Flame} className="w-full sm:w-auto text-base px-8 py-3.5">
              Start Automating Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="white" size="lg" className="w-full sm:w-auto text-base px-8 py-3.5">
              View Live Demo
            </Button>
          </Link>
        </div>

        {/* Visual Engine Preview Card */}
        <div className="mt-14 w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-glow-lg text-left">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-glow" />
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="text-xs font-mono text-slate-300 ml-2 font-bold">Workflow Rule Engine</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600 text-white border border-red-400 shadow-glow">
              Active Rule
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md">
              <span className="text-[10px] uppercase font-black text-white bg-red-600 px-2 py-0.5 rounded block w-fit mb-2">
                WHEN (Trigger)
              </span>
              <h5 className="text-sm font-bold text-white">Deadline Approaching</h5>
              <p className="text-slate-300 mt-1">Within 24 hours of task due date</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/15 backdrop-blur-md">
              <span className="text-[10px] uppercase font-black text-red-200 bg-red-950/70 border border-red-500/40 px-2 py-0.5 rounded block w-fit mb-2">
                IF (Condition)
              </span>
              <h5 className="text-sm font-bold text-white">Status = To Do</h5>
              <p className="text-slate-300 mt-1">Task remains incomplete</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-black/50 border border-red-500/40 shadow-glow backdrop-blur-md">
              <span className="text-[10px] uppercase font-black text-white bg-gradient-to-r from-red-600 to-rose-600 px-2 py-0.5 rounded block w-fit mb-2">
                THEN (Actions)
              </span>
              <h5 className="text-sm font-bold text-white">Priority $\rightarrow$ URGENT</h5>
              <p className="text-red-200 mt-1 font-medium">+ Create in-app reminder alert</p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all shadow-glow">
            <div className="p-3 rounded-2xl bg-red-600/20 text-red-400 w-fit mb-4 border border-red-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-white">Visual Rule Builder</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              No code required. Define complex condition chains and multiple automated actions with intuitive selectors.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all shadow-glow">
            <div className="p-3 rounded-2xl bg-white/10 text-white w-fit mb-4 border border-white/20">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-white">Scheduled Automation</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Time-window scanning engine that automatically detects impending deadlines and overdue tasks without duplicate triggers.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-red-500/30 transition-all shadow-glow">
            <div className="p-3 rounded-2xl bg-red-600/20 text-red-400 w-fit mb-4 border border-red-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-white">Audit Trail & Telemetry</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Complete execution history showing evaluated condition diffs, execution millisecond benchmarks, and failure traces.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 text-center text-xs text-slate-400 relative z-10">
        <p>© 2026 FlowDesk. Personal Workflow Automation & Task Orchestration Platform.</p>
      </footer>
    </div>
  );
};
