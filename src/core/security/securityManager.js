// src/core/security/securityManager.js

const Cryptography = require('./cryptography');
const KeyManager = require('./keyManager');

class SecurityManager {
    constructor() {
        // Generate a new key pair for the instance
        this.keyPair = KeyManager.generateKeyPair();
    }

    /**
     * Sign data using the instance's private key.
     * @param {string} data - The data to sign.
     * @returns {string} - The signature in hexadecimal format.
     */
    signData(data) {
        return Cryptography.signData(data, this.keyPair.privateKey);
    }

    /**
     * Verify a signature using the instance's public key.
     * @param {string} data - The original data.
     * @param {string} signature - The signature to verify.
     * @returns {boolean} - True if the signature is valid, false otherwise.
     */
    verifyData(data, signature) {
        return Cryptography.verifySignature(data, signature, this.keyPair.publicKey);
    }

    /**
     * Encrypt data using the instance's public key.
     * @param {string} data - The data to encrypt.
     * @returns {string} - The encrypted data in base64 format.
     */
    encryptData(data) {
        return KeyManager.encryptData(data, this.keyPair.publicKey);
    }

    /**
     * Decrypt data using the instance's private key.
     * @param {string} encryptedData - The encrypted data in base64 format.
     * @returns {string} - The decrypted data.
     */
    decryptData(encryptedData) {
        return KeyManager.decryptData(encryptedData, this.keyPair.privateKey);
    }

    /**
     * Save the public and private keys to files.
     * @param {string} publicKeyFile - The filename to save the public key.
     * @param {string} privateKeyFile - The filename to save the private key.
     */
    saveKeysToFile(publicKeyFile, privateKeyFile) {
        KeyManager.saveKeyToFile(this.keyPair.publicKey, publicKeyFile);
        KeyManager.saveKeyToFile(this.keyPair.privateKey, privateKeyFile);
    }

    /**
     * Load keys from files and update the instance's key pair.
     * @param {string} publicKeyFile - The filename to load the public key from.
     * @param {string} privateKeyFile - The filename to load the private key from.
     */
    loadKeysFromFile(publicKeyFile, privateKeyFile) {
        this.keyPair.publicKey = KeyManager.loadKeyFromFile(publicKeyFile);
        this.keyPair.privateKey = KeyManager.loadKeyFromFile(privateKeyFile);
    }

    /**
     * Generate a random cryptographic key.
     * @param {number} length - The length of the key in bytes.
     * @returns {string} - The generated key in hexadecimal format.
     */
    generateRandomKey(length = 32) {
        return KeyManager.generateRandomKey(length);
    }
}

module.exports = SecurityManager;
