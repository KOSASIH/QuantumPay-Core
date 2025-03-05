// tests/unit/formatter.test.js

const Formatter = require('../../utils/formatter');

describe('Formatter', () => {
    test('should format transaction correctly', () => {
        const transaction = {
            id: 'tx1234567890abcdef',
            status: 'confirmed',
            amount: 1234.56789,
            timestamp: Date.now(),
            from: '0x1234567890abcdef1234567890abcdef12345678',
            to: '0x1234567890abcdef1234567890abcdef12345678',
        };
        const formattedTransaction = Formatter.formatTransaction(transaction);
        expect(formattedTransaction.id).toBe(transaction.id);
        expect(formattedTransaction.status).toBe('CONFIRMED');
        expect(formattedTransaction.amount).toBe('1234.57'); // Default 2 decimal places
    });

    test('should format amount correctly', () => {
        expect(Formatter.formatAmount(1234.56789)).toBe('1234.57');
        expect(Formatter.formatAmount(1234.56789, 3)).toBe('1234.568');
    });

    test('should format address correctly', () => {
        expect(Formatter.formatAddress('0x1234567890abcdef1234567890abcdef12345678')).toBe('0x1234567890abcdef1234567890abcdef12345678');
    });

    test('should format date correctly', () => {
        const date = new Date();
        expect(Formatter.formatDate(date)).toBe(date.toLocaleString());
    });

    test('should format JSON correctly', () => {
        const obj = { key: 'value' };
        expect(Formatter.formatJson(obj)).toBe(JSON.stringify(obj, null, 2));
    });
});
