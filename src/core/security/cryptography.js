// src/core/security/cryptography.js

const crypto = require('crypto');

class Cryptography {
    /**
     * Create a SHA-256 hash of the input data.
     * @param {string} data - The input data to hash.
     * @returns {string} - The resulting hash in hexadecimal format.
     */
    static createHash(data) {
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    /**
     * Create a hash using the specified algorithm.
     * @param {string} data - The input data to hash.
     * @param {string} algorithm - The hashing algorithm (e.g., 'sha256', 'sha512').
     * @returns {string} - The resulting hash in hexadecimal format.
     */
    static createHashWithAlgorithm(data, algorithm) {
        return crypto.createHash(algorithm).update(data).digest('hex');
    }

    /**
     * Sign data using a private key.
     * @param {string} data - The data to sign.
     * @param {string} privateKey - The private key in PEM format.
     * @returns {string} - The signature in hexadecimal format.
     */
    static signData(data, privateKey) {
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();
        return sign.sign(privateKey, 'hex');
    }

    /**
     * Verify a signature using a public key.
     * @param {string} data - The original data.
     * @param {string} signature - The signature to verify.
     * @param {string} publicKey - The public key in PEM format.
     * @returns {boolean} - True if the signature is valid, false otherwise.
     */
    static verifySignature(data, signature, publicKey) {
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }

    /**
     * Create an HMAC for the given data using a secret key.
     * @param {string} data - The input data to hash.
     * @param {string} secret - The secret key used for HMAC.
     * @param {string} algorithm - The hashing algorithm (e.g., 'sha256', 'sha512').
     * @returns {string} - The resulting HMAC in hexadecimal format.
     */
    static createHMAC(data, secret, algorithm = 'sha256') {
        return crypto.createHmac(algorithm, secret).update(data).digest('hex');
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

module.exports = Cryptography;
