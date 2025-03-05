// src/interoperability/eventHandler.js

class EventHandler {
    constructor() {
        this.events = []; // Store emitted events
        this.listeners = {}; // Store event listeners
    }

    /**
     * Emit an event.
     * @param {string} eventName - The name of the event.
     * @param {Object} data - The data associated with the event.
     */
    emitEvent(eventName, data) {
        const event = { eventName, data, timestamp: Date.now() };
        this.events.push(event);
        console.log(`Event emitted: ${eventName}`, data);
        this.notifyListeners(eventName, event);
    }

    /**
     * Register an event listener for a specific event.
     * @param {string} eventName - The name of the event to listen for.
     * @param {Function} callback - The callback function to execute when the event is emitted.
     */
    on(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
        console.log(`Listener registered for event: ${eventName}`);
    }

    /**
     * Notify all listeners of a specific event.
     * @param {string} eventName - The name of the event.
     * @param {Object} event - The event object to pass to the listeners.
     */
    notifyListeners(eventName, event) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(`Error executing listener for event ${eventName}:`, error);
                }
            });
        }
    }

    /**
     * Get all emitted events.
     * @returns {Array} - Array of emitted events.
     */
    getEvents() {
        return this.events;
    }

    /**
     * Get events by name.
     * @param {string} eventName - The name of the event to filter by.
     * @returns {Array} - Array of events matching the specified name.
     */
    getEventsByName(eventName) {
        return this.events.filter(event => event.eventName === eventName);
    }

    /**
     * Clear all emitted events.
     */
    clearEvents() {
        this.events = [];
        console.log('All events cleared.');
    }
}

module.exports = EventHandler;
