// tests/integration/utils.test.js

const Logger = require('../../utils/logger');
const Validator = require('../../utils/validator');
const Formatter = require('../../utils/formatter');

describe('Utilities Module Integration Tests', () => {
    let logger;

    beforeAll(() => {
        logger = new Logger();
    });

    test('should log and validate transaction ID', () => {
        const transactionId = 'tx1234567890abcdef';
        const validation = Validator.isValidTransactionId(transactionId);

        logger.info(`Validating transaction ID: ${transactionId}`);
        expect(validation.isValid).toBe(true);
        expect(validation.error).toBeUndefined();
    });

    test('should log and validate Ethereum address', () => {
        const address = '0x1234567890abcdef1234567890abcdef12345678';
        const validation = Validator.isValidAddress(address);

        logger.info(`Validating Ethereum address: ${address}`);
        expect(validation.isValid).toBe(true);
        expect(validation.error).toBeUndefined();
    });

    test('should format and log transaction', () => {
        const transaction = {
            id: 'tx1234567890abcdef',
            status: 'confirmed',
            amount: 1234.56789,
            timestamp: Date.now(),
            from: '0x1234567890abcdef1234567890abcdef12345678',
            to: '0x1234567890abcdef1234567890abcdef12345678',
        };

        const formattedTransaction = Formatter.formatTransaction(transaction);
        logger.info(`Formatted Transaction: ${JSON.stringify(formattedTransaction)}`);

        expect(formattedTransaction.id).toBe(transaction.id);
        expect(formattedTransaction.status).toBe('CONFIRMED');
    });
});
