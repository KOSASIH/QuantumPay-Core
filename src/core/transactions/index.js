// src/core/transactions/index.js

const Transaction = require('./transaction');
const TransactionPool = require('./transactionPool');
const TransactionManager = require('./transactionManager');

/**
 * Transaction Module for QuantumPay Network
 * 
 * This module handles the creation, validation, and management of transactions
 * within the QuantumPay blockchain ecosystem.
 * 
 * Exports:
 * - Transaction: Class representing a single transaction.
 * - TransactionPool: Class managing a pool of transactions.
 * - TransactionManager: Class handling transaction processing logic.
 */

/**
 * Create a new transaction
 * @param {string} sender - The sender's public key.
 * @param {string} recipient - The recipient's public key.
 * @param {number} amount - The amount to be transferred.
 * @param {object} signingKey - The sender's signing key.
 * @returns {Transaction} - The created transaction.
 */
const createTransaction = (sender, recipient, amount, signingKey) => {
    const transactionManager = new TransactionManager();
    return transactionManager.createTransaction(sender, recipient, amount, signingKey);
};

/**
 * Get all transactions from the pool
 * @returns {Array<Transaction>} - Array of transactions in the pool.
 */
const getAllTransactions = () => {
    const transactionManager = new TransactionManager();
    return transactionManager.getAllTransactions();
};

/**
 * Clear the transaction pool
 */
const clearTransactionPool = () => {
    const transactionManager = new TransactionManager();
    transactionManager.clearTransactionPool();
};

/**
 * Process a batch of transactions
 * @param {Array<Object>} transactions - Array of transaction objects.
 * @returns {Array<Transaction>} - Array of processed transactions.
 */
const processBatchTransactions = (transactions) => {
    const transactionManager = new TransactionManager();
    return transactionManager.processBatchTransactions(transactions);
};

/**
 * Finalize transactions for inclusion in a block
 * @returns {Array<Transaction>} - Array of valid transactions ready for mining.
 */
const finalizeTransactions = () => {
    const transactionManager = new TransactionManager();
    return transactionManager.finalizeTransactions();
};

// Exporting the transaction module functionalities
module.exports = {
    Transaction,
    TransactionPool,
    TransactionManager,
    createTransaction,
    getAllTransactions,
    clearTransactionPool,
    processBatchTransactions,
    finalizeTransactions,
};
