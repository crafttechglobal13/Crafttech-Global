#!/bin/bash
# ==============================================================================
# CRAFTTECH GLOBAL - Hostinger Automated Git Deployment Script
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "🚀 Starting CRAFTTECH GLOBAL Deployment on Hostinger..."
echo "--------------------------------------------------------"

# 1. Pull latest code from GitHub
echo "📥 Pulling latest changes from GitHub (main)..."
git pull origin main

# 2. Check for environment file
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "📄 Creating .env from .env.example..."
        cp .env.example .env
    fi
fi

# 3. Install production and build dependencies
echo "📦 Installing npm dependencies..."
npm install --include=dev

# 4. Generate Prisma Client
echo "🗄️  Generating Prisma database client..."
npx prisma generate

# 5. Build Next.js production bundle
echo "🏗️  Building Next.js application..."
npm run build

# 6. Restart process (PM2 or Passenger)
if command -v pm2 &> /dev/null; then
    echo "🔄 Reloading PM2 process..."
    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
else
    # Trigger Passenger restart if on Hostinger CloudLinux/cPanel
    mkdir -p tmp
    touch tmp/restart.txt
    echo "🔄 Touched tmp/restart.txt to reload Passenger Node server."
fi

echo "--------------------------------------------------------"
echo "✅ CRAFTTECH GLOBAL is live and running on Hostinger!"
echo "--------------------------------------------------------"

