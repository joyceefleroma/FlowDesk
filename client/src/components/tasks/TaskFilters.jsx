import React from 'react';
import { Search, Filter, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

export const TaskFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderToggle,
  viewMode,
  onViewModeToggle,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
      {/* Top Search & View Mode row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title or description..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* View Mode Toggle (List vs. Kanban) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-700/60 self-end sm:self-auto shrink-0">
          <button
            onClick={() => onViewModeToggle('list')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">List</span>
          </button>
          <button
            onClick={() => onViewModeToggle('kanban')}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'kanban' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            title="Kanban Board View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">Kanban</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/5 text-xs">
        <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="OVERDUE">Overdue</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        {/* Sort By */}
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-slate-500 text-[10px] uppercase font-semibold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-xl bg-slate-900 border border-slate-700/60 px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="createdAt">Date Created</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>

          <button
            onClick={onSortOrderToggle}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-400 hover:text-white transition-colors"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
