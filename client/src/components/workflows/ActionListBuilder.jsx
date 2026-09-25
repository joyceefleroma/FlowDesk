import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
            <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
              New Priority
            </label>
            <select
              value={payload.priority || 'HIGH'}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, priority: e.target.value } })
              }
              className="w-full rounded-2xl bg-black/50 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
            >
              <option value="LOW" className="bg-[#150409]">Low</option>
              <option value="MEDIUM" className="bg-[#150409]">Medium</option>
              <option value="HIGH" className="bg-[#150409]">High</option>
              <option value="URGENT" className="bg-[#150409]">Urgent</option>
            </select>
          </div>
        );

      case 'CHANGE_STATUS':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
              New Status
            </label>
            <select
              value={payload.status || 'COMPLETED'}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, status: e.target.value } })
              }
              className="w-full rounded-2xl bg-black/50 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
            >
              <option value="TODO" className="bg-[#150409]">To Do</option>
              <option value="IN_PROGRESS" className="bg-[#150409]">In Progress</option>
              <option value="COMPLETED" className="bg-[#150409]">Completed</option>
              <option value="OVERDUE" className="bg-[#150409]">Overdue</option>
            </select>
          </div>
        );

      case 'CREATE_REMINDER':
        return (
          <div className="w-full space-y-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
                Reminder Title
              </label>
              <input
                type="text"
                value={payload.title || ''}
                onChange={(e) =>
                  handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
                }
                placeholder="e.g. Deadline Alert: Review Assignment"
                className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
              />
            </div>
          </div>
        );

      case 'CREATE_NOTIFICATION':
        return (
          <div className="w-full space-y-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
                Notification Message
              </label>
              <input
                type="text"
                value={payload.message || ''}
                onChange={(e) =>
                  handleUpdateAction(index, { payload: { ...payload, message: e.target.value } })
                }
                placeholder="e.g. Automation executed on this task"
                className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
              />
            </div>
          </div>
        );

      case 'CREATE_FOLLOW_UP_TASK':
        return (
          <div className="w-full space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
                  Follow-up Title
                </label>
                <input
                  type="text"
                  value={payload.title || ''}
                  onChange={(e) =>
                    handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
                  }
                  placeholder="e.g. Submit deliverables"
                  className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
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
                  className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
                />
              </div>
            </div>
          </div>
        );

      case 'ADD_TAG':
      case 'REMOVE_TAG':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
              Tag Name
            </label>
            <input
              type="text"
              value={payload.tag || ''}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, tag: e.target.value } })
              }
              placeholder="e.g. urgent-review"
              className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
            />
          </div>
        );

      case 'ADD_SUBTASK':
        return (
          <div className="w-full">
            <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
              Subtask Step Title
            </label>
            <input
              type="text"
              value={payload.title || ''}
              onChange={(e) =>
                handleUpdateAction(index, { payload: { ...payload, title: e.target.value } })
              }
              placeholder="e.g. Notify manager of completion"
              className="w-full rounded-2xl bg-black/40 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md"
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
        <div className="p-4 rounded-2xl border border-dashed border-red-500/30 text-center text-xs text-red-300 bg-red-950/30 backdrop-blur-md">
          At least one action is required to trigger when conditions are met.
        </div>
      ) : (
        <div className="space-y-3">
          {actions.map((act, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-black/40 border border-white/15 flex flex-col sm:flex-row items-start gap-4 backdrop-blur-xl shadow-glow"
            >
              {/* Order Indicator */}
              <div className="w-7 h-7 rounded-2xl bg-red-600/30 border border-red-500 text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-2 shadow-glow">
                {idx + 1}
              </div>

              {/* Action Type Selector */}
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] uppercase font-bold text-slate-300 block mb-1">
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
                  className="w-full rounded-2xl bg-black/50 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 backdrop-blur-md cursor-pointer"
                >
                  {ACTION_TYPES.map((a) => (
                    <option key={a.value} value={a.value} className="bg-[#150409]">
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
                  className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/15 rounded-2xl transition-colors w-full sm:w-auto flex items-center justify-center cursor-pointer"
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
