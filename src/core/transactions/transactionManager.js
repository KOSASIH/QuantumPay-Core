// src/core/transactions/transactionManager.js

const Transaction = require('./transaction');
const TransactionPool = require('./transactionPool');

class TransactionManager {
    constructor() {
        this.transactionPool = new TransactionPool();
    }

    // Create a new transaction
    createTransaction(sender, recipient, amount, signingKey) {
        const transaction = new Transaction(sender, recipient, amount);
        transaction.signTransaction(signingKey);

        try {
            this.transactionPool.addTransaction(transaction);
            console.log(`Transaction created: ${transaction.calculateHash()}`);
            return transaction;
        } catch (error) {
            console.error(`Error adding transaction: ${error.message}`);
            throw error; // Rethrow the error for further handling
        }
    }

    // Get all transactions from the pool
    getAllTransactions() {
        return this.transactionPool.getTransactions();
    }

    // Clear the transaction pool
    clearTransactionPool() {
        this.transactionPool.clear();
    }

    // Process a batch of transactions
    processBatchTransactions(transactions) {
        const processedTransactions = [];
        for (const tx of transactions) {
            try {
                const transaction = this.createTransaction(tx.sender, tx.recipient, tx.amount, tx.signingKey);
                processedTransactions.push(transaction);
            } catch (error) {
                console.error(`Failed to process transaction: ${error.message}`);
            }
        }
        return processedTransactions;
    }

    // Validate and finalize transactions for inclusion in a block
    finalizeTransactions() {
        const validTransactions = this.getAllTransactions();
        const finalizedTransactions = [];

        for (const transaction of validTransactions) {
            try {
                if (transaction.isValid()) {
                    finalizedTransactions.push(transaction);
                }
            } catch (error) {
                console.error(`Invalid transaction: ${error.message}`);
            }
        }

        this.clearTransactionPool(); // Clear the pool after finalizing
        return finalizedTransactions; // Return the list of valid transactions
    }
}

module.exports = TransactionManager;
