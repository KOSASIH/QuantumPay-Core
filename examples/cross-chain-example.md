# Cross-Chain Transaction Example in QuantumPay Network

This document provides an example of how to perform a cross-chain transaction in the QuantumPay Network. It outlines the necessary steps, code snippets, and explanations to help you understand the cross-chain transaction process.

## Overview

Cross-chain transactions allow users to transfer assets or data between different blockchain networks. In the QuantumPay Network, this process typically involves the following steps:

1. **Generate Wallet Keys**: Create wallets on both blockchains involved in the transaction.
2. **Create a Cross-Chain Transaction**: Define the transaction details, including sender, receiver, amount, and target blockchain.
3. **Sign the Transaction**: Use the private key to sign the transaction.
4. **Broadcast the Transaction**: Send the signed transaction to the source blockchain.
5. **Confirm the Transaction**: Wait for confirmation from the source blockchain.
6. **Complete the Transaction on the Target Blockchain**: Finalize the transaction on the destination blockchain.

## Step 1: Generate Wallet Keys

You can generate wallet keys for both blockchains using the `generate-keys.sh` script:

```bash
./scripts/generate-keys.sh myWalletSource
./scripts/generate-keys.sh myWalletTarget
```

This command will create two sets of key files in the `keys` directory:
- `myWalletSource_private.key` and `myWalletSource_public.key` for the source blockchain.
- `myWalletTarget_private.key` and `myWalletTarget_public.key` for the target blockchain.

## Step 2: Create a Cross-Chain Transaction

Define the transaction details in your application:

```javascript
const crossChainTransaction = {
    from: '0xYourSourceAddress', // Replace with your source public key
    to: '0xReceiverAddress',      // Replace with the receiver's public key on the target blockchain
    amount: 100,                  // Amount to send
    targetBlockchain: 'Ethereum', // Specify the target blockchain
    timestamp: Date.now(),        // Current timestamp
};
```

## Step 3: Sign the Transaction

Use the private key from the source blockchain to sign the transaction:

```javascript
const fs = require('fs');
const crypto = require('crypto');

// Load the private key for the source blockchain
const privateKeySource = fs.readFileSync('./keys/myWalletSource_private.key', 'utf8');

// Sign the cross-chain transaction
const signCrossChainTransaction = (transaction, privateKey) => {
    const transactionString = JSON.stringify(transaction);
    const sign = crypto.createSign('SHA256');
    sign.update(transactionString);
    return sign.sign(privateKey, 'hex');
};

const signedCrossChainTransaction = signCrossChainTransaction(crossChainTransaction, privateKeySource);
console.log('Signed Cross-Chain Transaction:', signedCrossChainTransaction);
```

## Step 4: Broadcast the Transaction

Send the signed transaction to the source blockchain. This typically involves making an API call to the source blockchain's transaction endpoint:

```javascript
const axios = require('axios');

const broadcastCrossChainTransaction = async (signedTransaction) => {
    try {
        const response = await axios.post('https://api.sourceblockchain.network/transactions', {
            transaction: signedTransaction,
        });
        console.log('Cross-Chain Transaction broadcasted:', response.data);
        return response.data.transactionId; // Return the transaction ID for confirmation
    } catch (error) {
        console.error('Error broadcasting cross-chain transaction:', error);
    }
};

const transactionId = await broadcastCrossChainTransaction(signedCrossChainTransaction);
```

## Step 5: Confirm the Transaction

After broadcasting, you can check the transaction status on the source blockchain:

```javascript
const checkCrossChainTransactionStatus = async (transactionId) => {
    try {
        const response = await axios.get(`https://api.sourceblockchain.network/transactions/${transactionId}`);
        console.log('Cross-Chain Transaction Status:', response.data);
    } catch (error) {
        console.error('Error checking cross-chain transaction status:', error);
    }
};

checkCrossChainTransactionStatus(transactionId);
```

## Step 6: Complete the Transaction on the Target Blockchain

Once the transaction is confirmed on the source blockchain, you can finalize the transaction on the target blockchain. This may involve a similar process of broadcasting a transaction to the target blockchain:

```javascript
const completeCrossChainTransaction = async (transactionId) => {
    try {
        const response = await axios.post('https://api.targetblockchain.network/complete-transaction', {
            transactionId: transactionId,
            to: '0xReceiverAddress', // Replace with the receiver's public key on the target blockchain
            amount: 100,              // Amount to send
        });
        console.log('Cross-Chain Transaction completed on target blockchain:', response.data);
    } catch (error) {
        console.error('Error completing cross-chain transaction on target blockchain:', error);
    }
};

await completeCrossChainTransaction(transactionId);
```

## Conclusion

This document provides a basic overview of how to perform a cross-chain transaction in the QuantumPay Network. By following these steps, you can create, sign, and broadcast cross-chain transactions securely. For more advanced use cases, consider exploring additional features such as multi-signature transactions, transaction fees, and error handling.

For further information, refer to the official QuantumPay Network documentation.
