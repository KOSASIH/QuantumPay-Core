// src/core/blockchain/block.js

const crypto = require('crypto');

class Block {
    constructor(index, previousHash, timestamp, transactions, hash, nonce = 0) {
        this.index = index; // Block index
        this.previousHash = previousHash; // Hash of the previous block
        this.timestamp = timestamp; // Timestamp of block creation
        this.transactions = transactions; // Array of transactions
        this.hash = hash; // Hash of the current block
        this.nonce = nonce; // Nonce for proof of work
    }

    // Method to calculate the hash of the block
    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
            .digest('hex');
    }

    // Method to mine the block (proof of work)
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`);
    }

    // Method to validate the block's integrity
    isValid() {
        const calculatedHash = this.calculateHash();
        return this.hash === calculatedHash;
    }
}

module.exports = Block;
