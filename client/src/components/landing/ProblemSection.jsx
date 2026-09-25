import React from 'react';
import { Clock, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      title: 'Manual Tasks',
      tag: 'TIME DRAIN',
      icon: Clock,
      description:
        'Constantly checking calendars, due dates, and task lists by hand. Knowledge workers lose up to 4.5 hours every week simply keeping track of work.',
      pain: '4.5 hrs/week lost in tracking',
      solution: 'FlowDesk scans approaching deadlines continuously in the background.',
    },
    {
      title: 'Repetitive Work',
      tag: 'CLICK FATIGUE',
      icon: RefreshCw,
      description:
        'Manually adjusting status tags, bumping priorities, and creating follow-up reminders every time a milestone is completed.',
      pain: '30+ manual status clicks daily',
      solution: 'Event-driven triggers automate follow-ups and priority escalation instantly.',
    },
    {
      title: 'Missed Actions',
      tag: 'LOST CONTEXT',
      icon: AlertTriangle,
      description:
        'Overdue items slipping through the cracks when context-switching between different tools, leading to last-minute fire drills.',
      pain: '40% focus depletion on admin work',
      solution: 'Automated notification and task escalation ensure zero items are forgotten.',
    },
  ];

  return (
    <section id="problem" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-glow-yellow">
          The Problem
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Too Much Work.{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
            Too Many Repetitive Tasks.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Knowledge workers spend over a third of their productive day managing task logistics rather than doing deep work.
        </p>
      </div>

      {/* 3-Card Equal Height Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {problems.map((item, i) => (
          <div
            key={i}
            className="glass-panel rounded-3xl p-7 sm:p-8 border border-white/10 bg-[#160c0b]/80 backdrop-blur-2xl flex flex-col justify-between hover:border-amber-500/50 hover:shadow-glow-yellow transition-all group"
          >
            <div>
              {/* Card Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-200/80 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {item.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom Solution Highlight */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="text-[11px] font-mono text-red-300 font-bold mb-2">
                Pain: {item.pain}
              </div>
              <div className="flex items-start gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                <span>{item.solution}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

