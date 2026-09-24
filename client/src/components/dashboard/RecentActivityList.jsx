import React from 'react';
import { Badge } from '../common/Badge';
import { formatDistanceToNow } from 'date-fns';
import { Zap, ArrowRight, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecentActivityList = ({ logs = [] }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">Recent Automation Activity</h4>
          <p className="text-xs text-slate-400">Live orchestration execution log stream</p>
        </div>
        <Link
          to="/automation/history"
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors"
        >
          View all logs
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {logs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
          <Zap className="w-8 h-8 opacity-40 mb-2" />
          No automation events recorded yet. Create and trigger a workflow to see telemetry.
        </div>
      ) : (
        <div className="space-y-2.5 overflow-y-auto flex-1 max-h-[380px] -mr-1 pr-1">
          {logs.map((log) => (
            <div
              key={log._id}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="text-xs font-semibold text-white truncate">{log.workflowName}</h5>
                    <Badge variant={log.status.toLowerCase()} size="sm" dot>
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Triggered on: <span className="text-slate-200 font-medium">{log.taskTitle || 'Task'}</span>
                  </p>
                  {log.actionsExecuted?.length > 0 && (
                    <p className="text-[10px] text-emerald-400 mt-0.5">
                      ✓ {log.actionsExecuted.map((a) => a.resultMessage).join(' • ')}
                    </p>
                  )}
                  {log.errorMessage && (
                    <p className="text-[10px] text-rose-400 mt-0.5">
                      ✕ {log.errorMessage}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0 text-[10px] text-slate-500">
                <span>{log.createdAt ? formatDistanceToNow(new Date(log.createdAt), { addSuffix: true }) : ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
