// src/interoperability/crossChainCommunicator.js

class CrossChainCommunicator {
    constructor() {
        this.channels = {}; // Store channels for different chains
    }

    /**
     * Register a new channel for a specific blockchain.
     * @param {string} chainName - The name of the blockchain.
     * @param {Function} callback - The callback function to handle incoming messages.
     */
    registerChannel(chainName, callback) {
        if (this.channels[chainName]) {
            console.warn(`Channel for ${chainName} is already registered. Overwriting.`);
        }
        this.channels[chainName] = callback;
        console.log(`Channel registered for ${chainName}`);
    }

    /**
     * Send a message to a specific blockchain.
     * @param {string} chainName - The name of the blockchain to send the message to.
     * @param {Object} message - The message to send.
     * @returns {Promise} - A promise that resolves when the message is sent.
     */
    async sendMessage(chainName, message) {
        return new Promise((resolve, reject) => {
            if (this.channels[chainName]) {
                console.log(`Sending message to ${chainName}:`, message);
                try {
                    this.channels[chainName](message); // Call the registered callback
                    resolve(`Message sent to ${chainName}`);
                } catch (error) {
                    console.error(`Error sending message to ${chainName}:`, error);
                    reject(`Failed to send message to ${chainName}`);
                }
            } else {
                const errorMsg = `No channel registered for ${chainName}`;
                console.error(errorMsg);
                reject(errorMsg);
            }
        });
    }

    /**
     * Unregister a channel for a specific blockchain.
     * @param {string} chainName - The name of the blockchain to unregister.
     */
    unregisterChannel(chainName) {
        if (this.channels[chainName]) {
            delete this.channels[chainName];
            console.log(`Channel unregistered for ${chainName}`);
        } else {
            console.warn(`No channel registered for ${chainName} to unregister.`);
        }
    }
}

module.exports = CrossChainCommunicator;
