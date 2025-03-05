// src/core/consensus/consensusManager.js

const ProofOfWork = require('./proofOfWork');

class ConsensusManager {
    constructor(difficulty) {
        this.proofOfWork = new ProofOfWork(difficulty);
    }

    // Method to validate a block
    validateBlock(block, previousBlock) {
        // Check if the previous block's hash matches
        if (block.previousHash !== previousBlock.hash) {
            console.error('Invalid block: Previous hash does not match.');
            return false;
        }

        // Check if the block's hash is valid
        const calculatedHash = this.proofOfWork.calculateHash(
            block.index,
            block.previousHash,
            block.timestamp,
            block.transactions,
            block.nonce
        );

        if (block.hash !== calculatedHash) {
            console.error('Invalid block: Hash does not match.');
            return false;
        }

        // Additional validation checks can be added here (e.g., transaction validity)
        return true;
    }

    // Method to mine a new block
    mineNewBlock(block) {
        const { hash, nonce } = this.proofOfWork.mineBlock(block);
        block.hash = hash;
        block.nonce = nonce;
        return block;
    }

    // Method to handle incoming blocks
    handleIncomingBlock(newBlock, blockchain) {
        const previousBlock = blockchain.getLastBlock();

        // Validate the new block
        if (this.validateBlock(newBlock, previousBlock)) {
            // If valid, add the block to the blockchain
            blockchain.chain.push(newBlock);
            console.log(`Block added to the blockchain: ${newBlock.hash}`);
        } else {
            console.warn(`Block rejected: ${newBlock.hash}`);
            // Handle orphaned block logic if necessary
        }
    }

    // Method to resolve conflicts in the blockchain
    resolveConflicts(newChain, blockchain) {
        if (newChain.length > blockchain.chain.length) {
            console.log('New chain is longer. Replacing the current chain.');
            blockchain.chain = newChain; // Replace the current chain with the new one
            return true;
        }
        return false;
    }
}

module.exports = ConsensusManager;
