// src/core/consensus/proofOfWork.js

const crypto = require('crypto');

class ProofOfWork {
    constructor(initialDifficulty = 4) {
        this.difficulty = initialDifficulty; // Initial difficulty level for mining
        this.adjustmentInterval = 10; // Number of blocks after which to adjust difficulty
        this.targetTime = 60000; // Target time to mine a block in milliseconds (1 minute)
        this.blockTimestamps = []; // Array to store timestamps of mined blocks
    }

    // Method to mine a block
    mineBlock(block) {
        let nonce = 0;
        let hash;
        const startTime = Date.now();

        do {
            nonce++;
            hash = this.calculateHash(block.index, block.previousHash, block.timestamp, block.transactions, nonce);
        } while (hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0"));

        const miningTime = Date.now() - startTime;
        this.blockTimestamps.push(miningTime);
        console.log(`Block mined: ${hash} with nonce: ${nonce} in ${miningTime}ms`);

        // Adjust difficulty after every adjustmentInterval blocks
        if (this.blockTimestamps.length >= this.adjustmentInterval) {
            this.adjustDifficulty();
        }

        return { hash, nonce };
    }

    // Method to calculate the hash
    calculateHash(index, previousHash, timestamp, transactions, nonce) {
        return crypto.createHash('sha256')
            .update(index + previousHash + timestamp + JSON.stringify(transactions) + nonce)
            .digest('hex');
    }

    // Method to adjust the difficulty based on the average mining time
    adjustDifficulty() {
        const totalMiningTime = this.blockTimestamps.reduce((acc, time) => acc + time, 0);
        const averageMiningTime = totalMiningTime / this.blockTimestamps.length;

        if (averageMiningTime < this.targetTime) {
            this.difficulty++; // Increase difficulty
            console.log(`Increasing difficulty to ${this.difficulty}`);
        } else if (averageMiningTime > this.targetTime) {
            this.difficulty = Math.max(1, this.difficulty - 1); // Decrease difficulty, but not below 1
            console.log(`Decreasing difficulty to ${this.difficulty}`);
        }

        // Reset timestamps for the next adjustment period
        this.blockTimestamps = [];
    }
}

module.exports = ProofOfWork;
