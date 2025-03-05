// src/core/security/index.js

const Cryptography = require('./cryptography');
const KeyManager = require('./keyManager');
const SecurityManager = require('./securityManager');

/**
 * Security Module for QuantumPay Network
 * 
 * This module handles security protocols and cryptographic functions used in the QuantumPay blockchain.
 * 
 * Exports:
 * - Cryptography: Class implementing cryptographic functions.
 * - KeyManager: Class managing key generation and encryption.
 * - SecurityManager: Class managing security protocols and key management.
 */

/**
 * Create a new instance of the SecurityManager.
 * @returns {SecurityManager} - An instance of the SecurityManager class.
 */
const createSecurityManager = () => {
    return new SecurityManager();
};

/**
 * Generate a new RSA key pair.
 * @returns {Object} - An object containing the public and private keys in PEM format.
 */
const generateKeyPair = () => {
    return KeyManager.generateKeyPair();
};

/**
 * Save a key to a file.
 * @param {string} key - The key to save (public or private).
 * @param {string} filename - The filename to save the key to.
 */
const saveKeyToFile = (key, filename) => {
    KeyManager.saveKeyToFile(key, filename);
};

/**
 * Load a key from a file.
 * @param {string} filename - The filename to load the key from.
 * @returns {string} - The loaded key.
 */
const loadKeyFromFile = (filename) => {
    return KeyManager.loadKeyFromFile(filename);
};

/**
 * Encrypt data using a public key.
 * @param {string} data - The data to encrypt.
 * @param {string} publicKey - The public key in PEM format.
 * @returns {string} - The encrypted data in base64 format.
 */
const encryptData = (data, publicKey) => {
    return KeyManager.encryptData(data, publicKey);
};

/**
 * Decrypt data using a private key.
 * @param {string} encryptedData - The encrypted data in base64 format.
 * @param {string} privateKey - The private key in PEM format.
 * @returns {string} - The decrypted data.
 */
const decryptData = (encryptedData, privateKey) => {
    return KeyManager.decryptData(encryptedData, privateKey);
};

/**
 * Sign data using a private key.
 * @param {string} data - The data to sign.
 * @param {string} privateKey - The private key in PEM format.
 * @returns {string} - The signature in hexadecimal format.
 */
const signData = (data, privateKey) => {
    return Cryptography.signData(data, privateKey);
};

/**
 * Verify a signature using a public key.
 * @param {string} data - The original data.
 * @param {string} signature - The signature to verify.
 * @param {string} publicKey - The public key in PEM format.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
const verifySignature = (data, signature, publicKey) => {
    return Cryptography.verifySignature(data, signature, publicKey);
};

/**
 * Generate a random cryptographic key.
 * @param {number} length - The length of the key in bytes.
 * @returns {string} - The generated key in hexadecimal format.
 */
const generateRandomKey = (length = 32) => {
    return KeyManager.generateRandomKey(length);
};

// Exporting the security module functionalities
module.exports = {
    Cryptography,
    KeyManager,
    SecurityManager,
    createSecurityManager,
    generateKeyPair,
    saveKeyToFile,
    loadKeyFromFile,
    encryptData,
    decryptData,
    signData,
    verifySignature,
    generateRandomKey,
};
