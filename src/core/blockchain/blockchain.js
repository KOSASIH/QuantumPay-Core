// src/core/blockchain/blockchain.js

const Block = require('./block');
const Transaction = require('./transaction');
const crypto = require('crypto');

class Blockchain {
    constructor(difficulty = 4) {
        this.chain = []; // Array to hold the blockchain
        this.currentTransactions = []; // Array to hold current transactions
        this.difficulty = difficulty; // Difficulty level for mining
        this.createGenesisBlock(); // Create the first block
    }

    createGenesisBlock() {
        const genesisBlock = new Block(0, "0", Date.now(), [], this.calculateHash(0, "0", Date.now(), []));
        this.chain.push(genesisBlock);
    }

    addTransaction(sender, recipient, amount) {
        const transaction = new Transaction(sender, recipient, amount);
        if (!transaction.isValid()) {
            throw new Error('Invalid transaction');
        }
        this.currentTransactions.push(transaction);
        return this.getLastBlock().index + 1; // Return the index of the block that will hold this transaction
    }

    createBlock() {
        const previousBlock = this.getLastBlock();
        const block = new Block(
            previousBlock.index + 1,
            previousBlock.hash,
            Date.now(),
            this.currentTransactions,
            ''
        );

        // Mine the block
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.currentTransactions = []; // Reset the current transactions
        return block;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    calculateHash(index, previousHash, timestamp, transactions, nonce) {
        return crypto.createHash('sha256')
            .update(index + previousHash + timestamp + JSON.stringify(transactions) + nonce)
            .digest('hex');
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the current block's hash is valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if the previous block's hash is correct
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            // Validate each transaction in the block
            for (const tx of currentBlock.transactions) {
                if (!tx.isValid()) {
                    return false;
                }
            }
        }
        return true; // The chain is valid
    }
}

module.exports = Blockchain;
