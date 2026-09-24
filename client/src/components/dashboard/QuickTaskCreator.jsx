import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { Button } from '../common/Button';
import { taskService } from '../../services/taskService';
import { useToast } from '../../context/ToastContext';

export const QuickTaskCreator = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await taskService.createTask({
        title: title.trim(),
        priority,
        category: category.trim() || 'General',
        status: 'TODO',
      });
      if (res.success) {
        toast.success(`Task created: "${res.data.title}"`);
        setTitle('');
        if (onTaskCreated) onTaskCreated(res.data);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-indigo-400" />
        <h4 className="text-sm font-bold text-white tracking-tight">Quick Add Task</h4>
        <span className="text-[10px] text-slate-400 ml-auto">Triggers active automation rules</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to get done? (e.g. Prepare client deck, Review sprint goals)"
          className="w-full sm:flex-1 rounded-xl bg-slate-900/90 border border-slate-700/60 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-xl bg-slate-900/90 border border-slate-700/60 px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-24 rounded-xl bg-slate-900/90 border border-slate-700/60 px-3 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Plus}
            isLoading={isSubmitting}
            disabled={!title.trim()}
            className="shrink-0"
          >
            Add
          </Button>
        </div>
      </div>
    </form>
  );
};
