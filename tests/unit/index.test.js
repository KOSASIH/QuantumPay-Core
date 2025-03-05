// tests/unit/index.test.js

const {
    Logger,
    validateTransactionId,
    validateAddress,
    validatePositiveNumber,
    formatTransaction,
    formatAmount,
    formatAddress,
    formatDate,
    formatJson
} = require('../../utils');

describe('Utilities Index', () => {
    test('should create a logger instance', () => {
        expect(Logger).toBeDefined();
    });

    test('should validate transaction ID', () => {
        expect(validateTransactionId('tx1234567890abcdef')).toEqual({ isValid: true });
    });

    test('should validate Ethereum address', () => {
        expect(validateAddress('0x1234567890abcdef1234567890abcdef12345678')).toEqual({ isValid: true });
    });

    test('should validate positive number', () => {
        expect(validatePositiveNumber(100)).toEqual({ isValid: true });
    });

    test('should format transaction', () => {
        const transaction = {
            id: 'tx1234567890abcdef',
            status: 'confirmed',
            amount: 1234.56789,
            timestamp: Date.now(),
            from: '0x1234567890abcdef1234567890abcdef12345678',
            to: '0x1234567890abcdef1234567890abcdef12345678',
        };
        const formattedTransaction = formatTransaction(transaction);
        expect(formattedTransaction.id).toBe(transaction.id);
    });

    test('should format amount', () => {
        expect(formatAmount(1234.56789)).toBe('1234.57');
    });

    test('should format address', () => {
        expect(formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234567890abcdef1234567890abcdef12345678');
    });

    test('should format date', () => {
        const date = new Date();
        expect(formatDate(date)).toBe(date.toLocaleString());
    });

    test('should format JSON', () => {
        const obj = { key: 'value' };
        expect(formatJson(obj)).toBe(JSON.stringify(obj, null, 2));
    });
});
