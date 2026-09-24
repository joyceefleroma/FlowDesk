import React from 'react';
import { Plus, Trash2, SlidersHorizontal, Info } from 'lucide-react';
import { Button } from '../common/Button';

const FIELDS = [
  { value: 'status', label: 'Task Status' },
  { value: 'priority', label: 'Priority Level' },
  { value: 'category', label: 'Category' },
  { value: 'tags', label: 'Tags' },
  { value: 'dueDateDistanceHours', label: 'Hours Until Due Date' },
  { value: 'subtasksCompleted', label: 'Subtasks Completed (%)' },
  { value: 'title', label: 'Task Title' },
];

const OPERATORS = [
  { value: 'EQUALS', label: 'Equals (=)' },
  { value: 'NOT_EQUALS', label: 'Does Not Equal (≠)' },
  { value: 'CONTAINS', label: 'Contains' },
  { value: 'IN', label: 'Is In List (comma separated)' },
  { value: 'GREATER_THAN', label: 'Greater Than (>)' },
  { value: 'LESS_THAN', label: 'Less Than (<)' },
  { value: 'WITHIN_NEXT_HOURS', label: 'Within Next (Hours)' },
  { value: 'IS_EMPTY', label: 'Is Empty' },
  { value: 'IS_NOT_EMPTY', label: 'Is Not Empty' },
];

export const ConditionListBuilder = ({ conditions = [], onChange }) => {
  const handleAddCondition = () => {
    const newCondition = {
      field: 'status',
      operator: 'EQUALS',
      value: 'TODO',
      logicalOperator: 'AND',
    };
    onChange([...conditions, newCondition]);
  };

  const handleUpdateCondition = (index, updatedFields) => {
    const updated = conditions.map((cond, i) => {
      if (i === index) {
        return { ...cond, ...updatedFields };
      }
      return cond;
    });
    onChange(updated);
  };

  const handleRemoveCondition = (index) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  const renderValueInput = (cond, index) => {
    if (cond.operator === 'IS_EMPTY' || cond.operator === 'IS_NOT_EMPTY') {
      return (
        <span className="text-xs text-slate-500 italic py-2 px-3 bg-slate-900/40 rounded-xl border border-slate-800">
          No value needed
        </span>
      );
    }

    if (cond.field === 'status') {
      return (
        <select
          value={cond.value || 'TODO'}
          onChange={(e) => handleUpdateCondition(index, { value: e.target.value })}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-full"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="OVERDUE">Overdue</option>
        </select>
      );
    }

    if (cond.field === 'priority') {
      return (
        <select
          value={cond.value || 'MEDIUM'}
          onChange={(e) => handleUpdateCondition(index, { value: e.target.value })}
          className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-full"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      );
    }

    return (
      <input
        type={
          cond.field === 'dueDateDistanceHours' || cond.field === 'subtasksCompleted'
            ? 'number'
            : 'text'
        }
        value={cond.value || ''}
        onChange={(e) => handleUpdateCondition(index, { value: e.target.value })}
        placeholder="Enter comparison value..."
        className="rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-full"
      />
    );
  };

  return (
    <div className="space-y-3">
      {conditions.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400 bg-slate-900/30">
          <Info className="w-4 h-4 mx-auto mb-1 text-slate-500" />
          No conditions configured. This workflow will run on <strong>ALL</strong> instances of the trigger.
        </div>
      ) : (
        <div className="space-y-3">
          {conditions.map((cond, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              {/* Field Selector */}
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Field
                </label>
                <select
                  value={cond.field}
                  onChange={(e) => {
                    const field = e.target.value;
                    let defVal = '';
                    if (field === 'status') defVal = 'TODO';
                    if (field === 'priority') defVal = 'HIGH';
                    if (field === 'dueDateDistanceHours') defVal = 24;
                    handleUpdateCondition(idx, { field, value: defVal });
                  }}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {FIELDS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Operator Selector */}
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Operator
                </label>
                <select
                  value={cond.operator}
                  onChange={(e) => handleUpdateCondition(idx, { operator: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/60 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {OPERATORS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Value Input */}
              <div className="w-full sm:w-1/3">
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Expected Value
                </label>
                {renderValueInput(cond, idx)}
              </div>

              {/* Remove Button */}
              <div className="sm:self-end pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleRemoveCondition(idx)}
                  className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors w-full sm:w-auto flex items-center justify-center"
                  title="Remove condition"
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
        onClick={handleAddCondition}
        icon={Plus}
        className="mt-2"
      >
        Add Filter Condition
      </Button>
    </div>
  );
};
