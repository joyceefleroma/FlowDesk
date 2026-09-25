import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskModal } from '../components/tasks/TaskModal';
import { KanbanBoard } from '../components/tasks/KanbanBoard';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Plus, CheckSquare, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters State
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [priority, setPriority] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'

  const toast = useToast();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await taskService.getTasks({
        search: search || undefined,
        status: status !== 'ALL' ? status : undefined,
        priority: priority !== 'ALL' ? priority : undefined,
        sortBy,
        sortOrder,
      });
      if (res.success && res.data) {
        setTasks(res.data);
      }
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTasks();
    }, 200); // 200ms debounce on search
    return () => clearTimeout(timeoutId);
  }, [search, status, priority, sortBy, sortOrder]);

  const handleCreateOrUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
        toast.success(`Task "${formData.title}" updated successfully!`);
      } else {
        await taskService.createTask(formData);
        toast.success(`Task "${formData.title}" created!`);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus);
      toast.success(`Task status updated to ${newStatus}`);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await taskService.deleteTask(taskId);
      toast.info('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleSubtaskToggle = async (taskId, subtaskId, isCompleted) => {
    try {
      await taskService.toggleSubtask(taskId, subtaskId, isCompleted);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update subtask');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Task Orchestrator</h2>
          <p className="text-xs sm:text-sm text-white/60">
            Create and track tasks. Any change can trigger intelligent automation workflows.
          </p>
        </div>

        <Button
          variant="glow"
          icon={Plus}
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="self-start sm:self-auto"
        >
          Create Task
        </Button>
      </div>

      {/* Filter Controls */}
      <TaskFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderToggle={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        viewMode={viewMode}
        onViewModeToggle={setViewMode}
      />

      {/* Task Content: List View vs. Kanban View */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="No tasks found"
          description={
            search || status !== 'ALL' || priority !== 'ALL'
              ? 'No tasks match the selected filters. Try resetting your query.'
              : 'You have not created any tasks yet. Get started by creating your first task.'
          }
          actionLabel="Create First Task"
          actionIcon={Plus}
          onAction={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        />
      ) : viewMode === 'kanban' ? (
        <KanbanBoard
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onEdit={(t) => {
            setEditingTask(t);
            setIsModalOpen(true);
          }}
          onDelete={handleDeleteTask}
          onSubtaskToggle={handleSubtaskToggle}
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={(t) => {
                setEditingTask(t);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteTask}
              onSubtaskToggle={handleSubtaskToggle}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
