import React from 'react';
import { Plus, Trash2, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

const ACTION_TYPES = [
  { value: 'CHANGE_PRIORITY', label: 'Change Task Priority' },
  { value: 'CHANGE_STATUS', label: 'Change Task Status' },
  { value: 'CREATE_REMINDER', label: 'Send Urgent In-App Reminder' },
  { value: 'CREATE_NOTIFICATION', label: 'Create Notification' },
  { value: 'CREATE_FOLLOW_UP_TASK', label: 'Create Follow-up Task' },
  { value: 'ADD_TAG', label: 'Add Tag' },
  { value: 'REMOVE_TAG', label: 'Remove Tag' },
  { value: 'ADD_SUBTASK', label: 'Append Subtask' },
];

export const ActionListBuilder = ({ actions = [], onChange }) => {
  const handleAddAction = () => {
    const newAction = {
      type: 'CHANGE_PRIORITY',
      payload: { priority: 'HIGH' },
      order: actions.length,
    };
    onChange([...actions, newAction]);
  };

  const handleUpdateAction = (index, updatedFields) => {
    const updated = actions.map((act, i) => {
      if (i === index) {
        return { ...act, ...updatedFields };
      }
      return act;
    });
    onChange(updated);
  };

  const handleRemoveAction = (index) => {
    onChange(actions.filter((_, i) => i !== index));
  };

  const renderPayloadInputs = (action, index) => {
    const { type, payload = {} } = action;

    switch (type) {
      case 'CHANGE_PRIORITY':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              New Priority
            </label>
            <select
              value={payload.priority || 'HIGH'}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, priority: e.target.value } })
              }
              className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        );

      case 'CHANGE_STATUS':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              New Status
            </label>
            <select
              value={payload.status || 'COMPLETED'}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, status: e.target.value } })
              }
              className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
        );

      case 'CREATE_REMINDER':
        return (
          <div className="w-full space-y-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Reminder Title
              </label>
              <input
                type="text"
                value={payload.title || ''}
                onChange={(e) =>
                  handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
                }
                placeholder="e.g. Deadline Alert: Review Assignment"
                className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 'CREATE_NOTIFICATION':
        return (
          <div className="w-full space-y-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Notification Message
              </label>
              <input
                type="text"
                value={payload.message || ''}
                onChange={(e) =>
                  handleUpdateAction(index, { payload: { ...payload, message: e.target.value } })
                }
                placeholder="e.g. Automation executed on this task"
                className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        );

      case 'CREATE_FOLLOW_UP_TASK':
        return (
          <div className="w-full space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Follow-up Title
                </label>
                <input
                  type="text"
                  value={payload.title || ''}
                  onChange={(e) =>
                    handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
                  }
                  placeholder="e.g. Submit deliverables"
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Due in (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={payload.offsetDays || 2}
                  onChange={(e) =>
                    handleUpdateAction(index, {
                      payload: { ...payload, offsetDays: Number(e.target.value) },
                    })
                  }
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      case 'ADD_TAG':
      case 'REMOVE_TAG':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Tag Name
            </label>
            <input
              type="text"
              value={payload.tag || ''}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, tag: e.target.value } })
              }
              placeholder="e.g. urgent-review"
              className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        );

      case 'ADD_SUBTASK':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Subtask Step Title
            </label>
            <input
              type="text"
              value={payload.title || ''}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
              }
              placeholder="e.g. Notify manager of completion"
              className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {actions.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-rose-900/50 text-center text-xs text-rose-400 bg-rose-950/20">
          At least one action is required to trigger when conditions are met.
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((act, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-start gap-4"
            >
              {/* Order Indicator */}
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                {idx + 1}
              </div>

              {/* Action Type Selector */}
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Action Type
                </label>
                <select
                  value={act.type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    let defPayload = {};
                    if (newType === 'CHANGE_PRIORITY') defPayload = { priority: 'HIGH' };
                    if (newType === 'CHANGE_STATUS') defPayload = { status: 'COMPLETED' };
                    if (newType === 'CREATE_REMINDER') defPayload = { title: 'Deadline Alert' };
                    if (newType === 'CREATE_NOTIFICATION') defPayload = { message: 'Automation triggered' };
                    if (newType === 'CREATE_FOLLOW_UP_TASK') defPayload = { title: 'Follow-up Task', offsetDays: 2 };
                    if (newType === 'ADD_TAG' || newType === 'REMOVE_TAG') defPayload = { tag: 'urgent' };
                    if (newType === 'ADD_SUBTASK') defPayload = { title: 'Automated step' };

                    handleUpdateAction(idx, { type: newType, payload: defPayload });
                  }}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {ACTION_TYPES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Payload Configuration */}
              <div className="w-full sm:flex-1">{renderPayloadInputs(act, idx)}</div>

              {/* Delete Action Button */}
              <div className="sm:self-center">
                <button
                  type="button"
                  onClick={() => handleRemoveAction(idx)}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors w-full sm:w-auto flex items-center justify-center"
                  title="Remove action"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={handleAddAction}
        icon={Plus}
        className="mt-2"
      >
        Add Action Step
      </Button>
    </div>
  );
};
