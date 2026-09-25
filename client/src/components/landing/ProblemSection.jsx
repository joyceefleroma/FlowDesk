import React from 'react';
import { AlertTriangle, Clock, RefreshCw, XCircle, ArrowRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ProblemSection = () => {
  const manualPains = [
    {
      icon: Clock,
      title: 'Manual Deadline Tracking',
      desc: 'Constantly checking calendars and due dates, risking missed submissions and urgent panics.',
      stat: '4.5 hrs/week lost',
    },
    {
      icon: RefreshCw,
      title: 'Repetitive Status Bumping',
      desc: 'Manually adjusting priorities, tagging items, and sending follow-ups after tasks complete.',
      stat: '30+ manual clicks/day',
    },
    {
      icon: AlertTriangle,
      title: 'Fragmented Attention',
      desc: 'Context switching between doing the actual work and managing the administrative busywork.',
      stat: '40% focus depletion',
    },
  ];

  const automatedWins = [
    {
      icon: Zap,
      title: 'Autonomous Trigger Engine',
      desc: 'FlowDesk scans approaching deadlines in the background and escalates urgent items instantly.',
    },
    {
      icon: CheckCircle2,
      title: 'Event-Driven Cascading Rules',
      desc: 'Completing a task automatically schedules review tasks, generates alerts, and updates tags.',
    },
    {
      icon: ShieldCheck,
      title: 'Deduplication & Recursion Guard',
      desc: 'Built-in execution ledgers guarantee your workflows run safely with zero infinite loops.',
    },
  ];

  return (
    <section id="problem" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          The Problem
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Too Much Work.{' '}
          <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">
            Too Many Repetitive Tasks.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
          Knowledge workers spend over a third of their time managing tasks instead of executing them.
          Here is how manual chaos transforms into automated clarity.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Card: The Manual Way */}
        <div className="glass-panel rounded-3xl p-7 sm:p-9 border border-white/10 bg-[#120508]/80 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-900/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400" />
                The Old Manual Way
              </span>
              <span className="text-xs font-mono text-white/40 font-bold">CHAOTIC</span>
            </div>

            <div className="space-y-4">
              {manualPains.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-500/20 shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                      <span className="text-[10px] font-mono text-rose-300 font-bold shrink-0">{item.stat}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-rose-300/80 font-medium text-center">
            Result: Missed deadlines, cognitive fatigue, and lost productive hours.
          </div>
        </div>

        {/* Right Card: The FlowDesk Way */}
        <div className="glass-panel rounded-3xl p-7 sm:p-9 border border-brand-red/30 bg-[#18050a]/90 backdrop-blur-2xl shadow-glow-red flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-red/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-red" />
                The FlowDesk Automation Way
              </span>
              <span className="text-xs font-mono text-brand-lightRed font-bold">AUTONOMOUS</span>
            </div>

            <div className="space-y-4">
              {automatedWins.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4 hover:border-brand-red/40 transition-colors">
                  <div className="p-2.5 rounded-xl bg-brand-red/20 text-white border border-brand-red/40 shrink-0 shadow-glow-red">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-brand-lightRed font-bold text-center">
            Result: Seamless autonomous orchestration with 100% peace of mind.
          </div>
        </div>
      </div>
    </section>
  );
};
