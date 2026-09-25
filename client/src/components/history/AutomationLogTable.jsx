import React from 'react';
import { Badge } from '../common/Badge';
import { format } from 'date-fns';
import { Zap, Eye } from 'lucide-react';

export const AutomationLogTable = ({ logs = [], onSelectLog }) => {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-3xl border border-white/10 text-slate-400 text-xs shadow-glow">
        <Zap className="w-8 h-8 opacity-40 mx-auto mb-2 text-red-500" />
        No automation execution records found matching your filters.
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-glow backdrop-blur-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/60 text-slate-300 uppercase font-black text-[10px] tracking-wider border-b border-white/10">
            <tr>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Workflow Name</th>
              <th className="py-4 px-4">Trigger</th>
              <th className="py-4 px-4">Target Task</th>
              <th className="py-4 px-4">Actions Executed</th>
              <th className="py-4 px-4">Duration</th>
              <th className="py-4 px-4">Timestamp</th>
              <th className="py-4 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {logs.map((log) => (
              <tr
                key={log._id}
                onClick={() => onSelectLog(log)}
                className="hover:bg-red-950/25 hover:border-red-500/30 cursor-pointer transition-colors"
              >
                <td className="py-4 px-4">
                  <Badge variant={log.status.toLowerCase()} size="sm" dot>
                    {log.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 font-bold text-white truncate max-w-[150px]">
                  {log.workflowName}
                </td>
                <td className="py-4 px-4 text-slate-300">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 font-mono font-bold text-[10px] text-red-300">
                    {log.triggerType}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-200 font-medium truncate max-w-[180px]">
                  {log.taskTitle || '—'}
                </td>
                <td className="py-4 px-4 text-slate-300">
                  {log.actionsExecuted?.length > 0 ? (
                    <span className="text-red-300 font-bold truncate max-w-[200px] block">
                      {log.actionsExecuted.map((a) => a.type.replace(/_/g, ' ')).join(', ')}
                    </span>
                  ) : log.errorMessage ? (
                    <span className="text-rose-400 font-bold truncate max-w-[200px] block">
                      {log.errorMessage}
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">Conditions unmet</span>
                  )}
                </td>
                <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                  {log.executionDurationMs || 0}ms
                </td>
                <td className="py-4 px-4 text-slate-400 text-[11px] whitespace-nowrap font-mono">
                  {log.createdAt ? format(new Date(log.createdAt), 'MMM d, HH:mm:ss') : '—'}
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLog(log);
                    }}
                    className="p-1.5 text-red-400 hover:text-white hover:bg-red-600/25 rounded-xl transition-colors cursor-pointer"
                    title="View full log telemetry"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
