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
    <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/10 space-y-3 shadow-glow">
      {/* Top Search & View Mode row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-red-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title, category, or tags..."
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/15 rounded-2xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/25 backdrop-blur-md"
          />
        </div>

        {/* View Mode Toggle (List vs. Kanban) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 self-end sm:self-auto shrink-0 backdrop-blur-md">
          <button
            onClick={() => onViewModeToggle('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-glow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">List</span>
          </button>
          <button
            onClick={() => onViewModeToggle('kanban')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'kanban'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-glow'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Kanban Board View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">Kanban</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/10 text-xs">
        <span className="text-red-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Filter className="w-3 h-3" /> Filters:
        </span>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-2xl bg-black/50 border border-white/15 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
        >
          <option value="ALL" className="bg-[#150409]">All Statuses</option>
          <option value="TODO" className="bg-[#150409]">To Do</option>
          <option value="IN_PROGRESS" className="bg-[#150409]">In Progress</option>
          <option value="COMPLETED" className="bg-[#150409]">Completed</option>
          <option value="OVERDUE" className="bg-[#150409]">Overdue</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-2xl bg-black/50 border border-white/15 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
        >
          <option value="ALL" className="bg-[#150409]">All Priorities</option>
          <option value="LOW" className="bg-[#150409]">Low</option>
          <option value="MEDIUM" className="bg-[#150409]">Medium</option>
          <option value="HIGH" className="bg-[#150409]">High</option>
          <option value="URGENT" className="bg-[#150409]">Urgent</option>
        </select>

        {/* Sort By */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-slate-400 text-[10px] uppercase font-bold">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-2xl bg-black/50 border border-white/15 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
          >
            <option value="createdAt" className="bg-[#150409]">Date Created</option>
            <option value="dueDate" className="bg-[#150409]">Due Date</option>
            <option value="priority" className="bg-[#150409]">Priority</option>
            <option value="title" className="bg-[#150409]">Title</option>
          </select>

          <button
            onClick={onSortOrderToggle}
            className="p-1.5 rounded-xl bg-black/50 border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
