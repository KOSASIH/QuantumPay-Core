// src/core/transactions/transactionPool.js

const Transaction = require('./transaction');

class TransactionPool {
    constructor(expirationTime = 300000) { // Default expiration time set to 5 minutes
        this.transactions = []; // Array to hold the current transactions
        this.expirationTime = expirationTime; // Time in milliseconds for transaction expiration
    }

    // Add a transaction to the pool
    addTransaction(transaction) {
        if (!(transaction instanceof Transaction)) {
            throw new Error('Invalid transaction');
        }
        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to the pool');
        }

        // Check for duplicate transactions
        const existingTransaction = this.transactions.find(tx => tx.calculateHash() === transaction.calculateHash());
        if (existingTransaction) {
            throw new Error('Duplicate transaction detected');
        }

        // Add the transaction with a timestamp
        this.transactions.push({
            transaction,
            timestamp: Date.now()
        });
    }

    // Get all valid transactions in the pool
    getTransactions() {
        this.removeExpiredTransactions(); // Clean up expired transactions
        return this.transactions.map(tx => tx.transaction); // Return only the transaction objects
    }

    // Clear the pool after transactions are added to a block
    clear() {
        this.transactions = [];
    }

    // Remove expired transactions from the pool
    removeExpiredTransactions() {
        const currentTime = Date.now();
        this.transactions = this.transactions.filter(tx => (currentTime - tx.timestamp) < this.expirationTime);
    }
}

module.exports = TransactionPool;
