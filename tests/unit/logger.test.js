// tests/unit/logger.test.js

const Logger = require('../../utils/logger');

describe('Logger', () => {
    let logger;

    beforeAll(() => {
        logger = new Logger();
    });

    test('should log info messages', () => {
        console.log = jest.fn(); // Mock console.log
        logger.info('Test info message');
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('[INFO]'));
    });

    test('should log warning messages', () => {
        console.warn = jest.fn(); // Mock console.warn
        logger.warn('Test warning message');
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('[WARN]'));
    });

    test('should log error messages', () => {
        console.error = jest.fn(); // Mock console.error
        logger.error('Test error message');
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    });
});
