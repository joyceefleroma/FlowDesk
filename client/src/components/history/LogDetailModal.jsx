import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { format } from 'date-fns';
import { Zap, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const LogDetailModal = ({ isOpen, onClose, log }) => {
  if (!log) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Automation Execution Details"
      subtitle={`Audit log record for workflow: ${log.workflowName}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Top summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Status</span>
            <Badge variant={log.status.toLowerCase()} size="sm" dot className="mt-1">
              {log.status}
            </Badge>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Trigger</span>
            <span className="font-semibold text-white mt-1 block truncate">{log.triggerType}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Duration</span>
            <span className="font-mono text-slate-300 mt-1 block">{log.executionDurationMs || 0} ms</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Executed At</span>
            <span className="text-slate-300 mt-1 block">
              {log.createdAt ? format(new Date(log.createdAt), 'MMM d, HH:mm:ss') : 'N/A'}
            </span>
          </div>
        </div>

        {/* Affected Task */}
        {log.taskTitle && (
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-400">Target Task:</span>
            <span className="text-white font-semibold">{log.taskTitle}</span>
          </div>
        )}

        {/* Evaluated Conditions */}
        {log.evaluatedConditions?.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Evaluated Filter Conditions
            </h5>
            <div className="space-y-1.5">
              {log.evaluatedConditions.map((cond, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {cond.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-slate-200 font-medium">{cond.field}</span>
                    <span className="text-slate-500">{cond.operator}</span>
                    <span className="text-indigo-300 font-mono">{String(cond.expectedValue)}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Actual: {String(cond.actualValue ?? 'null')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions Executed */}
        {log.actionsExecuted?.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Executed Actions
            </h5>
            <div className="space-y-1.5">
              {log.actionsExecuted.map((act, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-medium">{act.type.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-emerald-300">{act.resultMessage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error message if failed */}
        {log.errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
            <h6 className="font-bold mb-1">Execution Error Details:</h6>
            <p className="font-mono text-[11px] leading-relaxed break-words">{log.errorMessage}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
