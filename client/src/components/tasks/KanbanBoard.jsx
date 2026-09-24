import React from 'react';
import { TaskCard } from './TaskCard';
import { Badge } from '../common/Badge';

export const KanbanBoard = ({
  tasks = [],
  onStatusChange,
  onEdit,
  onDelete,
  onSubtaskToggle,
}) => {
  const columns = [
    { id: 'TODO', title: 'To Do', variant: 'todo' },
    { id: 'IN_PROGRESS', title: 'In Progress', variant: 'in_progress' },
    { id: 'COMPLETED', title: 'Completed', variant: 'completed' },
    { id: 'OVERDUE', title: 'Overdue', variant: 'overdue' },
  ];

  const getTasksByStatus = (statusId) => {
    return tasks.filter((t) => t.status === statusId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
      {columns.map((col) => {
        const colTasks = getTasksByStatus(col.id);
        return (
          <div
            key={col.id}
            className="rounded-2xl glass-panel p-4 flex flex-col min-h-[500px] border border-white/10"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant={col.variant} size="sm" dot>
                  {col.title}
                </Badge>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {colTasks.length}
              </span>
            </div>

            {/* Column Task Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-1">
              {colTasks.length === 0 ? (
                <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-800/80 rounded-xl text-xs text-slate-500 text-center p-4">
                  No {col.title.toLowerCase()} tasks
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSubtaskToggle={onSubtaskToggle}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
