// src/smart-contracts/smartContract.js

class SmartContract {
    constructor(name, owner) {
        this.name = name; // Name of the contract
        this.owner = owner; // Owner's address
        this.state = {}; // State variables of the contract
        this.events = []; // Events emitted by the contract
        this.accessControl = { // Access control for functions
            [owner]: true // Owner has access to all functions
        };
    }

    // Method to execute a function in the contract
    execute(functionName, caller, ...args) {
        if (!this.hasAccess(caller)) {
            throw new Error(`Caller ${caller} does not have access to execute ${functionName}`);
        }
        if (typeof this[functionName] !== 'function') {
            throw new Error(`Function ${functionName} does not exist on contract ${this.name}`);
        }
        return this[functionName](...args);
    }

    // Method to check access control
    hasAccess(caller) {
        return this.accessControl[caller] === true;
    }

    // Method to grant access to a caller
    grantAccess(caller) {
        this.accessControl[caller] = true;
        this.emitEvent('AccessGranted', { caller });
    }

    // Method to revoke access from a caller
    revokeAccess(caller) {
        delete this.accessControl[caller];
        this.emitEvent('AccessRevoked', { caller });
    }

    // Method to emit an event
    emitEvent(eventName, data) {
        this.events.push({ eventName, data, timestamp: Date.now() });
    }

    // Example function to set a state variable
    setState(key, value, caller) {
        if (!this.hasAccess(caller)) {
            throw new Error(`Caller ${caller} does not have access to set state`);
        }
        this.state[key] = value;
        this.emitEvent('StateChanged', { key, value });
    }

    // Example function to get a state variable
    getState(key) {
        return this.state[key];
    }

    // Example function to get all events
    getEvents() {
        return this.events;
    }

    // Example function to reset the contract state
    resetState(caller) {
        if (!this.hasAccess(caller)) {
            throw new Error(`Caller ${caller} does not have access to reset state`);
        }
        this.state = {};
        this.emitEvent('StateReset', {});
    }
}

module.exports = SmartContract;
