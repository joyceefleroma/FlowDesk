import React from 'react';
import { Badge } from '../common/Badge';
import { Zap, Play, Edit3, Trash2 } from 'lucide-react';
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
      className={`glass-panel rounded-3xl p-5 sm:p-6 transition-all duration-300 border relative flex flex-col justify-between backdrop-blur-xl ${
        workflow.isActive
          ? 'border-white/15 hover:border-red-500/50 shadow-glow hover:shadow-glow-lg'
          : 'border-white/5 opacity-60 bg-black/40'
      }`}
    >
      {/* Top Header: Title, Active Switch */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-3 rounded-2xl border ${
                workflow.isActive
                  ? 'bg-red-600/20 border-red-500/40 text-red-400 shadow-glow'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-black text-white tracking-tight truncate">
                {workflow.name}
              </h4>
              {workflow.description && (
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{workflow.description}</p>
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
            <div className="w-11 h-6 bg-black/60 border border-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600 peer-checked:border-red-400 shadow-glow"></div>
          </label>
        </div>

        {/* Workflow Logic Badges Flow */}
        <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs">
          {/* WHEN Trigger */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-black text-white bg-red-600 px-2 py-0.5 rounded-lg border border-red-400 shadow-sm">
              WHEN
            </span>
            <span className="font-bold text-white">{getTriggerLabel(workflow.trigger?.type)}</span>
          </div>

          {/* IF Conditions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-black text-red-200 bg-red-950/60 px-2 py-0.5 rounded-lg border border-red-500/40">
              IF
            </span>
            <span className="text-slate-200 font-medium">
              {workflow.conditions?.length > 0
                ? `${workflow.conditions.length} condition(s) satisfied`
                : 'All matching tasks'}
            </span>
          </div>

          {/* THEN Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase font-black text-white bg-gradient-to-r from-red-600 to-rose-600 px-2 py-0.5 rounded-lg border border-red-400 shadow-sm">
              THEN
            </span>
            <span className="text-slate-200 font-medium truncate max-w-[280px]">
              {workflow.actions?.map((a) => a.type.replace(/_/g, ' ')).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Telemetry stats & actions */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-slate-300 text-[11px]">
          <span>
            Executions: <strong className="text-white font-mono font-bold">{workflow.executionCount || 0}</strong>
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
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title="Edit workflow"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(workflow._id)}
            className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-red-500/15 rounded-xl transition-colors cursor-pointer"
            title="Delete workflow"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
