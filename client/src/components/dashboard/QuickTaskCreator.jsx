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
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/15 shadow-glow">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400">
          <Zap className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-black text-white tracking-tight">Quick Add Task</h4>
        <span className="text-[10px] text-slate-300 ml-auto font-medium">Triggers active automation rules</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to get done? (e.g. Prepare client deck, Review sprint goals)"
          className="w-full sm:flex-1 rounded-2xl bg-black/40 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/25 backdrop-blur-md"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-2xl bg-black/50 border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
          >
            <option value="LOW" className="bg-[#150409]">Low</option>
            <option value="MEDIUM" className="bg-[#150409]">Medium</option>
            <option value="HIGH" className="bg-[#150409]">High</option>
            <option value="URGENT" className="bg-[#150409]">Urgent</option>
          </select>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-24 rounded-2xl bg-black/50 border border-white/15 px-3 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 backdrop-blur-md"
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
