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
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          Telemetry & Audit Trail
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Every Automation.{' '}
          <span className="bg-gradient-to-r from-brand-red via-rose-400 to-white bg-clip-text text-transparent">
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
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#120409]/90 backdrop-blur-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <span className="text-white/80 font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-lightRed" />
                EXECUTION TIMELINE
              </span>
              <span className="text-emerald-400 font-bold">14ms total</span>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand-red before:via-rose-500 before:to-emerald-400">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#120409] border-2 border-brand-red flex items-center justify-center group-hover:scale-125 transition-transform" />
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-brand-lightRed font-bold">{step.time}</span>
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
            <span className="text-emerald-400 font-mono font-bold">IMMUTABLE</span>
          </div>
        </div>

        {/* Live Stream Terminal Box */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#0f0307]/90 backdrop-blur-3xl shadow-2xl flex flex-col justify-between">
          <div>
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-lightRed" />
                <span className="text-white/80 font-bold">AUTOMATION_LOG_STREAM // AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-mono">Stream Active</span>
              </div>
            </div>

            {/* Stream List */}
            <div className="space-y-3.5">
              {sampleLogs.map((log, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-red/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0 mt-0.5">
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
                        <span className="text-brand-lightRed">{log.actions.join(', ')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-white/50 shrink-0 pl-9 sm:pl-0">
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

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
            <span>Deduplication &amp; Loop-Guard: ENABLED</span>
            <span>Latency Avg: 13.6ms</span>
          </div>
        </div>
      </div>
    </section>
  );
};

