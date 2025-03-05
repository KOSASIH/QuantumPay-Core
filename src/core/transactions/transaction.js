// src/core/transactions/transaction.js

const crypto = require('crypto');

class Transaction {
    constructor(sender, recipient, amount, signatures = []) {
        this.sender = sender; // Sender's address
        this.recipient = recipient; // Recipient's address
        this.amount = amount; // Amount to be transferred
        this.timestamp = Date.now(); // Timestamp of the transaction
        this.signatures = signatures; // Array of digital signatures
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
        this.signatures.push(sig.toDER('hex')); // Store the signature in DER format
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

        // If there are no signatures, the transaction is invalid
        if (this.signatures.length === 0) {
            throw new Error('Transaction must be signed.');
        }

        // Verify each signature
        for (const signature of this.signatures) {
            const publicKey = crypto.createPublicKey(this.sender);
            const isVerified = publicKey.verify(this.calculateHash(), signature, 'hex', 'base64');
            if (!isVerified) {
                throw new Error('Transaction signature is invalid.');
            }
        }

        return true; // Transaction is valid
    }

    // Method to check if the transaction is a multi-signature transaction
    isMultiSignature() {
        return this.signatures.length > 1;
    }
}

module.exports = Transaction;
