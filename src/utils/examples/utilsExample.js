// src/utils/examples/utilsExample.js

const {
    Logger,
    validateTransactionId,
    validateAddress,
    validatePositiveNumber,
    formatTransaction,
    formatAmount,
    formatAddress,
    formatDate,
    formatJson
} = require('../index');

// Create a logger instance
const logger = new Logger();

// Example usage of Logger
logger.info('Starting utility functions demonstration.');
logger.warn('This is a warning message for demonstration purposes.');
logger.error('This is an error message for demonstration purposes.');

// Sample data for validation and formatting
const transactionId = 'tx1234567890abcdef';
const address = '0x1234567890abcdef1234567890abcdef12345678';
const amount = 1234.56789;
const transaction = {
    id: transactionId,
    status: 'confirmed',
    amount: amount,
    timestamp: Date.now(),
    from: address,
    to: address,
};

// Validate transaction ID
const transactionIdValidation = validateTransactionId(transactionId);
if (!transactionIdValidation.isValid) {
    logger.error(transactionIdValidation.error);
} else {
    logger.info('Transaction ID is valid.');
}

// Validate Ethereum address
const addressValidation = validateAddress(address);
if (!addressValidation.isValid) {
    logger.error(addressValidation.error);
} else {
    logger.info('Ethereum address is valid.');
}

// Validate positive number
const positiveNumberValidation = validatePositiveNumber(amount);
if (!positiveNumberValidation.isValid) {
    logger.error(positiveNumberValidation.error);
} else {
    logger.info('Amount is a positive number.');
}

// Format transaction
try {
    const formattedTransaction = formatTransaction(transaction);
    logger.info('Formatted Transaction: ' + formatJson(formattedTransaction));
} catch (error) {
    logger.error('Error formatting transaction: ' + error.message);
}

// Format amount
try {
    const formattedAmount = formatAmount(amount, 2);
    logger.info('Formatted Amount: ' + formattedAmount);
} catch (error) {
    logger.error('Error formatting amount: ' + error.message);
}

// Format address
try {
    const formattedAddress = formatAddress(address);
    logger.info('Formatted Address: ' + formattedAddress);
} catch (error) {
    logger.error('Error formatting address: ' + error.message);
}

// Format date
try {
    const formattedDate = formatDate(transaction.timestamp);
    logger.info('Formatted Date: ' + formattedDate);
} catch (error) {
    logger.error('Error formatting date: ' + error.message);
}

// Display all emitted logs
console.log('All logs have been recorded. Check the log file for details.');
