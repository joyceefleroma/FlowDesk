import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workflowService } from '../services/workflowService';
import { TriggerSelector } from '../components/workflows/TriggerSelector';
import { ConditionListBuilder } from '../components/workflows/ConditionListBuilder';
import { ActionListBuilder } from '../components/workflows/ActionListBuilder';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Skeleton } from '../components/common/Skeleton';
import { Zap, ArrowLeft, Save, Sparkles, Sliders, CheckCircle2, ChevronDown } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const WorkflowBuilderPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Workflow State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [trigger, setTrigger] = useState({
    type: 'DEADLINE_APPROACHING',
    config: { advanceNoticeHours: 24 },
  });
  const [conditions, setConditions] = useState([
    { field: 'status', operator: 'NOT_EQUALS', value: 'COMPLETED', logicalOperator: 'AND' },
  ]);
  const [actions, setActions] = useState([
    { type: 'CHANGE_PRIORITY', payload: { priority: 'URGENT' }, order: 0 },
    { type: 'CREATE_REMINDER', payload: { title: 'Deadline Approaching Soon' }, order: 1 },
  ]);

  useEffect(() => {
    if (isEditMode) {
      const loadWorkflow = async () => {
        try {
          const res = await workflowService.getWorkflowById(id);
          if (res.success && res.data) {
            const wf = res.data;
            setName(wf.name || '');
            setDescription(wf.description || '');
            setIsActive(wf.isActive ?? true);
            setTrigger(wf.trigger || { type: 'TASK_CREATED', config: {} });
            setConditions(wf.conditions || []);
            setActions(wf.actions || []);
          }
        } catch (err) {
          toast.error('Failed to load workflow configuration');
          navigate('/workflows');
        } finally {
          setLoading(false);
        }
      };
      loadWorkflow();
    }
  }, [id, isEditMode, navigate]);

  const handleApplyTemplate = (template) => {
    setName(template.name);
    setDescription(template.description);
    setTrigger(template.trigger);
    setConditions(template.conditions);
    setActions(template.actions);
    toast.info(`Loaded "${template.name}" template`);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning('Please specify a workflow name');
      return;
    }
    if (!trigger.type) {
      toast.warning('Please select a trigger');
      return;
    }
    if (!actions || actions.length === 0) {
      toast.warning('At least one action is required');
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      isActive,
      trigger,
      conditions,
      actions,
    };

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await workflowService.updateWorkflow(id, payload);
        toast.success(`Workflow "${payload.name}" updated!`);
      } else {
        await workflowService.createWorkflow(payload);
        toast.success(`Workflow "${payload.name}" created and active!`);
      }
      navigate('/workflows');
    } catch (err) {
      toast.error(err.message || 'Failed to save workflow');
    } finally {
      setIsSubmitting(false);
    }
  };

  const templates = [
    {
      name: 'Urgent Deadline Auto-Escalator',
      description: 'Increases priority to Urgent and creates a reminder 24h before deadline.',
      trigger: { type: 'DEADLINE_APPROACHING', config: { advanceNoticeHours: 24 } },
      conditions: [
        { field: 'status', operator: 'NOT_EQUALS', value: 'COMPLETED', logicalOperator: 'AND' },
      ],
      actions: [
        { type: 'CHANGE_PRIORITY', payload: { priority: 'URGENT' }, order: 0 },
        { type: 'CREATE_REMINDER', payload: { title: 'Approaching Deadline' }, order: 1 },
      ],
    },
    {
      name: 'Auto Follow-up On Task Completion',
      description: 'Automatically creates a follow-up task 2 days after completing any task.',
      trigger: { type: 'TASK_COMPLETED', config: {} },
      conditions: [],
      actions: [
        {
          type: 'CREATE_FOLLOW_UP_TASK',
          payload: { title: 'Review & Deliver', offsetDays: 2 },
          order: 0,
        },
      ],
    },
    {
      name: 'High-Priority Assignment Notifier',
      description: 'Dispatches notification when high-priority college or work task is created.',
      trigger: { type: 'TASK_CREATED', config: {} },
      conditions: [
        { field: 'priority', operator: 'EQUALS', value: 'HIGH', logicalOperator: 'AND' },
      ],
      actions: [
        {
          type: 'CREATE_NOTIFICATION',
          payload: { message: 'High priority task created. Schedule focus time.' },
          order: 0,
        },
        { type: 'ADD_TAG', payload: { tag: 'high-focus' }, order: 1 },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/workflows')}
            className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEditMode ? 'Edit Workflow' : 'Visual Workflow Builder'}
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Configure your WHEN (Trigger) → IF (Conditions) → THEN (Actions) pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/workflows')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="glow"
            icon={Save}
            isLoading={isSubmitting}
          >
            {isEditMode ? 'Save Changes' : 'Activate Workflow'}
          </Button>
        </div>
      </div>

      {/* Preset Templates Bar */}
      {!isEditMode && (
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white/80">
            <Sparkles className="w-4 h-4 text-brand-lightRed" />
            Quick Start Workflow Templates:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {templates.map((tpl) => (
              <button
                key={tpl.name}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="p-3 text-left rounded-xl bg-white/[0.03] hover:bg-brand-red/15 border border-white/10 hover:border-brand-red/40 transition-all text-xs group"
              >
                <h6 className="font-semibold text-white group-hover:text-brand-lightRed truncate">
                  {tpl.name}
                </h6>
                <p className="text-[11px] text-white/60 mt-1 line-clamp-1">{tpl.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Meta Card: Name & Active state */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <Input
              label="Workflow Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Urgent Deadline Escalation Rule"
              required
            />
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center pt-2 sm:pt-6">
            <label className="text-xs font-bold uppercase tracking-wider text-white/60">
              Active Status:
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
            Workflow Description (Optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize the intent and behavior of this automated rule..."
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs px-3.5 py-2.5 placeholder:text-white/30 focus:outline-none focus:border-brand-red focus:bg-white/[0.06] transition-all"
          />
        </div>
      </div>

      {/* STEP 1: WHEN (Trigger) */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 relative shadow-glow-red">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <span className="w-7 h-7 rounded-xl bg-brand-red/20 text-brand-lightRed font-black text-xs flex items-center justify-center border border-brand-red/30">
            1
          </span>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              WHEN (Trigger Event)
            </h4>
            <p className="text-xs text-white/60">Choose the task event that starts this automation</p>
          </div>
        </div>

        <TriggerSelector selectedTrigger={trigger} onSelectTrigger={setTrigger} />
      </div>

      {/* STEP 2: IF (Conditions) */}
      <div className="glass-panel p-6 rounded-3xl border border-white/20 relative shadow-card">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <span className="w-7 h-7 rounded-xl bg-white/10 text-white font-black text-xs flex items-center justify-center border border-white/20">
            2
          </span>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              IF (Condition Rules)
            </h4>
            <p className="text-xs text-white/60">
              Specify filters that the task must satisfy before executing actions
            </p>
          </div>
        </div>

        <ConditionListBuilder conditions={conditions} onChange={setConditions} />
      </div>

      {/* STEP 3: THEN (Actions) */}
      <div className="glass-panel p-6 rounded-3xl border border-brand-red/30 relative shadow-glow-red">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <span className="w-7 h-7 rounded-xl bg-brand-red/20 text-brand-lightRed font-black text-xs flex items-center justify-center border border-brand-red/30">
            3
          </span>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              THEN (Automated Actions)
            </h4>
            <p className="text-xs text-white/60">
              Define the mutations, tasks, and alerts to perform in sequence
            </p>
          </div>
        </div>

        <ActionListBuilder actions={actions} onChange={setActions} />
      </div>

      {/* Bottom Save Action */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/workflows')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="glow"
          size="lg"
          icon={Save}
          isLoading={isSubmitting}
        >
          {isEditMode ? 'Update Workflow Rule' : 'Save & Enable Workflow'}
        </Button>
      </div>
    </form>
  );
};
