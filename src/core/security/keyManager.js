// src/core/security/keyManager.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class KeyManager {
    /**
     * Generate a new RSA key pair.
     * @returns {Object} - An object containing the public and private keys in PEM format.
     */
    static generateKeyPair() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        return { publicKey, privateKey };
    }

    /**
     * Save a key to a file.
     * @param {string} key - The key to save (public or private).
     * @param {string} filename - The filename to save the key to.
     */
    static saveKeyToFile(key, filename) {
        fs.writeFileSync(path.resolve(__dirname, filename), key);
        console.log(`Key saved to ${filename}`);
    }

    /**
     * Load a key from a file.
     * @param {string} filename - The filename to load the key from.
     * @returns {string} - The loaded key.
     */
    static loadKeyFromFile(filename) {
        const key = fs.readFileSync(path.resolve(__dirname, filename), 'utf8');
        console.log(`Key loaded from ${filename}`);
        return key;
    }

    /**
     * Encrypt data using a public key.
     * @param {string} data - The data to encrypt.
     * @param {string} publicKey - The public key in PEM format.
     * @returns {string} - The encrypted data in base64 format.
     */
    static encryptData(data, publicKey) {
        const buffer = Buffer.from(data, 'utf-8');
        return crypto.publicEncrypt(publicKey, buffer).toString('base64');
    }

    /**
     * Decrypt data using a private key.
     * @param {string} encryptedData - The encrypted data in base64 format.
     * @param {string} privateKey - The private key in PEM format.
     * @returns {string} - The decrypted data.
     */
    static decryptData(encryptedData, privateKey) {
        const buffer = Buffer.from(encryptedData, 'base64');
        return crypto.privateDecrypt(privateKey, buffer).toString('utf-8');
    }

    /**
     * Generate a random cryptographic key.
     * @param {number} length - The length of the key in bytes.
     * @returns {string} - The generated key in hexadecimal format.
     */
    static generateRandomKey(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }
}

module.exports = KeyManager;
