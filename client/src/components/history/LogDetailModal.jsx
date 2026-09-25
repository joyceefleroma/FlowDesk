import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { format } from 'date-fns';
import { CheckCircle2, AlertCircle } from 'lucide-react';

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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/50 border border-white/10 text-xs backdrop-blur-md">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
            <Badge variant={log.status.toLowerCase()} size="sm" dot className="mt-1">
              {log.status}
            </Badge>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Trigger</span>
            <span className="font-bold text-white mt-1 block truncate font-mono text-[11px]">{log.triggerType}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
            <span className="font-mono text-red-400 mt-1 block font-bold">{log.executionDurationMs || 0} ms</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Executed At</span>
            <span className="text-slate-200 mt-1 block font-mono text-[11px]">
              {log.createdAt ? format(new Date(log.createdAt), 'MMM d, HH:mm:ss') : 'N/A'}
            </span>
          </div>
        </div>

        {/* Affected Task */}
        {log.taskTitle && (
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs flex items-center justify-between backdrop-blur-md">
            <span className="text-slate-400">Target Task:</span>
            <span className="text-white font-bold">{log.taskTitle}</span>
          </div>
        )}

        {/* Evaluated Conditions */}
        {log.evaluatedConditions?.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Evaluated Filter Conditions
            </h5>
            <div className="space-y-1.5">
              {log.evaluatedConditions.map((cond, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs flex items-center justify-between backdrop-blur-md"
                >
                  <div className="flex items-center gap-2">
                    {cond.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className="text-white font-bold">{cond.field}</span>
                    <span className="text-slate-400">{cond.operator}</span>
                    <span className="text-red-300 font-mono font-semibold">{String(cond.expectedValue)}</span>
                  </div>
                  <span className="text-slate-300 font-mono text-[11px]">
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
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Executed Actions
            </h5>
            <div className="space-y-1.5">
              {log.actionsExecuted.map((act, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs flex items-center justify-between backdrop-blur-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-glow" />
                    <span className="text-white font-bold">{act.type.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="text-red-200 font-medium">{act.resultMessage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error message if failed */}
        {log.errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs shadow-glow">
            <h6 className="font-bold mb-1">Execution Error Details:</h6>
            <p className="font-mono text-[11px] leading-relaxed break-words">{log.errorMessage}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
