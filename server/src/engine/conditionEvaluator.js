const { CONDITION_OPERATOR } = require('../config/constants');

/**
 * Extracts normalized value from the task object based on condition field.
 */
const extractTaskFieldValue = (task, field) => {
  if (!task) return undefined;

  switch (field) {
    case 'status':
      return task.status;
    case 'priority':
      return task.priority;
    case 'category':
      return task.category || 'General';
    case 'tags':
      return Array.isArray(task.tags) ? task.tags : [];
    case 'title':
      return task.title || '';
    case 'dueDateDistanceHours': {
      if (!task.dueDate) return null;
      const now = new Date();
      const due = new Date(task.dueDate);
      const diffMs = due.getTime() - now.getTime();
      return diffMs / (1000 * 60 * 60); // Difference in hours
    }
    case 'subtasksCompleted': {
      if (!task.subtasks || task.subtasks.length === 0) return 0;
      const completedCount = task.subtasks.filter(st => st.isCompleted).length;
      return (completedCount / task.subtasks.length) * 100; // Percentage completed
    }
    default:
      return task[field];
  }
};

/**
 * Evaluates a single condition against the task state.
 */
const evaluateSingleCondition = (condition, task) => {
  const { field, operator, value: expectedValue } = condition;
  const actualValue = extractTaskFieldValue(task, field);

  let passed = false;

  switch (operator) {
    case CONDITION_OPERATOR.EQUALS:
      passed = String(actualValue || '').toLowerCase() === String(expectedValue || '').toLowerCase();
      break;

    case CONDITION_OPERATOR.NOT_EQUALS:
      passed = String(actualValue || '').toLowerCase() !== String(expectedValue || '').toLowerCase();
      break;

    case CONDITION_OPERATOR.CONTAINS:
      if (Array.isArray(actualValue)) {
        passed = actualValue.some(item => String(item).toLowerCase() === String(expectedValue).toLowerCase());
      } else {
        passed = String(actualValue || '').toLowerCase().includes(String(expectedValue || '').toLowerCase());
      }
      break;

    case CONDITION_OPERATOR.IN: {
      const allowed = Array.isArray(expectedValue)
        ? expectedValue.map(v => String(v).trim().toLowerCase())
        : String(expectedValue || '').split(',').map(v => v.trim().toLowerCase());

      if (Array.isArray(actualValue)) {
        passed = actualValue.some(v => allowed.includes(String(v).toLowerCase()));
      } else {
        passed = allowed.includes(String(actualValue || '').toLowerCase());
      }
      break;
    }

    case CONDITION_OPERATOR.GREATER_THAN:
      passed = Number(actualValue) > Number(expectedValue);
      break;

    case CONDITION_OPERATOR.LESS_THAN:
      passed = Number(actualValue) < Number(expectedValue);
      break;

    case CONDITION_OPERATOR.WITHIN_NEXT_HOURS: {
      if (actualValue === null || actualValue === undefined) {
        passed = false;
      } else {
        const hoursRemaining = Number(actualValue);
        const threshold = Number(expectedValue);
        passed = hoursRemaining > 0 && hoursRemaining <= threshold;
      }
      break;
    }

    case CONDITION_OPERATOR.IS_EMPTY:
      passed = !actualValue || (Array.isArray(actualValue) && actualValue.length === 0) || String(actualValue).trim() === '';
      break;

    case CONDITION_OPERATOR.IS_NOT_EMPTY:
      passed = Boolean(actualValue && (!Array.isArray(actualValue) || actualValue.length > 0) && String(actualValue).trim() !== '');
      break;

    default:
      passed = false;
  }

  return {
    field,
    operator,
    expectedValue,
    actualValue,
    passed
  };
};

/**
 * Evaluates an array of conditions against a task.
 * Default logical operator is AND (all must pass).
 */
const evaluateAllConditions = (conditions = [], task) => {
  if (!conditions || conditions.length === 0) {
    return {
      allPassed: true,
      results: []
    };
  }

  const results = conditions.map(cond => evaluateSingleCondition(cond, task));
  
  // Evaluate based on individual logical operators or default AND
  const allPassed = results.every(res => res.passed);

  return {
    allPassed,
    results
  };
};

module.exports = {
  extractTaskFieldValue,
  evaluateSingleCondition,
  evaluateAllConditions
};
