// src/utils/validator.js

class Validator {
    /**
     * Validate a transaction ID.
     * @param {string} transactionId - The transaction ID to validate.
     * @returns {Object} - An object containing isValid and error message if invalid.
     */
    static isValidTransactionId(transactionId) {
        const regex = /^[a-zA-Z0-9]{1,64}$/; // Example regex for transaction ID
        if (regex.test(transactionId)) {
            return { isValid: true };
        }
        return { isValid: false, error: 'Invalid transaction ID. Must be alphanumeric and 1-64 characters long.' };
    }

    /**
     * Validate an Ethereum address.
     * @param {string} address - The address to validate.
     * @returns {Object} - An object containing isValid and error message if invalid.
     */
    static isValidAddress(address) {
        const regex = /^0x[a-fA-F0-9]{40}$/; // Example regex for Ethereum address
        if (regex.test(address)) {
            return { isValid: true };
        }
        return { isValid: false, error: 'Invalid address. Must be a valid Ethereum address (0x followed by 40 hex characters).' };
    }

    /**
     * Validate a positive number.
     * @param {number} value - The value to validate.
     * @returns {Object} - An object containing isValid and error message if invalid.
     */
    static isPositiveNumber(value) {
        if (typeof value === 'number' && value > 0) {
            return { isValid: true };
        }
        return { isValid: false, error: 'Invalid value. Must be a positive number.' };
    }

    /**
     * Validate a string against a custom regex pattern.
     * @param {string} value - The string to validate.
     * @param {RegExp} pattern - The regex pattern to validate against.
     * @param {string} errorMessage - The error message to return if invalid.
     * @returns {Object} - An object containing isValid and error message if invalid.
     */
    static validateWithPattern(value, pattern, errorMessage) {
        if (pattern.test(value)) {
            return { isValid: true };
        }
        return { isValid: false, error: errorMessage };
    }
}

module.exports = Validator;
