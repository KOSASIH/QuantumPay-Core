// tests/unit/validator.test.js

const Validator = require('../../utils/validator');

describe('Validator', () => {
    test('should validate transaction ID', () => {
        expect(Validator.isValidTransactionId('tx1234567890abcdef')).toEqual({ isValid: true });
        expect(Validator.isValidTransactionId('')).toEqual({ isValid: false, error: 'Invalid transaction ID. Must be alphanumeric and 1-64 characters long.' });
    });

    test('should validate Ethereum address', () => {
        expect(Validator.isValidAddress('0x1234567890abcdef1234567890abcdef12345678')).toEqual({ isValid: true });
        expect(Validator.isValidAddress('invalid_address')).toEqual({ isValid: false, error: 'Invalid address. Must be a valid Ethereum address (0x followed by 40 hex characters).' });
    });

    test('should validate positive number', () => {
        expect(Validator.isPositiveNumber(100)).toEqual({ isValid: true });
        expect(Validator.isPositiveNumber(-1)).toEqual({ isValid: false, error: 'Invalid value. Must be a positive number.' });
    });
});
