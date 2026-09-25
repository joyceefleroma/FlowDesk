import React from 'react';
import { Cpu, Zap, Search, Play, FileText, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

export const AutomationEngineSection = () => {
  const pipelineSteps = [
    {
      num: '01',
      title: 'Incoming Event',
      role: 'TRIGGER',
      desc: 'API mutation, user interaction, or scheduled cron poller fires an event channel.',
      icon: Zap,
      isEngine: false,
    },
    {
      num: '02',
      title: 'Condition Filter',
      role: 'CONDITION',
      desc: 'Evaluates task state against multi-operator rules (priority, status, date).',
      icon: Search,
      isEngine: false,
    },
    {
      num: '03',
      title: 'Automation Engine',
      role: 'CORE PROCESSOR',
      desc: 'Decoupled in-process EventBus resolves workflows and applies recursion guards.',
      icon: Cpu,
      isEngine: true,
    },
    {
      num: '04',
      title: 'Action Pipeline',
      role: 'ACTION',
      desc: 'Executes mutations sequentially: updating records, tags, and reminders.',
      icon: Play,
      isEngine: false,
    },
    {
      num: '05',
      title: 'Telemetry Ledger',
      role: 'AUDIT',
      desc: 'Outcome, duration (ms), and evaluated diffs are committed to audit logs.',
      icon: FileText,
      isEngine: false,
    },
  ];

  return (
    <section id="engine" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          Under the Hood
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Let FlowDesk Handle the{' '}
          <span className="bg-gradient-to-r from-brand-red via-rose-400 to-white bg-clip-text text-transparent">
            Repetitive Work
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Engineered as a decoupled, asynchronous pub/sub orchestration architecture. High performance, zero blocking, and built-in recursion protection.
        </p>
      </div>

      {/* 5-Step Pipeline Flow Cards with Central Engine Highlighted */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative items-stretch">
        {pipelineSteps.map((step, i) => (
          <div
            key={i}
            className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between transition-all group relative overflow-hidden ${
              step.isEngine
                ? 'border-brand-red/60 bg-[#1e050d]/90 shadow-glow-red md:scale-105 z-20'
                : 'border-white/10 bg-[#140409]/80 hover:border-brand-red/40 hover:shadow-glow-red'
            }`}
          >
            {step.isEngine && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full blur-xl pointer-events-none" />
            )}

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className={`text-xs font-mono font-black ${step.isEngine ? 'text-white' : 'text-brand-lightRed'}`}>
                  {step.num}
                </span>
                <step.icon
                  className={`w-4 h-4 ${
                    step.isEngine ? 'text-brand-lightRed scale-110' : 'text-white/60 group-hover:text-brand-lightRed'
                  } transition-colors`}
                />
              </div>

              <span
                className={`text-[9px] font-mono font-black tracking-widest uppercase px-2 py-0.5 rounded ${
                  step.isEngine
                    ? 'bg-brand-red text-white shadow-glow-red'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {step.role}
              </span>

              <h4 className="text-sm font-bold text-white tracking-tight mt-3">{step.title}</h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{step.desc}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className={step.isEngine ? 'text-brand-lightRed font-bold' : ''}>ACTIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

