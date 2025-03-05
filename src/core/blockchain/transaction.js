// src/core/blockchain/transaction.js

const crypto = require('crypto');

class Transaction {
    constructor(sender, recipient, amount) {
        this.sender = sender; // Sender's address
        this.recipient = recipient; // Recipient's address
        this.amount = amount; // Amount to be transferred
        this.timestamp = Date.now(); // Timestamp of the transaction
        this.signature = ''; // Digital signature of the transaction
    }

    // Method to calculate the transaction hash
    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.sender + this.recipient + this.amount + this.timestamp)
            .digest('hex');
    }

    // Method to sign the transaction
    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.sender) {
            throw new Error('You cannot sign transactions for other wallets!');
        }
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex'); // Store the signature in DER format
    }

    // Method to verify the transaction
    isValid() {
        // Check if the sender's address is valid
        if (!this.sender || !this.recipient) {
            throw new Error('Transaction must include a sender and a recipient.');
        }

        // Check if the amount is valid
        if (this.amount <= 0) {
            throw new Error('Transaction amount must be greater than zero.');
        }

        // If the transaction is a coinbase transaction (first transaction), it doesn't need to be signed
        if (this.signature.length === 0) {
            return true;
        }

        // Verify the signature
        const publicKey = crypto.createPublicKey(this.sender);
        const isVerified = publicKey.verify(this.calculateHash(), this.signature, 'hex', 'base64');
        if (!isVerified) {
            throw new Error('Transaction signature is invalid.');
        }

        return true; // Transaction is valid
    }
}

module.exports = Transaction;
