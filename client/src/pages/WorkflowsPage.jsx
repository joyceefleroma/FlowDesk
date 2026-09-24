import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { workflowService } from '../services/workflowService';
import { WorkflowCard } from '../components/workflows/WorkflowCard';
import { WorkflowSimulatorModal } from '../components/workflows/WorkflowSimulatorModal';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Zap, Plus, Sparkles, Filter } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const WorkflowsPage = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'INACTIVE'
  const [simulatingWorkflow, setSimulatingWorkflow] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();

  const fetchWorkflows = async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeFilter === 'ACTIVE') params.isActive = true;
      if (activeFilter === 'INACTIVE') params.isActive = false;

      const res = await workflowService.getWorkflows(params);
      if (res.success && res.data) {
        setWorkflows(res.data);
      }
    } catch (err) {
      toast.error('Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, [activeFilter]);

  const handleToggleActive = async (workflowId, isActive) => {
    try {
      await workflowService.toggleWorkflow(workflowId, isActive);
      toast.success(`Workflow ${isActive ? 'enabled' : 'disabled'}`);
      setWorkflows((prev) =>
        prev.map((w) => (w._id === workflowId ? { ...w, isActive } : w))
      );
    } catch (err) {
      toast.error('Failed to toggle workflow state');
    }
  };

  const handleDeleteWorkflow = async (workflowId) => {
    if (!window.confirm('Are you sure you want to delete this workflow rule?')) return;
    try {
      await workflowService.deleteWorkflow(workflowId);
      toast.info('Workflow deleted');
      setWorkflows((prev) => prev.filter((w) => w._id !== workflowId));
    } catch (err) {
      toast.error('Failed to delete workflow');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Workflow Automations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Define intelligent Trigger $\rightarrow$ Condition $\rightarrow$ Action rules to eliminate manual busywork.
          </p>
        </div>

        <Link to="/workflows/new" className="self-start sm:self-auto">
          <Button variant="glow" icon={Plus}>
            Build New Workflow
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {['ALL', 'ACTIVE', 'INACTIVE'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'ALL' ? 'All Workflows' : tab === 'ACTIVE' ? 'Active Only' : 'Disabled'}
          </button>
        ))}
      </div>

      {/* Workflows Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : workflows.length === 0 ? (
        <EmptyState
          icon={Zap}
          title="No workflows configured"
          description={
            activeFilter !== 'ALL'
              ? 'No workflows match the active filter status.'
              : 'You haven’t created any automated rules yet. Build your first Trigger-Condition-Action workflow to automate your tasks.'
          }
          actionLabel="Build First Workflow"
          actionIcon={Plus}
          onAction={() => navigate('/workflows/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <WorkflowCard
              key={wf._id}
              workflow={wf}
              onToggleActive={handleToggleActive}
              onEdit={(w) => navigate(`/workflows/${w._id}/edit`)}
              onDelete={handleDeleteWorkflow}
              onTestSimulator={(w) => setSimulatingWorkflow(w)}
            />
          ))}
        </div>
      )}

      {/* Workflow Dry-Run Simulator Modal */}
      {simulatingWorkflow && (
        <WorkflowSimulatorModal
          isOpen={Boolean(simulatingWorkflow)}
          onClose={() => setSimulatingWorkflow(null)}
          workflow={simulatingWorkflow}
        />
      )}
    </div>
  );
};
