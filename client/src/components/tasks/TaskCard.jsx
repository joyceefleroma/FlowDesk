import React from 'react';
import { Badge } from '../common/Badge';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  ListTodo,
  Tag
} from 'lucide-react';
import { format, isPast, isToday } from 'date-fns';

export const TaskCard = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  onSubtaskToggle,
}) => {
  const isCompleted = task.status === 'COMPLETED';
  const subtasksCount = task.subtasks?.length || 0;
  const completedSubtasksCount = task.subtasks?.filter((s) => s.isCompleted).length || 0;

  const getDueDateLabel = () => {
    if (!task.dueDate) return null;
    const due = new Date(task.dueDate);
    if (isToday(due)) return { text: 'Today', isUrgent: true };
    if (isPast(due) && !isCompleted) return { text: `Overdue (${format(due, 'MMM d')})`, isUrgent: true, isOverdue: true };
    return { text: format(due, 'MMM d, yyyy'), isUrgent: false };
  };

  const dueInfo = getDueDateLabel();

  return (
    <div
      className={`group rounded-2xl glass-panel p-4 sm:p-5 transition-all duration-200 hover:border-white/20 relative ${
        isCompleted ? 'opacity-70 bg-slate-900/40' : ''
      }`}
    >
      {/* Header Row: Checkbox, Title, Actions */}
      <div className="flex items-start gap-3">
        {/* Toggle Status Checkbox */}
        <button
          onClick={() => onStatusChange(task._id, isCompleted ? 'TODO' : 'COMPLETED')}
          className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5 hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Title and Description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-sm sm:text-base font-semibold text-white tracking-tight ${
                isCompleted ? 'line-through text-slate-400' : ''
              }`}
            >
              {task.title}
            </h4>
            <Badge variant={task.priority.toLowerCase()} size="sm" dot>
              {task.priority}
            </Badge>
            {task.category && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {task.category}
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Subtasks Progress */}
          {subtasksCount > 0 && (
            <div className="mt-3 pt-2.5 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <ListTodo className="w-3.5 h-3.5 text-indigo-400" />
                  Subtasks
                </span>
                <span className="font-mono">
                  {completedSubtasksCount}/{subtasksCount}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(completedSubtasksCount / subtasksCount) * 100}%` }}
                />
              </div>

              {/* Subtask list preview */}
              <div className="mt-2 space-y-1">
                {task.subtasks.map((st) => (
                  <label
                    key={st._id}
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={st.isCompleted}
                      onChange={(e) => onSubtaskToggle && onSubtaskToggle(task._id, st._id, e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <span className={st.isCompleted ? 'line-through text-slate-500' : ''}>{st.title}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {task.tags?.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-indigo-300/80 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Due date footer */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5 text-xs">
            {dueInfo ? (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  dueInfo.isOverdue
                    ? 'text-rose-400'
                    : dueInfo.isUrgent
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {dueInfo.text}
                {task.dueTime && ` at ${task.dueTime}`}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500">No due date</span>
            )}

            <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Edit task"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
