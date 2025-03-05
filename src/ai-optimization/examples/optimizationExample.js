// src/ai-optimization/examples/optimizationExample.js

const { optimizeTransactions, allocateResources, ResourceAllocator } = require('../index');

// Sample transactions with dynamic attributes
const transactions = [
    { id: 1, fee: 0.5, urgency: 2, resourceRequirement: 10, successRate: 0.9 },
    { id: 2, fee: 0.8, urgency: 1, resourceRequirement: 5, successRate: 0.95 },
    { id: 3, fee: 0.3, urgency: 3, resourceRequirement: 15, successRate: 0.85 },
    { id: 4, fee: 0.6, urgency: 2, resourceRequirement: 20, successRate: 0.8 },
];

// Optimize transactions based on multiple criteria
const optimizedTransactions = optimizeTransactions(transactions);
console.log('Optimized Transactions:');
optimizedTransactions.forEach(transaction => {
    console.log(`ID: ${transaction.id}, Fee: ${transaction.fee}, Urgency: ${transaction.urgency}, Success Rate: ${transaction.successRate}`);
});

// Total available resources for allocation
const totalResources = 30;

// Allocate resources to optimized transactions
const allocator = new ResourceAllocator(totalResources);
const allocatedTransactions = allocator.allocateResources(optimizedTransactions);

// Display allocated transactions
console.log('\nAllocated Transactions:');
allocatedTransactions.forEach(transaction => {
    if (transaction.allocatedResource) {
        console.log(`Transaction ID: ${transaction.id}, Allocated Resource: ${transaction.allocatedResource.amount}`);
    } else {
        console.log(`Transaction ID: ${transaction.id}, Allocation Failed: Not enough resources`);
    }
});

// Reset allocation for demonstration purposes
allocator.resetAllocation();
