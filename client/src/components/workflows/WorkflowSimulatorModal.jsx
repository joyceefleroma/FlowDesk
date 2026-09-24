import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { taskService } from '../../services/taskService';
import { workflowService } from '../../services/workflowService';
import { Play, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const WorkflowSimulatorModal = ({
  isOpen,
  onClose,
  workflow,
}) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSimulationResult(null);
      fetchTasks();
    }
  }, [isOpen]);

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await taskService.getTasks({ limit: 50 });
      if (res.success && res.data) {
        setTasks(res.data);
        if (res.data.length > 0) {
          setSelectedTaskId(res.data[0]._id);
        }
      }
    } catch (err) {
      console.error('[Simulator] Failed to load tasks:', err.message);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleRunSimulation = async () => {
    if (!workflow || !selectedTaskId) return;

    setSimulating(true);
    try {
      const res = await workflowService.testWorkflow(workflow._id, selectedTaskId);
      if (res.success && res.data) {
        setSimulationResult(res.data);
      }
    } catch (err) {
      console.error('[Simulator] Simulation run failed:', err.message);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Dry-Run Test: ${workflow?.name || 'Workflow'}`}
      subtitle="Simulate condition evaluations on an existing task without executing mutations"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Task Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Select Test Task
          </label>
          {loadingTasks ? (
            <div className="text-xs text-slate-400 py-2">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-xs text-amber-400 p-3 rounded-xl bg-amber-950/20 border border-amber-500/20">
              No tasks found. Please create a task first to run a simulation.
            </div>
          ) : (
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {tasks.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title} ({t.status} • {t.priority})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="glow"
          icon={Play}
          onClick={handleRunSimulation}
          isLoading={simulating}
          disabled={!selectedTaskId || tasks.length === 0}
          className="w-full"
        >
          Run Dry-Run Simulation
        </Button>

        {/* Simulation Output */}
        {simulationResult && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                simulationResult.conditionsMet
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}
            >
              {simulationResult.conditionsMet ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h5 className="text-sm font-bold text-white">
                  {simulationResult.conditionsMet ? 'Conditions Passed!' : 'Conditions Did Not Match'}
                </h5>
                <p className="text-xs mt-0.5 leading-relaxed text-slate-300">
                  {simulationResult.simulationSummary}
                </p>
              </div>
            </div>

            {/* Condition breakdown table */}
            {simulationResult.evaluatedConditions?.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <h6 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Evaluated Rules
                </h6>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {simulationResult.evaluatedConditions.map((res, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {res.passed ? (
                          <span className="text-emerald-400 font-bold">✓</span>
                        ) : (
                          <span className="text-rose-400 font-bold">✕</span>
                        )}
                        <span className="text-white font-medium">{res.field}</span>
                        <span className="text-slate-500">{res.operator}</span>
                        <span className="text-indigo-300 font-mono">
                          {String(res.expectedValue)}
                        </span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px]">
                        Actual: {String(res.actualValue ?? 'null')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
