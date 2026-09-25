import React from 'react';
import { History, CheckCircle2, ShieldCheck, Clock, ArrowRight, Zap, Terminal, ChevronDown } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AutomationHistorySection = () => {
  const timelineSteps = [
    { time: '10:42:01 AM', event: 'Task deadline detected', detail: 'Final Project Submission is due in 18 hours', status: 'TRIGGERED' },
    { time: '10:42:01 AM', event: 'Condition evaluated', detail: 'Status != COMPLETED (True) & Priority == MEDIUM (True)', status: 'MATCHED' },
    { time: '10:42:02 AM', event: 'Priority mutated to URGENT', detail: 'Task record updated in MongoDB ledger', status: 'EXECUTED' },
    { time: '10:42:02 AM', event: 'Push notification dispatched', detail: 'In-app alert delivered to user desktop and mobile', status: 'DELIVERED' },
  ];

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
    <section id="telemetry" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/30 shadow-glow-yellow">
          Telemetry & Audit Trail
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Every Automation.{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 bg-clip-text text-transparent">
            Clearly Tracked.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed max-w-2xl mx-auto">
          Full execution transparency. Inspect triggering events, evaluated condition diffs, execution latencies in
          milliseconds, and exact mutation outcomes.
        </p>
      </div>

      {/* Grid: Timeline on Left / Stream on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Timeline on Single Vertical Axis */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#140a08]/90 backdrop-blur-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <span className="text-white/80 font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                EXECUTION TIMELINE
              </span>
              <span className="text-amber-300 font-bold">14ms total</span>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-400 before:via-red-500 before:to-yellow-300">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#140a08] border-2 border-amber-400 flex items-center justify-center group-hover:scale-125 transition-transform" />
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-amber-300 font-bold">{step.time}</span>
                    <span className="text-white/40">{step.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{step.event}</h4>
                  <p className="text-xs text-white/60 mt-0.5">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Audit Trail Verified</span>
            <span className="text-amber-400 font-mono font-bold">IMMUTABLE</span>
          </div>
        </div>

        {/* Live Stream Terminal Box */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#120807]/90 backdrop-blur-3xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="text-white/80 font-bold">AUTOMATION_LOG_STREAM // AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] text-amber-300 font-mono">Stream Active</span>
              </div>
            </div>

            {/* Stream List */}
            <div className="space-y-3.5">
              {sampleLogs.map((log, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{log.workflow}</h4>
                        <span className="text-[9px] font-mono font-bold text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {log.trigger}
                        </span>
                      </div>

                      <p className="text-xs text-white/60 mt-1">
                        Target: <strong className="text-white font-medium">{log.target}</strong> →{' '}
                        <span className="text-amber-300">{log.actions.join(', ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-white/50 shrink-0 pl-9 sm:pl-0">
                    <span className="text-amber-300 font-bold">{log.duration}</span>
                    <span>{log.time}</span>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Deduplication &amp; Loop-Guard: ENABLED</span>
            <span>Latency Avg: 13.6ms</span>
          </div>
        </div>
      </div>
    </section>
  );
};

