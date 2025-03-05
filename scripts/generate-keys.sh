#!/bin/bash

# Key generation script for QuantumPay Network wallets

# Exit immediately if a command exits with a non-zero status
set -e

# Define variables
KEYS_DIR="./keys"  # Directory to store generated keys
LOG_FILE="./keygen.log"

# Function to log messages
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Start key generation
log "Starting key generation for QuantumPay Network wallets..."

# Create keys directory if it doesn't exist
mkdir -p "$KEYS_DIR"

# Generate a new wallet key pair
generate_keys() {
    local wallet_name=$1
    local private_key
    local public_key

    # Generate a random private key (32 bytes)
    private_key=$(openssl rand -hex 32)
    # Derive the public key from the private key (using a simple example)
    public_key=$(echo "$private_key" | openssl dgst -sha256 | awk '{print $2}')

    # Save the keys to files
    echo "$private_key" > "$KEYS_DIR/${wallet_name}_private.key"
    echo "$public_key" > "$KEYS_DIR/${wallet_name}_public.key"

    log "Generated keys for wallet: $wallet_name"
    log "Private Key: $private_key"
    log "Public Key: $public_key"
}

# Check if wallet name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <wallet_name>"
    exit 1
fi

# Generate keys for the specified wallet name
generate_keys "$1"

# End of key generation
log "Key generation completed successfully."
