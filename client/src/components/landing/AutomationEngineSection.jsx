import React from 'react';
import { Cpu, Zap, Search, Play, FileText, ArrowRight, ShieldCheck, Database, Layers } from 'lucide-react';

export const AutomationEngineSection = () => {
  const pipelineSteps = [
    {
      num: '01',
      title: 'Incoming Event',
      desc: 'API mutation, user interaction, or scheduled cron poller fires an event channel.',
      icon: Zap,
    },
    {
      num: '02',
      title: 'Trigger Dispatch',
      desc: 'Decoupled in-process EventBus dispatches the event asynchronously without blocking requests.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Condition Filter',
      desc: 'Engine checks matching active workflows against multi-operator condition rules.',
      icon: Search,
    },
    {
      num: '04',
      title: 'Action Pipeline',
      desc: 'Executes mutations sequentially with recursion guards stopping infinite loops (depth $\\le 3$).',
      icon: Play,
    },
    {
      num: '05',
      title: 'Telemetry Ledger',
      desc: 'Outcome, duration (ms), and evaluated diffs are committed to immutable MongoDB audit logs.',
      icon: FileText,
    },
  ];

  return (
    <section id="engine" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          Under the Hood
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Let FlowDesk Handle the{' '}
          <span className="bg-gradient-to-r from-brand-red to-white bg-clip-text text-transparent">
            Repetitive Work
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
          Engineered as a decoupled, asynchronous pub/sub orchestration architecture. High performance, zero
          blocking, and built-in recursion protection.
        </p>
      </div>

      {/* 5-Step Pipeline Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {pipelineSteps.map((step, i) => (
          <div
            key={i}
            className="glass-panel rounded-3xl p-6 border border-white/10 bg-[#140409]/85 backdrop-blur-3xl flex flex-col justify-between hover:border-brand-red/40 hover:shadow-glow-red transition-all group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-mono font-black text-brand-lightRed">{step.num}</span>
                <step.icon className="w-4 h-4 text-white/60 group-hover:text-brand-lightRed transition-colors" />
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">{step.title}</h4>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{step.desc}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>ACTIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
