// tests/integration/interoperability.test.js

const {
    createCrossChainCommunicator,
    createTransactionVerifier,
    createEventHandler,
    registerBlockchainData,
    emitEvent
} = require('../../interoperability/index');

describe('Interoperability Module Integration Tests', () => {
    let communicator;
    let verifier;
    let eventHandler;

    beforeAll(() => {
        communicator = createCrossChainCommunicator();
        verifier = createTransactionVerifier();
        eventHandler = createEventHandler();
    });

    test('should register blockchain data and verify transactions', async () => {
        const ethereumTransactions = [
            { id: 'tx1', status: 'confirmed' },
            { id: 'tx2', status: 'pending' },
        ];

        registerBlockchainData(verifier, 'Ethereum', ethereumTransactions);

        const message = { transactionId: 'tx1' };
        communicator.registerChannel('Ethereum', async (msg) => {
            const isValid = await verifier.verifyTransaction(msg.transactionId, 'Ethereum');
            emitEvent(eventHandler, 'TransactionVerification', { transactionId: msg.transactionId, isValid });
        });

        await communicator.sendMessage('Ethereum', message);

        const events = eventHandler.getEventsByName('TransactionVerification');
        expect(events.length).toBe(1);
        expect(events[0].data.transactionId).toBe('tx1');
        expect(events[0].data.isValid).toBe(true);
    });

    test('should handle invalid transaction verification', async () => {
        const message = { transactionId: 'tx3' }; // Non-existent transaction

        communicator.registerChannel('Ethereum', async (msg) => {
            const isValid = await verifier.verifyTransaction(msg.transactionId, 'Ethereum');
            emitEvent(eventHandler, 'TransactionVerification', { transactionId: msg.transactionId, isValid });
        });

        await communicator.sendMessage('Ethereum', message);

        const events = eventHandler.getEventsByName('TransactionVerification');
        expect(events.length).toBe(1);
        expect(events[0].data.transactionId).toBe('tx3');
        expect(events[0].data.isValid).toBe(false);
    });
});
