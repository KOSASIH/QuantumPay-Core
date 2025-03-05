#!/bin/bash

# Deployment script for QuantumPay Network

# Exit immediately if a command exits with a non-zero status
set -e

# Define variables
APP_NAME="QuantumPay"
APP_DIR="/path/to/your/app"  # Change this to your application directory
NODE_ENV="production"         # Set the environment (development or production)
LOG_FILE="$APP_DIR/deploy.log"

# Function to log messages
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Start deployment
log "Starting deployment for $APP_NAME..."

# Navigate to the application directory
cd "$APP_DIR" || { log "Application directory not found!"; exit 1; }

# Pull the latest code from the repository
log "Pulling the latest code from the repository..."
git pull origin main

# Install dependencies
log "Installing dependencies..."
npm install --production

# Build the application (if applicable)
if [ -f "build.sh" ]; then
    log "Building the application..."
    ./build.sh
fi

# Run migrations (if applicable)
if [ -f "migrate.sh" ]; then
    log "Running database migrations..."
    ./migrate.sh
fi

# Start the application
log "Starting the application..."
npm start &

# Check if the application started successfully
if [ $? -eq 0 ]; then
    log "$APP_NAME deployed successfully!"
else
    log "Failed to start $APP_NAME!"
    exit 1
fi

# End of deployment
log "Deployment process completed."
