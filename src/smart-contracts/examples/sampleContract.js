// src/smart-contracts/examples/sampleContract.js

const { ContractManager, SmartContract } = require('../index');

// Create a new instance of the ContractManager
const contractManager = new ContractManager();

// Deploy a new contract
const myContract = contractManager.deployContract('MyContract', '0x1234567890abcdef');

// Grant access to another user
myContract.grantAccess('0xabcdef1234567890');

// Set a state variable
try {
    myContract.setState('greeting', 'Hello, QuantumPay!', '0x1234567890abcdef'); // Owner can set state
    console.log('State set successfully.');
} catch (error) {
    console.error(`Error setting state: ${error.message}`);
}

// Attempt to set a state variable by a non-owner
try {
    myContract.setState('farewell', 'Goodbye, QuantumPay!', '0xabcdef1234567890'); // Non-owner trying to set state
} catch (error) {
    console.error(`Error setting state: ${error.message}`); // Should throw an error
}

// Get the state variable
const greeting = contractManager.getContractState('MyContract', 'greeting');
console.log(`Greeting: ${greeting}`); // Output: Greeting: Hello, QuantumPay!

// Get emitted events
const events = contractManager.getContractEvents('MyContract');
console.log('Emitted Events:', events);

// Reset the state of the contract
try {
    myContract.resetState('0x1234567890abcdef'); // Owner can reset state
    console.log('State reset successfully.');
} catch (error) {
    console.error(`Error resetting state: ${error.message}`);
}

// Attempt to reset the state by a non-owner
try {
    myContract.resetState('0xabcdef1234567890'); // Non-owner trying to reset state
} catch (error) {
    console.error(`Error resetting state: ${error.message}`); // Should throw an error
}

// Final state and events
console.log('Final State:', myContract.state);
console.log('Final Events:', myContract.getEvents());
