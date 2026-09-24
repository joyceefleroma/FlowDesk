import React from 'react';
import { Badge } from '../common/Badge';
import { Zap, Play, Edit3, Trash2, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../common/Button';

export const WorkflowCard = ({
  workflow,
  onToggleActive,
  onEdit,
  onDelete,
  onTestSimulator,
}) => {
  const getTriggerLabel = (type) => {
    switch (type) {
      case 'TASK_CREATED':
        return 'Task Created';
      case 'TASK_COMPLETED':
        return 'Task Completed';
      case 'DEADLINE_APPROACHING':
        return `Deadline Approaching (${workflow.trigger?.config?.advanceNoticeHours || 24}h)`;
      case 'TASK_OVERDUE':
        return 'Task Overdue';
      case 'TASK_PRIORITY_CHANGED':
        return 'Priority Changed';
      case 'TASK_STATUS_CHANGED':
        return 'Status Changed';
      case 'SUBTASK_COMPLETED':
        return 'Subtask Completed';
      default:
        return type;
    }
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-200 border relative flex flex-col justify-between ${
        workflow.isActive
          ? 'border-white/10 hover:border-indigo-500/30 shadow-sm hover:shadow-glow'
          : 'border-white/5 opacity-60 bg-slate-950/40'
      }`}
    >
      {/* Top Header: Title, Active Switch */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-2.5 rounded-xl border ${
                workflow.isActive
                  ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-white tracking-tight truncate">
                {workflow.name}
              </h4>
              {workflow.description && (
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{workflow.description}</p>
              )}
            </div>
          </div>

          {/* Active Switch */}
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={workflow.isActive}
              onChange={(e) => onToggleActive(workflow._id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Workflow Logic Badges Flow */}
        <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-xs">
          {/* WHEN Trigger */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
              WHEN
            </span>
            <span className="font-semibold text-white">{getTriggerLabel(workflow.trigger?.type)}</span>
          </div>

          {/* IF Conditions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
              IF
            </span>
            <span className="text-slate-300">
              {workflow.conditions?.length > 0
                ? `${workflow.conditions.length} condition(s) satisfied`
                : 'All matching tasks'}
            </span>
          </div>

          {/* THEN Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
              THEN
            </span>
            <span className="text-slate-300">
              {workflow.actions?.map((a) => a.type.replace(/_/g, ' ')).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Telemetry stats & actions */}
      <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>
            Executions: <strong className="text-white font-mono">{workflow.executionCount || 0}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            icon={Play}
            onClick={() => onTestSimulator(workflow)}
            className="text-xs px-2.5 py-1"
          >
            Test
          </Button>
          <button
            onClick={() => onEdit(workflow)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit workflow"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(workflow._id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Delete workflow"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
