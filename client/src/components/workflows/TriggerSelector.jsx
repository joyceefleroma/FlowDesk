import React from 'react';
import {
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  ListTodo,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TRIGGER_OPTIONS = [
  {
    type: 'TASK_CREATED',
    label: 'Task Created',
    description: 'Fires immediately whenever a new task is created by you',
    icon: Sparkles,
    color: 'indigo',
  },
  {
    type: 'TASK_COMPLETED',
    label: 'Task Completed',
    description: 'Fires when any task is marked as finished/completed',
    icon: CheckCircle2,
    color: 'emerald',
  },
  {
    type: 'DEADLINE_APPROACHING',
    label: 'Deadline Approaching',
    description: 'Fires when an incomplete task enters a specified deadline window',
    icon: Clock,
    color: 'amber',
    hasConfig: true,
  },
  {
    type: 'TASK_OVERDUE',
    label: 'Task Becomes Overdue',
    description: 'Fires automatically when a task passes its due date without completion',
    icon: AlertTriangle,
    color: 'rose',
  },
  {
    type: 'TASK_PRIORITY_CHANGED',
    label: 'Task Priority Changed',
    description: 'Fires when a task priority is modified (e.g. Medium to High)',
    icon: Flame,
    color: 'purple',
  },
  {
    type: 'TASK_STATUS_CHANGED',
    label: 'Task Status Changed',
    description: 'Fires when status transitions (e.g. To Do to In Progress)',
    icon: ArrowRight,
    color: 'cyan',
  },
  {
    type: 'SUBTASK_COMPLETED',
    label: 'Subtask Completed',
    description: 'Fires when an individual subtask step is checked off',
    icon: ListTodo,
    color: 'indigo',
  },
];

export const TriggerSelector = ({ selectedTrigger, onSelectTrigger }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TRIGGER_OPTIONS.map((item) => {
          const isSelected = selectedTrigger.type === item.type;
          const Icon = item.icon;

          return (
            <div
              key={item.type}
              onClick={() =>
                onSelectTrigger({
                  type: item.type,
                  config: item.hasConfig
                    ? { advanceNoticeHours: selectedTrigger.config?.advanceNoticeHours || 24 }
                    : {},
                })
              }
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500 ring-2 ring-indigo-500/20 shadow-glow'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  isSelected ? 'bg-indigo-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-sm font-bold text-white tracking-tight">{item.label}</h5>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance Notice Hours for DEADLINE_APPROACHING */}
      {selectedTrigger.type === 'DEADLINE_APPROACHING' && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h6 className="text-xs font-bold text-amber-300">Advance Notice Window</h6>
            <p className="text-xs text-slate-400 mt-0.5">
              How many hours prior to task due date should this workflow trigger?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={168}
              value={selectedTrigger.config?.advanceNoticeHours || 24}
              onChange={(e) =>
                onSelectTrigger({
                  ...selectedTrigger,
                  config: { advanceNoticeHours: Number(e.target.value) },
                })
              }
              className="w-24 rounded-xl bg-slate-900 border border-amber-500/40 px-3 py-1.5 text-sm text-white font-mono text-center focus:outline-none focus:border-amber-400"
            />
            <span className="text-xs text-slate-300 font-medium">Hours</span>
          </div>
        </div>
      )}
    </div>
  );
};
