// src/utils/formatter.js

class Formatter {
    /**
     * Format a transaction object for display or logging.
     * @param {Object} transaction - The transaction object to format.
     * @returns {Object} - The formatted transaction object.
     */
    static formatTransaction(transaction) {
        if (!transaction || typeof transaction !== 'object') {
            throw new Error('Invalid transaction object provided for formatting.');
        }

        return {
            id: transaction.id,
            status: transaction.status.toUpperCase(),
            amount: Formatter.formatAmount(transaction.amount),
            timestamp: new Date(transaction.timestamp).toLocaleString(),
            from: Formatter.formatAddress(transaction.from),
            to: Formatter.formatAddress(transaction.to),
        };
    }

    /**
     * Format an amount to a fixed decimal point.
     * @param {number} amount - The amount to format.
     * @param {number} [decimals=2] - The number of decimal places.
     * @returns {string} - The formatted amount as a string.
     */
    static formatAmount(amount, decimals = 2) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid amount provided for formatting.');
        }
        return amount.toFixed(decimals);
    }

    /**
     * Format an Ethereum address to a standard format (lowercase).
     * @param {string} address - The address to format.
     * @returns {string} - The formatted address.
     */
    static formatAddress(address) {
        if (typeof address !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
            throw new Error('Invalid Ethereum address provided for formatting.');
        }
        return address.toLowerCase();
    }

    /**
     * Format a date to a human-readable string.
     * @param {Date|string|number} date - The date to format.
     * @returns {string} - The formatted date string.
     */
    static formatDate(date) {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date provided for formatting.');
        }
        return dateObj.toLocaleString();
    }

    /**
     * Format a generic object to a JSON string with indentation.
     * @param {Object} obj - The object to format.
     * @returns {string} - The formatted JSON string.
     */
    static formatJson(obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('Invalid object provided for JSON formatting.');
        }
        return JSON.stringify(obj, null, 2);
    }
}

module.exports = Formatter;
