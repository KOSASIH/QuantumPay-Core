// src/interoperability/examples/interoperabilityExample.js

const {
    createCrossChainCommunicator,
    createTransactionVerifier,
    createEventHandler,
    registerBlockchainData,
    emitEvent
} = require('../index');

// Create instances of the classes
const communicator = createCrossChainCommunicator();
const verifier = createTransactionVerifier();
const eventHandler = createEventHandler();

// Sample blockchain data for verification
const ethereumTransactions = [
    { id: 'tx1', status: 'confirmed' },
    { id: 'tx2', status: 'pending' },
    { id: 'tx3', status: 'confirmed' }
];

const bitcoinTransactions = [
    { id: 'txA', status: 'confirmed' },
    { id: 'txB', status: 'failed' },
    { id: 'txC', status: 'confirmed' }
];

// Register blockchain data for verification
registerBlockchainData(verifier, 'Ethereum', ethereumTransactions);
registerBlockchainData(verifier, 'Bitcoin', bitcoinTransactions);

// Register a channel for Ethereum
communicator.registerChannel('Ethereum', async (message) => {
    console.log('Received message from Ethereum:', message);
    try {
        const isValid = await verifier.verifyTransaction(message.transactionId, 'Ethereum');
        emitEvent(eventHandler, 'TransactionVerification', { transactionId: message.transactionId, isValid });
    } catch (error) {
        console.error('Error verifying transaction:', error);
    }
});

// Register a channel for Bitcoin
communicator.registerChannel('Bitcoin', async (message) => {
    console.log('Received message from Bitcoin:', message);
    try {
        const isValid = await verifier.verifyTransaction(message.transactionId, 'Bitcoin');
        emitEvent(eventHandler, 'TransactionVerification', { transactionId: message.transactionId, isValid });
    } catch (error) {
        console.error('Error verifying transaction:', error);
    }
});

// Send messages to both blockchains
const ethereumMessage = { transactionId: 'tx1', data: 'Sample data for Ethereum' };
const bitcoinMessage = { transactionId: 'txA', data: 'Sample data for Bitcoin' };

(async () => {
    try {
        await communicator.sendMessage('Ethereum', ethereumMessage);
        await communicator.sendMessage('Bitcoin', bitcoinMessage);
    } catch (error) {
        console.error('Error sending message:', error);
    }

    // Retrieve and display emitted events
    const events = eventHandler.getEvents();
    console.log('Emitted Events:', events);
})();
