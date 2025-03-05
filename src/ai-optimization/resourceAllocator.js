// src/ai-optimization/resourceAllocator.js

class ResourceAllocator {
    constructor(totalResources) {
        this.totalResources = totalResources; // Total available resources for allocation
        this.allocatedResources = 0; // Track allocated resources
    }

    /**
     * Allocate resources to transactions based on priority and resource requirements.
     * @param {Array} transactions - Array of transactions to allocate resources to.
     * @returns {Array} - Array of transactions with allocated resources.
     */
    allocateResources(transactions) {
        const allocatedTransactions = transactions.map(transaction => {
            const allocatedResource = this.allocate(transaction);
            return { ...transaction, allocatedResource };
        });

        this.logResourceAllocation(allocatedTransactions);
        return allocatedTransactions;
    }

    /**
     * Allocate a resource to a single transaction based on its requirements.
     * @param {Object} transaction - The transaction to allocate resources to.
     * @returns {Object|null} - The allocated resource or null if not enough resources.
     */
    allocate(transaction) {
        if (this.allocatedResources + transaction.resourceRequirement <= this.totalResources) {
            this.allocatedResources += transaction.resourceRequirement;
            return { type: 'Resource', amount: transaction.resourceRequirement };
        }
        return null; // Not enough resources
    }

    /**
     * Log the resource allocation process for monitoring and debugging.
     * @param {Array} allocatedTransactions - The transactions with allocated resources.
     */
    logResourceAllocation(allocatedTransactions) {
        console.log('Resource Allocation Summary:');
        allocatedTransactions.forEach(transaction => {
            if (transaction.allocatedResource) {
                console.log(`Transaction ID: ${transaction.id}, Allocated Resource: ${transaction.allocatedResource.amount}`);
            } else {
                console.log(`Transaction ID: ${transaction.id}, Allocation Failed: Not enough resources`);
            }
        });
        console.log(`Total Allocated Resources: ${this.allocatedResources} / ${this.totalResources}`);
    }

    /**
     * Reset the allocated resources to allow for new allocations.
     */
    resetAllocation() {
        this.allocatedResources = 0;
        console.log('Resource allocation has been reset.');
    }
}

module.exports = ResourceAllocator;
