// src/smart-contracts/index.js

const SmartContract = require('./smartContract');
const ContractManager = require('./contractManager');

/**
 * Smart Contracts Module for QuantumPay Network
 * 
 * This module handles the creation, execution, and management of smart contracts.
 * 
 * Exports:
 * - SmartContract: Class representing a smart contract.
 * - ContractManager: Class managing the deployment and execution of contracts.
 */

/**
 * Create a new instance of the ContractManager.
 * @returns {ContractManager} - An instance of the ContractManager class.
 */
const createContractManager = () => {
    return new ContractManager();
};

/**
 * Deploy a new smart contract.
 * @param {string} name - The name of the contract.
 * @param {string} owner - The owner's address.
 * @returns {SmartContract} - The deployed smart contract instance.
 */
const deployContract = (name, owner) => {
    const contractManager = createContractManager();
    return contractManager.deployContract(name, owner);
};

/**
 * Execute a function on a deployed contract.
 * @param {string} name - The name of the contract.
 * @param {string} functionName - The function to execute.
 * @param {string} caller - The address of the caller.
 * @param {...*} args - The arguments to pass to the function.
 * @returns {*} - The result of the executed function.
 */
const executeContract = (name, functionName, caller, ...args) => {
    const contractManager = createContractManager();
    return contractManager.executeContract(name, functionName, caller, ...args);
};

/**
 * Get the state of a deployed contract.
 * @param {string} name - The name of the contract.
 * @param {string} key - The key of the state variable.
 * @returns {*} - The value of the state variable.
 */
const getContractState = (name, key) => {
    const contractManager = createContractManager();
    return contractManager.getContractState(name, key);
};

/**
 * Get all events emitted by a deployed contract.
 * @param {string} name - The name of the contract.
 * @returns {Array} - An array of events emitted by the contract.
 */
const getContractEvents = (name) => {
    const contractManager = createContractManager();
    return contractManager.getContractEvents(name);
};

/**
 * Reset the state of a deployed contract.
 * @param {string} name - The name of the contract.
 * @param {string} caller - The address of the caller.
 * @returns {void}
 */
const resetContractState = (name, caller) => {
    const contractManager = createContractManager();
    return contractManager.resetContractState(name, caller);
};

// Exporting the smart contracts module functionalities
module.exports = {
    SmartContract,
    ContractManager,
    createContractManager,
    deployContract,
    executeContract,
    getContractState,
    getContractEvents,
    resetContractState,
};
