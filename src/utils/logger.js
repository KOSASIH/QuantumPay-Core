// src/utils/logger.js

const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFilePath) {
        this.logFilePath = logFilePath || path.join(__dirname, 'application.log');
        this.logLevels = {
            INFO: 'INFO',
            WARN: 'WARN',
            ERROR: 'ERROR',
        };
    }

    /**
     * Log a message with the specified level.
     * @param {string} level - The log level (INFO, WARN, ERROR).
     * @param {string} message - The message to log.
     */
    log(level, message) {
        const logEntry = this.formatLogEntry(level, message);
        console.log(logEntry); // Output to console
        this.writeLogToFile(logEntry); // Write to log file
    }

    /**
     * Log an informational message.
     * @param {string} message - The message to log.
     */
    info(message) {
        this.log(this.logLevels.INFO, message);
    }

    /**
     * Log a warning message.
     * @param {string} message - The message to log.
     */
    warn(message) {
        this.log(this.logLevels.WARN, message);
    }

    /**
     * Log an error message.
     * @param {string} message - The message to log.
     */
    error(message) {
        this.log(this.logLevels.ERROR, message);
    }

    /**
     * Format the log entry.
     * @param {string} level - The log level.
     * @param {string} message - The message to log.
     * @returns {string} - The formatted log entry.
     */
    formatLogEntry(level, message) {
        const timestamp = new Date().toISOString();
        return `${timestamp} [${level}] ${message}`;
    }

    /**
     * Write the log entry to a file.
     * @param {string} logEntry - The log entry to write.
     */
    writeLogToFile(logEntry) {
        fs.appendFile(this.logFilePath, logEntry + '\n', (err) => {
            if (err) {
                console.error('Failed to write log to file:', err);
            }
        });
    }
}

module.exports = new Logger(); // Export a singleton instance
