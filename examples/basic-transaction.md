# Basic Transaction Example in QuantumPay Network

This document provides an example of how to perform a basic transaction in the QuantumPay Network. It outlines the necessary steps, code snippets, and explanations to help you understand the transaction process.

## Overview

In the QuantumPay Network, a transaction typically involves the following steps:

1. **Generate Wallet Keys**: Create a wallet with a unique public/private key pair.
2. **Create a Transaction**: Define the transaction details, including sender, receiver, and amount.
3. **Sign the Transaction**: Use the private key to sign the transaction, ensuring its authenticity.
4. **Broadcast the Transaction**: Send the signed transaction to the network for processing.
5. **Confirm the Transaction**: Wait for confirmation from the network that the transaction has been processed.

## Step 1: Generate Wallet Keys

You can generate wallet keys using the `generate-keys.sh` script:

```bash
./scripts/generate-keys.sh myWallet
```

This command will create two files in the `keys` directory:
- `myWallet_private.key`: Contains the private key.
- `myWallet_public.key`: Contains the public key.

## Step 2: Create a Transaction

Define the transaction details in your application:

```javascript
const transaction = {
    from: '0xYourSenderAddress', // Replace with your public key
    to: '0xReceiverAddress',      // Replace with the receiver's public key
    amount: 100,                  // Amount to send
    timestamp: Date.now(),        // Current timestamp
};
```

## Step 3: Sign the Transaction

Use the private key to sign the transaction. You can use a cryptographic library like `crypto` in Node.js:

```javascript
const fs = require('fs');
const crypto = require('crypto');

// Load the private key
const privateKey = fs.readFileSync('./keys/myWallet_private.key', 'utf8');

// Sign the transaction
const signTransaction = (transaction, privateKey) => {
    const transactionString = JSON.stringify(transaction);
    const sign = crypto.createSign('SHA256');
    sign.update(transactionString);
    return sign.sign(privateKey, 'hex');
};

const signedTransaction = signTransaction(transaction, privateKey);
console.log('Signed Transaction:', signedTransaction);
```

## Step 4: Broadcast the Transaction

Send the signed transaction to the network. This typically involves making an API call to the network's transaction endpoint:

```javascript
const axios = require('axios');

const broadcastTransaction = async (signedTransaction) => {
    try {
        const response = await axios.post('https://api.quantumpay.network/transactions', {
            transaction: signedTransaction,
        });
        console.log('Transaction broadcasted:', response.data);
    } catch (error) {
        console.error('Error broadcasting transaction:', error);
    }
};

broadcastTransaction(signedTransaction);
```

## Step 5: Confirm the Transaction

After broadcasting, you can check the transaction status by querying the network:

```javascript
const checkTransactionStatus = async (transactionId) => {
    try {
        const response = await axios.get(`https://api.quantumpay.network/transactions/${transactionId}`);
        console.log('Transaction Status:', response.data);
    } catch (error) {
        console.error('Error checking transaction status:', error);
    }
};

// Replace with the actual transaction ID returned from the broadcast
checkTransactionStatus('yourTransactionId');
```

## Conclusion

This document provides a basic overview of how to perform a transaction in the QuantumPay Network. By following these steps, you can create, sign, and broadcast transactions securely. For more advanced use cases, consider exploring additional features such as multi-signature transactions, transaction fees, and error handling.

For further information, refer to the official QuantumPay Network documentation.
