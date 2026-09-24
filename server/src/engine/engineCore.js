const eventBus = require('./eventBus');
const { processTriggerEvent } = require('./triggerMatcher');
const { TRIGGER_TYPE } = require('../config/constants');

/**
 * Initializes the Automation Engine by registering event listeners on the EventBus.
 */
const initAutomationEngine = () => {
  console.log('[Automation Engine] Initializing FlowDesk Workflow Orchestration Engine...');

  // Register listeners for all trigger events
  Object.values(TRIGGER_TYPE).forEach(triggerType => {
    eventBus.on(triggerType, async (payload) => {
      try {
        await processTriggerEvent(triggerType, payload);
      } catch (err) {
        console.error(`[Automation Engine] Error executing listener for ${triggerType}:`, err.message);
      }
    });
  });

  console.log(`[Automation Engine] Subscribed to ${Object.keys(TRIGGER_TYPE).length} trigger event channels.`);
};

module.exports = { initAutomationEngine };
