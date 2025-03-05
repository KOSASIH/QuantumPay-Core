// src/smart-contracts/contractManager.js

const SmartContract = require('./smartContract');
const fs = require('fs');
const path = require('path');

class ContractManager {
    constructor() {
        this.contracts = {}; // Store deployed contracts
        this.contractFilePath = path.resolve(__dirname, 'contracts.json'); // Path to store contracts
        this.loadContracts(); // Load existing contracts from file
    }

    // Method to deploy a new contract
    deployContract(name, owner) {
        if (this.contracts[name]) {
            throw new Error(`Contract ${name} is already deployed`);
        }
        const contract = new SmartContract(name, owner);
        this.contracts[name] = contract;
        this.saveContracts(); // Save contracts to file
        console.log(`Contract ${name} deployed by ${owner}`);
        return contract;
    }

    // Method to execute a function on a deployed contract
    executeContract(name, functionName, caller, ...args) {
        const contract = this.contracts[name];
        if (!contract) {
            throw new Error(`Contract ${name} is not deployed`);
        }
        return contract.execute(functionName, caller, ...args);
    }

    // Method to get the state of a contract
    getContractState(name, key) {
        const contract = this.contracts[name];
        if (!contract) {
            throw new Error(`Contract ${name} is not deployed`);
        }
        return contract.getState(key);
    }

    // Method to get all events emitted by a contract
    getContractEvents(name) {
        const contract = this.contracts[name];
        if (!contract) {
            throw new Error(`Contract ${name} is not deployed`);
        }
        return contract.getEvents();
    }

    // Method to reset the state of a contract
    resetContractState(name, caller) {
        const contract = this.contracts[name];
        if (!contract) {
            throw new Error(`Contract ${name} is not deployed`);
        }
        return contract.resetState(caller);
    }

    // Method to save contracts to a JSON file
    saveContracts() {
        const contractsData = Object.keys(this.contracts).map(name => ({
            name,
            owner: this.contracts[name].owner,
            state: this.contracts[name].state,
            events: this.contracts[name].events
        }));
        fs.writeFileSync(this.contractFilePath, JSON.stringify(contractsData, null, 2));
    }

    // Method to load contracts from a JSON file
    loadContracts() {
        if (fs.existsSync(this.contractFilePath)) {
            const contractsData = JSON.parse(fs.readFileSync(this.contractFilePath));
            contractsData.forEach(({ name, owner, state, events }) => {
                const contract = new SmartContract(name, owner);
                contract.state = state;
                contract.events = events;
                this.contracts[name] = contract;
            });
            console.log('Contracts loaded from file');
        }
    }
}

module.exports = ContractManager;
