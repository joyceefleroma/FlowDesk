const MAX_RECURSION_DEPTH = 3;

/**
 * Checks if the current execution has exceeded maximum safe recursion depth.
 * @param {Object} context - Execution context containing depth and correlationId
 * @returns {boolean} - true if safe to proceed, false if recursion limit exceeded
 */
const checkRecursionLimit = (context = {}) => {
  const depth = context.depth || 0;
  return depth < MAX_RECURSION_DEPTH;
};

/**
 * Increments depth for cascaded actions triggered by workflow executions.
 * @param {Object} context 
 * @returns {Object} new context
 */
const nextDepthContext = (context = {}) => {
  return {
    correlationId: context.correlationId || require('uuid').v4(),
    depth: (context.depth || 0) + 1,
    originTrigger: context.originTrigger || 'MANUAL'
  };
};

module.exports = {
  MAX_RECURSION_DEPTH,
  checkRecursionLimit,
  nextDepthContext
};
