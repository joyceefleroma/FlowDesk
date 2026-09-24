const EventEmitter = require('events');

class FlowDeskEventBus extends EventEmitter {
  constructor() {
    super();
    // Max listeners set high for concurrent task event subscriptions
    this.setMaxListeners(50);
  }

  emitAsync(eventName, payload) {
    // Dispatch in next tick to not block the caller HTTP lifecycle
    setImmediate(() => {
      this.emit(eventName, payload);
    });
  }
}

const eventBus = new FlowDeskEventBus();
module.exports = eventBus;
