import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Zap, Play, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroScene = () => {
  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] pt-32 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex items-center relative z-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-lightRed text-xs font-bold mb-6 shadow-glow-red backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-brand-lightRed animate-pulse" />
            <span>Next-Generation Personal Automation & Task Orchestration</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] max-w-[650px]">
            Automate Your Workflow.{' '}
            <span className="bg-gradient-to-r from-brand-red via-rose-400 to-white bg-clip-text text-transparent drop-shadow-sm">
              Focus on What Matters.
            </span>
          </h1>

          {/* Short Controlled Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-[560px] mt-6 leading-relaxed font-normal">
            FlowDesk helps you manage tasks and automate repetitive workflows using triggers, conditions, and actions.
          </p>

          {/* CTA Buttons in Clean Uniform Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="glow" size="lg" icon={Flame} className="w-full sm:w-auto text-base px-8 py-3.5 font-bold h-12">
                Get Started
              </Button>
            </Link>
            <a href="#concept" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" icon={Play} className="w-full sm:w-auto text-base px-8 py-3.5 h-12">
                Explore Workflows
              </Button>
            </a>
          </div>

          {/* Quick Value Metrics */}
          <div className="flex items-center gap-6 mt-10 pt-6 border-t border-white/10 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Event-Driven Triggers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Real-Time Execution
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Zero Code Required
            </span>
          </div>
        </div>

        {/* Right Column: 3D Workflow Node Graph Card Preview */}
        <div className="lg:col-span-5 w-full">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-3xl group bg-[#110307]/80">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-glow-red" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/60" />
                </div>
                <span className="text-[11px] font-mono font-bold text-white/90 tracking-wider">
                  FLOW ENGINE PIPELINE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live Engine
                </span>
              </div>
            </div>

            {/* Vertically Stacked Node Flow in Right Column Card */}
            <div className="space-y-3.5 relative">
              {/* Node 1: Trigger */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-red/40 transition-all backdrop-blur-md relative group/node">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-black tracking-wider text-white bg-brand-red px-2 py-0.5 rounded shadow-glow-red">
                    TRIGGER (When)
                  </span>
                  <span className="text-[10px] font-mono text-white/40">NODE_01</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Deadline Approaching
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Task due date is within 24 hours.
                </p>
              </div>

              {/* Node 2: Condition */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all backdrop-blur-md relative group/node">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-black tracking-wider text-brand-lightRed bg-brand-red/20 border border-brand-red/30 px-2 py-0.5 rounded">
                    CONDITION (If)
                  </span>
                  <span className="text-[10px] font-mono text-white/40">NODE_02</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Status ≠ Completed
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Evaluates task state in real-time.
                </p>
              </div>

              {/* Node 3: Action */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-brand-red/40 shadow-glow-red backdrop-blur-md relative group/node">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase font-black tracking-wider text-white bg-gradient-to-r from-brand-red to-rose-600 px-2 py-0.5 rounded shadow-glow-red">
                    ACTION (Then)
                  </span>
                  <span className="text-[10px] font-mono text-brand-lightRed">NODE_03</span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Escalate to URGENT + Alert
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Mutates priority and sends instant reminder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

