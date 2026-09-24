import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Plus, Trash2, Calendar, Clock, ListTodo, Tag, CheckSquare } from 'lucide-react';

export const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('General');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskTitle, setSubtaskTitle] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'TODO');
      setPriority(initialData.priority || 'MEDIUM');
      setCategory(initialData.category || 'General');
      setTags(initialData.tags || []);
      setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 10) : '');
      setDueTime(initialData.dueTime || '');
      setSubtasks(initialData.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setStatus('TODO');
      setPriority('MEDIUM');
      setCategory('General');
      setTags([]);
      setDueDate('');
      setDueTime('');
      setSubtasks([]);
    }
  }, [initialData, isOpen]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const clean = tagInput.trim().toLowerCase().replace(/,/g, '');
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!subtaskTitle.trim()) return;
    setSubtasks([...subtasks, { title: subtaskTitle.trim(), isCompleted: false }]);
    setSubtaskTitle('');
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category: category.trim() || 'General',
      tags,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      dueTime: dueTime || null,
      subtasks: subtasks.map((st) => ({
        title: st.title,
        isCompleted: Boolean(st.isCompleted),
      })),
    };

    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Task' : 'Create New Task'}
      subtitle={
        initialData
          ? 'Modify task parameters or subtasks'
          : 'Create a task that can trigger automated workflows'
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Task Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Complete Q3 Product Architecture Review"
          required
        />

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Add detailed context, links, or notes..."
            className="w-full rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-100 text-sm px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Status, Priority, Category Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'TODO', label: 'To Do' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'OVERDUE', label: 'Overdue' },
            ]}
          />

          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
              { value: 'URGENT', label: 'Urgent' },
            ]}
          />

          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Work, College, Personal"
          />
        </div>

        {/* Due Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Due Date"
            type="date"
            icon={Calendar}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            label="Due Time (Optional)"
            type="time"
            icon={Clock}
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Tags (Press Enter to add)
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag and hit Enter..."
              icon={Tag}
            />
          </div>
          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 text-slate-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Subtasks Section */}
        <div className="pt-3 border-t border-white/10">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <ListTodo className="w-3.5 h-3.5 text-indigo-400" />
            Subtasks
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask(e)}
              placeholder="Add subtask step..."
              className="flex-1 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-100 text-xs px-3 py-2 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddSubtask}
              icon={Plus}
            >
              Add
            </Button>
          </div>

          {subtasks.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {subtasks.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <span className="text-slate-200">{st.title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
