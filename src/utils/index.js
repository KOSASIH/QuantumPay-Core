// src/utils/index.js

const Logger = require('./logger');
const Validator = require('./validator');
const Formatter = require('./formatter');

/**
 * Utilities Module for QuantumPay Network
 * 
 * This module provides utility functions and helpers for various purposes, including:
 * - Logging
 * - Data Validation
 * - Data Formatting
 */

/**
 * Create a new logger instance.
 * @returns {Logger} - An instance of the Logger class.
 */
const createLogger = () => {
    return new Logger();
};

/**
 * Validate a transaction ID.
 * @param {string} transactionId - The transaction ID to validate.
 * @returns {Object} - An object containing isValid and error message if invalid.
 */
const validateTransactionId = (transactionId) => {
    return Validator.isValidTransactionId(transactionId);
};

/**
 * Validate an Ethereum address.
 * @param {string} address - The address to validate.
 * @returns {Object} - An object containing isValid and error message if invalid.
 */
const validateAddress = (address) => {
    return Validator.isValidAddress(address);
};

/**
 * Validate a positive number.
 * @param {number} value - The value to validate.
 * @returns {Object} - An object containing isValid and error message if invalid.
 */
const validatePositiveNumber = (value) => {
    return Validator.isPositiveNumber(value);
};

/**
 * Format a transaction object for display or logging.
 * @param {Object} transaction - The transaction object to format.
 * @returns {Object} - The formatted transaction object.
 */
const formatTransaction = (transaction) => {
    return Formatter.formatTransaction(transaction);
};

/**
 * Format an amount to a fixed decimal point.
 * @param {number} amount - The amount to format.
 * @param {number} [decimals=2] - The number of decimal places.
 * @returns {string} - The formatted amount as a string.
 */
const formatAmount = (amount, decimals = 2) => {
    return Formatter.formatAmount(amount, decimals);
};

/**
 * Format an Ethereum address to a standard format (lowercase).
 * @param {string} address - The address to format.
 * @returns {string} - The formatted address.
 */
const formatAddress = (address) => {
    return Formatter.formatAddress(address);
};

/**
 * Format a date to a human-readable string.
 * @param {Date|string|number} date - The date to format.
 * @returns {string} - The formatted date string.
 */
const formatDate = (date) => {
    return Formatter.formatDate(date);
};

/**
 * Format a generic object to a JSON string with indentation.
 * @param {Object} obj - The object to format.
 * @returns {string} - The formatted JSON string.
 */
const formatJson = (obj) => {
    return Formatter.formatJson(obj);
};

// Exporting the utilities module functionalities
module.exports = {
    Logger: createLogger(),
    validateTransactionId,
    validateAddress,
    validatePositiveNumber,
    formatTransaction,
    formatAmount,
    formatAddress,
    formatDate,
    formatJson,
};
