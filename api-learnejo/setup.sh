#!/bin/bash

# Complete project setup and installation guide

echo "================================"
echo "  Learnejo API - Setup Guide"
echo "================================"
echo ""

# Check if Python 3.8+ is installed
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✅ Python version: $python_version"

# Create virtual environment if not exists
if [ ! -d ".venv" ]; then
    echo ""
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
source .venv/bin/activate
echo "✅ Virtual environment activated"

# Upgrade pip
echo ""
echo "📦 Upgrading pip..."
pip install --upgrade pip -q

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pip install -r requirements.txt
echo "✅ Dependencies installed"

# Create MySQL database
echo ""
echo "📝 Setting up MySQL Database"
echo "================================"
echo "Run these commands in MySQL:"
echo ""
echo "  mysql -u root -p"
echo "  CREATE DATABASE learnejo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "  CREATE USER 'learnejo'@'localhost' IDENTIFIED BY 'your_password';"
echo "  GRANT ALL PRIVILEGES ON learnejo_db.* TO 'learnejo'@'localhost';"
echo "  FLUSH PRIVILEGES;"
echo ""

# Update .env file
echo ""
echo "📝 Configuring environment variables..."
echo "================================"
echo "Update .env file with:"
echo ""
echo "  DATABASE_URL=mysql+pymysql://learnejo:your_password@localhost/learnejo_db"
echo "  JWT_SECRET_KEY=your-secure-jwt-key"
echo "  GOOGLE_CLIENT_ID=your-google-oauth-client-id"
echo "  GOOGLE_CLIENT_SECRET=your-google-oauth-secret"
echo "  GITHUB_CLIENT_ID=your-github-oauth-client-id"
echo "  GITHUB_CLIENT_SECRET=your-github-oauth-secret"
echo "  LINKEDIN_CLIENT_ID=your-linkedin-oauth-client-id"
echo "  LINKEDIN_CLIENT_SECRET=your-linkedin-oauth-secret"
echo ""

# Create log directory
mkdir -p logs
echo "✅ Log directory created"

# Display further instructions
echo ""
echo "================================"
echo "  Next Steps"
echo "================================"
echo ""
echo "1. Update .env with your OAuth credentials"
echo "2. Create MySQL database and user"
echo "3. Update DATABASE_URL in .env"
echo ""
echo "4. Run migrations (when DB is ready):"
echo "   alembic upgrade head"
echo ""
echo "5. Start the server:"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "6. Access API documentation:"
echo "   http://localhost:8000/docs"
echo ""
echo "================================"
