class SimpleEventManager {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(listener) {
    this.listeners.set(listener, listener);
  }

  removeEventListener(listener) {
    this.listeners.delete(listener);
  }

  fire(eventData) {
    this.listeners.forEach((listener) => {
      listener(eventData);
    });
  }

  removeAllEventListeners() {
    this.listeners.clear();
  }
}

export default SimpleEventManager;
