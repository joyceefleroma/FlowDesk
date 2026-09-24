import React, { useState, useEffect } from 'react';
import { automationService } from '../services/automationService';
import { workflowService } from '../services/workflowService';
import { AutomationLogTable } from '../components/history/AutomationLogTable';
import { LogDetailModal } from '../components/history/LogDetailModal';
import { StatCard } from '../components/dashboard/StatCard';
import { Skeleton } from '../components/common/Skeleton';
import { History, CheckCircle2, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AutomationHistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState(null);

  const toast = useToast();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const [logsRes, statsRes, wfRes] = await Promise.all([
        automationService.getLogs({
          workflowId: selectedWorkflow || undefined,
          status: statusFilter !== 'ALL' ? statusFilter : undefined,
          limit: 100,
        }),
        automationService.getStats(),
        workflowService.getWorkflows(),
      ]);

      if (logsRes.success && logsRes.data) setLogs(logsRes.data);
      if (statsRes.success && statsRes.data) setStats(statsRes.data);
      if (wfRes.success && wfRes.data) setWorkflows(wfRes.data);
    } catch (err) {
      toast.error('Failed to load automation audit telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [selectedWorkflow, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Automation Execution Telemetry
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Full execution audit trail showing trigger origin, evaluated conditions, and action outcomes.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Executions"
          value={stats?.totalExecutions || 0}
          subtitle="All-time workflow executions"
          icon={History}
          color="indigo"
        />

        <StatCard
          title="Success Rate"
          value={`${stats?.successRate || 100}%`}
          subtitle={`${stats?.successCount || 0} successful triggers`}
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="Skipped Rules"
          value={stats?.skippedCount || 0}
          subtitle="Conditions evaluated to false"
          icon={ShieldCheck}
          color="cyan"
        />

        <StatCard
          title="Execution Failures"
          value={stats?.failedCount || 0}
          subtitle="Errors during mutation"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </div>

        {/* Workflow Filter */}
        <select
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Workflows</option>
          {workflows.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="SKIPPED">Skipped (Conditions Unmet)</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* Log Table */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      ) : (
        <AutomationLogTable logs={logs} onSelectLog={(log) => setSelectedLog(log)} />
      )}

      {/* Log Detail Modal */}
      {selectedLog && (
        <LogDetailModal
          isOpen={Boolean(selectedLog)}
          onClose={() => setSelectedLog(null)}
          log={selectedLog}
        />
      )}
    </div>
  );
};
