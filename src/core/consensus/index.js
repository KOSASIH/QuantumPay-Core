// src/core/consensus/index.js

const ProofOfWork = require('./proofOfWork');
const ConsensusManager = require('./consensusManager');

/**
 * Consensus Module for QuantumPay Network
 * 
 * This module handles the consensus algorithms used in the QuantumPay blockchain.
 * 
 * Exports:
 * - ProofOfWork: Class implementing the Proof of Work consensus algorithm.
 * - ConsensusManager: Class managing the consensus process.
 */

/**
 * Create a new Proof of Work instance
 * @param {number} difficulty - The initial difficulty level for mining.
 * @returns {ProofOfWork} - An instance of the ProofOfWork class.
 */
const createProofOfWork = (difficulty) => {
    return new ProofOfWork(difficulty);
};

/**
 * Create a new Consensus Manager instance
 * @param {number} difficulty - The initial difficulty level for mining.
 * @returns {ConsensusManager} - An instance of the ConsensusManager class.
 */
const createConsensusManager = (difficulty) => {
    return new ConsensusManager(difficulty);
};

/**
 * Validate a block against the previous block
 * @param {Object} block - The block to validate.
 * @param {Object} previousBlock - The previous block in the blockchain.
 * @param {ConsensusManager} consensusManager - The consensus manager instance.
 * @returns {boolean} - True if the block is valid, false otherwise.
 */
const validateBlock = (block, previousBlock, consensusManager) => {
    return consensusManager.validateBlock(block, previousBlock);
};

/**
 * Mine a new block using the Proof of Work algorithm
 * @param {Object} block - The block to mine.
 * @param {ConsensusManager} consensusManager - The consensus manager instance.
 * @returns {Object} - The mined block with updated hash and nonce.
 */
const mineNewBlock = (block, consensusManager) => {
    return consensusManager.mineNewBlock(block);
};

/**
 * Handle an incoming block and add it to the blockchain
 * @param {Object} newBlock - The new block to handle.
 * @param {Object} blockchain - The current blockchain instance.
 * @param {ConsensusManager} consensusManager - The consensus manager instance.
 */
const handleIncomingBlock = (newBlock, blockchain, consensusManager) => {
    consensusManager.handleIncomingBlock(newBlock, blockchain);
};

/**
 * Resolve conflicts with a new chain
 * @param {Array} newChain - The new chain to compare against the current chain.
 * @param {Object} blockchain - The current blockchain instance.
 * @param {ConsensusManager} consensusManager - The consensus manager instance.
 * @returns {boolean} - True if the chain was replaced, false otherwise.
 */
const resolveConflicts = (newChain, blockchain, consensusManager) => {
    return consensusManager.resolveConflicts(newChain, blockchain);
};

// Exporting the consensus module functionalities
module.exports = {
    ProofOfWork,
    ConsensusManager,
    createProofOfWork,
    createConsensusManager,
    validateBlock,
    mineNewBlock,
    handleIncomingBlock,
    resolveConflicts,
};
