// src/ai-optimization/index.js

const TransactionOptimizer = require('./transactionOptimizer');
const ResourceAllocator = require('./resourceAllocator');

/**
 * AI Optimization Module for QuantumPay Network
 * 
 * This module handles AI algorithms for optimizing transactions and resource allocation.
 * 
 * Exports:
 * - TransactionOptimizer: Class for optimizing transactions based on various criteria.
 * - ResourceAllocator: Class for allocating resources to transactions based on priority and requirements.
 */

/**
 * Create a new instance of the TransactionOptimizer.
 * @param {Array} transactions - Array of transactions to optimize.
 * @returns {TransactionOptimizer} - An instance of the TransactionOptimizer class.
 */
const createTransactionOptimizer = (transactions) => {
    return new TransactionOptimizer(transactions);
};

/**
 * Create a new instance of the ResourceAllocator.
 * @param {number} totalResources - Total available resources for allocation.
 * @returns {ResourceAllocator} - An instance of the ResourceAllocator class.
 */
const createResourceAllocator = (totalResources) => {
    return new ResourceAllocator(totalResources);
};

/**
 * Optimize transactions based on multiple criteria: fee, urgency, and success rate.
 * @param {Array} transactions - Array of transactions to optimize.
 * @returns {Array} - Sorted array of optimized transactions.
 */
const optimizeTransactions = (transactions) => {
    const optimizer = createTransactionOptimizer(transactions);
    return optimizer.optimizeByMultipleCriteria();
};

/**
 * Allocate resources to transactions based on their requirements.
 * @param {Array} transactions - Array of transactions to allocate resources to.
 * @param {number} totalResources - Total available resources for allocation.
 * @returns {Array} - Array of transactions with allocated resources.
 */
const allocateResources = (transactions, totalResources) => {
    const allocator = createResourceAllocator(totalResources);
    return allocator.allocateResources(transactions);
};

// Exporting the AI optimization module functionalities
module.exports = {
    TransactionOptimizer,
    ResourceAllocator,
    createTransactionOptimizer,
    createResourceAllocator,
    optimizeTransactions,
    allocateResources,
};
