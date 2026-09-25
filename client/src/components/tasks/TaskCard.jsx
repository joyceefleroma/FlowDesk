import React from 'react';
import { Badge } from '../common/Badge';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
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
      className={`group rounded-3xl glass-panel p-4 sm:p-5 transition-all duration-300 hover:border-white/30 hover:shadow-glow relative backdrop-blur-xl ${
        isCompleted ? 'opacity-65 bg-black/50' : 'hover:bg-white/5'
      }`}
    >
      {/* Header Row: Checkbox, Title, Actions */}
      <div className="flex items-start gap-3">
        {/* Toggle Status Checkbox */}
        <button
          onClick={() => onStatusChange(task._id, isCompleted ? 'TODO' : 'COMPLETED')}
          className="mt-0.5 text-slate-400 hover:text-red-400 transition-colors shrink-0 cursor-pointer"
          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-red-500 fill-red-500/20" />
          ) : (
            <Circle className="w-5 h-5 hover:scale-110 transition-transform hover:text-red-400" />
          )}
        </button>

        {/* Title and Description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`text-sm sm:text-base font-bold text-white tracking-tight ${
                isCompleted ? 'line-through text-slate-400' : ''
              }`}
            >
              {task.title}
            </h4>
            <Badge variant={task.priority.toLowerCase()} size="sm" dot>
              {task.priority}
            </Badge>
            {task.category && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-white/10 text-white border border-white/15">
                {task.category}
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Subtasks Progress */}
          {subtasksCount > 0 && (
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <ListTodo className="w-3.5 h-3.5 text-red-400" />
                  Subtasks
                </span>
                <span className="font-mono text-red-400 font-bold">
                  {completedSubtasksCount}/{subtasksCount}
                </span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-red-600 to-rose-400 h-full rounded-full transition-all duration-300 shadow-glow"
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
                      className="rounded bg-black/50 border-white/20 text-red-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
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
                  className="text-[10px] text-red-200 bg-red-950/40 border border-red-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium"
                >
                  <Tag className="w-2.5 h-2.5 text-red-400" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Due date footer */}
          <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-white/10 text-xs">
            {dueInfo ? (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                  dueInfo.isOverdue
                    ? 'text-red-400'
                    : dueInfo.isUrgent
                    ? 'text-rose-300'
                    : 'text-slate-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {dueInfo.text}
                {task.dueTime && ` at ${task.dueTime}`}
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">No due date</span>
            )}

            <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                title="Edit task"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/15 rounded-xl transition-colors cursor-pointer"
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
