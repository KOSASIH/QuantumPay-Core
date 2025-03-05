// src/interoperability/index.js

const CrossChainCommunicator = require('./crossChainCommunicator');
const TransactionVerifier = require('./transactionVerifier');
const EventHandler = require('./eventHandler');

/**
 * Interoperability Module for QuantumPay Network
 * 
 * This module handles cross-chain communication, transaction verification, and event handling.
 * 
 * Exports:
 * - CrossChainCommunicator: Class for sending and receiving messages between blockchains.
 * - TransactionVerifier: Class for verifying transactions across different blockchains.
 * - EventHandler: Class for managing events related to cross-chain communication.
 */

/**
 * Create a new instance of the CrossChainCommunicator.
 * @returns {CrossChainCommunicator} - An instance of the CrossChainCommunicator class.
 */
const createCrossChainCommunicator = () => {
    return new CrossChainCommunicator();
};

/**
 * Create a new instance of the TransactionVerifier.
 * @returns {TransactionVerifier} - An instance of the TransactionVerifier class.
 */
const createTransactionVerifier = () => {
    return new TransactionVerifier();
};

/**
 * Create a new instance of the EventHandler.
 * @returns {EventHandler} - An instance of the EventHandler class.
 */
const createEventHandler = () => {
    return new EventHandler();
};

/**
 * Register blockchain data for verification.
 * @param {TransactionVerifier} verifier - The TransactionVerifier instance.
 * @param {string} chainName - The name of the blockchain.
 * @param {Array} transactions - Array of transactions to register.
 */
const registerBlockchainData = (verifier, chainName, transactions) => {
    verifier.registerBlockchainData(chainName, transactions);
};

/**
 * Emit an event using the EventHandler.
 * @param {EventHandler} eventHandler - The EventHandler instance.
 * @param {string} eventName - The name of the event.
 * @param {Object} data - The data associated with the event.
 */
const emitEvent = (eventHandler, eventName, data) => {
    eventHandler.emitEvent(eventName, data);
};

// Exporting the interoperability module functionalities
module.exports = {
    CrossChainCommunicator,
    TransactionVerifier,
    EventHandler,
    createCrossChainCommunicator,
    createTransactionVerifier,
    createEventHandler,
    registerBlockchainData,
    emitEvent,
};
