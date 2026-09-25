import React from 'react';
import { History, CheckCircle2, ShieldCheck, Clock, ArrowRight, Zap, Terminal } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AutomationHistorySection = () => {
  const sampleLogs = [
    {
      workflow: 'Urgent Deadline Auto-Escalator',
      trigger: 'DEADLINE_APPROACHING',
      target: 'Final Project Submission',
      status: 'SUCCESS',
      time: '10:42 AM',
      duration: '14ms',
      actions: ['Priority set to URGENT', 'In-app reminder created'],
    },
    {
      workflow: 'High-Priority Assignment Alert',
      trigger: 'TASK_CREATED',
      target: 'Q3 Financial Review',
      status: 'SUCCESS',
      time: '11:15 AM',
      duration: '9ms',
      actions: ['Tagged #high-focus', 'Push alert generated'],
    },
    {
      workflow: 'Auto Follow-up On Completion',
      trigger: 'TASK_COMPLETED',
      target: 'Deploy Vercel Client Bundle',
      status: 'SUCCESS',
      time: '2:30 PM',
      duration: '18ms',
      actions: ['Created follow-up task "Verify CDN propagation"'],
    },
  ];

  return (
    <section id="telemetry" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          Telemetry & Audit Trail
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Every Automation.{' '}
          <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">
            Clearly Tracked.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
          Full execution transparency. Inspect triggering events, evaluated condition diffs, execution latencies in
          milliseconds, and exact mutation outcomes.
        </p>
      </div>

      {/* Live Stream Terminal Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#0f0307]/90 backdrop-blur-3xl shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-lightRed" />
            <span className="text-white/80 font-bold">AUTOMATION_LOG_STREAM // LIVE AUDIT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400">Stream Connected</span>
          </div>
        </div>

        {/* Stream List */}
        <div className="space-y-4">
          {sampleLogs.map((log, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-red/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="text-sm font-bold text-white tracking-tight">{log.workflow}</h4>
                    <span className="text-[10px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {log.trigger}
                    </span>
                  </div>

                  <p className="text-xs text-white/60 mt-1">
                    Target: <strong className="text-white font-medium">{log.target}</strong> →{' '}
                    <span className="text-brand-lightRed">{log.actions.join(', ')}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-white/50 shrink-0 pl-11 md:pl-0">
                <span className="text-emerald-400 font-bold">{log.duration}</span>
                <span>{log.time}</span>
                <Badge variant="success" size="sm">
                  {log.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
