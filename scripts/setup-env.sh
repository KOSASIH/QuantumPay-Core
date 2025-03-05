#!/bin/bash

# Environment setup script for QuantumPay Network

# Exit immediately if a command exits with a non-zero status
set -e

# Define variables
APP_DIR="/path/to/your/app"  # Change this to your application directory
NODE_VERSION="14"             # Specify the Node.js version
LOG_FILE="$APP_DIR/setup.log"

# Function to log messages
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Start environment setup
log "Starting environment setup for QuantumPay Network..."

# Navigate to the application directory
cd "$APP_DIR" || { log "Application directory not found!"; exit 1; }

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    log "Node.js is not installed. Installing Node.js version $NODE_VERSION..."
    curl -sL "https://deb.nodesource.com/setup_$NODE_VERSION.x" | sudo -E bash -
    sudo apt-get install -y nodejs
else
    log "Node.js is already installed. Version: $(node -v)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    log "npm is not installed. Installing npm..."
    sudo apt-get install -y npm
else
    log "npm is already installed. Version: $(npm -v)"
fi

# Install project dependencies
log "Installing project dependencies..."
npm install

# Check for environment variables
if [ ! -f ".env" ]; then
    log "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Install any additional tools or dependencies
# Example: Install PM2 for process management
if ! command -v pm2 &> /dev/null; then
    log "PM2 is not installed. Installing PM2..."
    npm install -g pm2
else
    log "PM2 is already installed. Version: $(pm2 -v)"
fi

# End of environment setup
log "Environment setup completed successfully."
