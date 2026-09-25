import React from 'react';
import { BarChart3, TrendingUp, CheckSquare, Zap, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const AnalyticsSection = () => {
  const metrics = [
    {
      title: 'Automations Executed',
      value: '14,820+',
      sub: 'Zero manual intervention',
      trend: '+28% this month',
      icon: Zap,
    },
    {
      title: 'Hours Saved Weekly',
      value: '12.4 hrs',
      sub: 'Per active user on average',
      trend: 'Top 5% efficiency',
      icon: Clock,
    },
    {
      title: 'On-Time Completion',
      value: '99.2%',
      sub: 'Due to deadline escalation',
      trend: '+18% vs baseline',
      icon: TrendingUp,
    },
    {
      title: 'Execution Success Rate',
      value: '99.98%',
      sub: 'Across all trigger channels',
      trend: 'Enterprise grade',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="analytics" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-glow-yellow">
          Productivity Telemetry
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Understand How Your{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
            Work Gets Done
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Actionable metrics on task velocity, automation throughput, and time saved. Visualize your productivity
          trends in real-time.
        </p>
      </div>

      {/* KPI 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 bg-[#140a08]/85 backdrop-blur-3xl flex flex-col justify-between hover:border-amber-500/40 hover:shadow-glow-yellow transition-all group"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-semibold text-white/60">{m.title}</span>
                <m.icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>

              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">{m.value}</div>
              <p className="text-xs text-white/50 mt-1">{m.sub}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {m.trend}
              </span>
              <span className="text-[10px] font-mono text-white/40">VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


