import React from 'react';
import { CheckSquare, Clock, AlertTriangle, CheckCircle2, Tag, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TaskManagementSection = () => {
  const sampleTasks = [
    {
      title: 'Finalize Distributed Systems Architecture Report',
      category: 'PROJECTS',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      dueDate: 'Today at 5:00 PM',
      subtasksCompleted: 3,
      totalSubtasks: 4,
      tags: ['sys-arch', 'final'],
    },
    {
      title: 'Review Client API Rate-Limiter Integration',
      category: 'WORK',
      priority: 'HIGH',
      status: 'TO_DO',
      dueDate: 'Tomorrow at 11:30 AM',
      subtasksCompleted: 1,
      totalSubtasks: 3,
      tags: ['backend', 'security'],
    },
    {
      title: 'Automated Database Backup Verification',
      category: 'MAINTENANCE',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      dueDate: 'Yesterday',
      subtasksCompleted: 2,
      totalSubtasks: 2,
      tags: ['infra', 'mongodb'],
    },
  ];

  const columns = [
    { label: 'To Do', count: 4, color: 'border-white/20 text-white' },
    { label: 'In Progress', count: 3, color: 'border-brand-red text-brand-lightRed' },
    { label: 'Completed', count: 12, color: 'border-emerald-500 text-emerald-400' },
  ];

  return (
    <section id="tasks" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-lightRed bg-brand-red/15 px-3.5 py-1 rounded-full border border-brand-red/30">
          Task Orchestration
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
          Your Tasks. Your Rules.{' '}
          <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">
            Your Workflow.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
          Manage items through customizable List and Kanban boards. Every task property—from subtask completion to
          approaching deadlines—acts as a reactive automation trigger.
        </p>
      </div>

      {/* Modern Kanban & List Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sampleTasks.map((task, i) => (
          <div
            key={i}
            className="glass-panel rounded-3xl p-6 border border-white/15 bg-[#120509]/80 backdrop-blur-3xl shadow-xl flex flex-col justify-between hover:border-brand-red/50 transition-all group"
          >
            <div>
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-wider text-white/50 uppercase">
                  {task.category}
                </span>
                <Badge
                  variant={
                    task.status === 'COMPLETED'
                      ? 'success'
                      : task.status === 'IN_PROGRESS'
                      ? 'purple'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-brand-lightRed transition-colors">
                {task.title}
              </h4>

              {/* Due Date Indicator */}
              <div className="flex items-center gap-1.5 text-xs text-white/60 mt-3">
                <Clock className="w-3.5 h-3.5 text-brand-lightRed" />
                <span>{task.dueDate}</span>
              </div>

              {/* Subtask Progress Bar */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1.5 font-mono">
                  <span>Subtasks</span>
                  <span className="font-bold text-white">
                    {task.subtasksCompleted}/{task.totalSubtasks}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-red to-rose-400"
                    style={{
                      width: `${(task.subtasksCompleted / task.totalSubtasks) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Footer Tags & Priority */}
            <div className="flex items-center justify-between gap-2 mt-6 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 flex-wrap">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-white/60 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Badge
                variant={
                  task.priority === 'URGENT'
                    ? 'danger'
                    : task.priority === 'HIGH'
                    ? 'warning'
                    : 'info'
                }
                size="sm"
              >
                {task.priority}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
