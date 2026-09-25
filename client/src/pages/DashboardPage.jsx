import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { taskService } from '../services/taskService';
import { StatCard } from '../components/dashboard/StatCard';
import { CompletionTrendChart } from '../components/dashboard/CompletionTrendChart';
import { PriorityDonutChart } from '../components/dashboard/PriorityDonutChart';
import { QuickTaskCreator } from '../components/dashboard/QuickTaskCreator';
import { RecentActivityList } from '../components/dashboard/RecentActivityList';
import { TaskCard } from '../components/tasks/TaskCard';
import { Skeleton } from '../components/common/Skeleton';
import { CheckSquare, Zap, Clock, AlertTriangle, ListTodo, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchDashboardData = async () => {
    try {
      const res = await dashboardService.getOverview();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      toast.error('Failed to load dashboard overview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTaskStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus);
      toast.success(`Task status updated to ${newStatus}`);
      fetchDashboardData();
    } catch (err) {
      toast.error('Failed to update task status');
    }
  };

  const handleSubtaskToggle = async (taskId, subtaskId, isCompleted) => {
    try {
      await taskService.toggleSubtask(taskId, subtaskId, isCompleted);
      fetchDashboardData();
    } catch (err) {
      toast.error('Failed to update subtask');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-20" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {};

  return (
    <div className="space-y-6">
      {/* 1. Stat Cards KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={kpis.totalTasks || 0}
          subtitle={`${kpis.completedTasks || 0} tasks completed`}
          icon={CheckSquare}
          color="indigo"
          trend={{
            positive: true,
            value: `${kpis.completionRate || 0}%`,
            label: 'Completion Rate',
          }}
        />

        <StatCard
          title="Active Workflows"
          value={kpis.activeWorkflows || 0}
          subtitle={`Out of ${kpis.totalWorkflows || 0} configured rules`}
          icon={Zap}
          color="cyan"
          trend={{
            positive: true,
            value: `${kpis.totalAutomations || 0}`,
            label: 'Automations Executed',
          }}
        />

        <StatCard
          title="Due Today"
          value={kpis.dueTodayTasks || 0}
          subtitle="Pending tasks for today"
          icon={Clock}
          color="amber"
        />

        <StatCard
          title="Overdue Tasks"
          value={kpis.overdueTasks || 0}
          subtitle="Requires attention"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* 2. Quick Task Creator */}
      <QuickTaskCreator onTaskCreated={() => fetchDashboardData()} />

      {/* 3. Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <CompletionTrendChart data={data?.completionTrends || []} />
        </div>
        <div>
          <PriorityDonutChart data={data?.priorityDistribution || []} />
        </div>
      </div>

      {/* 4. Dual Bottom Section: Recent Tasks & Recent Automation Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Recent Tasks */}
        <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">Recent Tasks</h4>
              <p className="text-xs text-white/60">Latest active and prioritized items</p>
            </div>
            <Link
              to="/tasks"
              className="text-xs text-brand-lightRed hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {data?.recentTasks?.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white/40 text-xs">
              <CheckSquare className="w-8 h-8 opacity-40 mb-2" />
              No tasks created yet. Use the Quick Add bar above.
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto flex-1 max-h-[380px] -mr-1 pr-1">
              {data.recentTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleTaskStatusChange}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onSubtaskToggle={handleSubtaskToggle}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Automation Log Stream */}
        <RecentActivityList logs={data?.recentLogs || []} />
      </div>
    </div>
  );
};
