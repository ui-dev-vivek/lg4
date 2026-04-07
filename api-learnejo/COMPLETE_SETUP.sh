#!/bin/bash

###############################################################################
# LEARNEJO API - COMPLETE INSTALLATION AND CONFIGURATION GUIDE
###############################################################################

echo ""
echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║                       LEARNEJO API SETUP                               ║"
echo "║              FastAPI + JWT + OAuth Social Login System                 ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# STEP 1: PYTHON AND VIRTUAL ENVIRONMENT
# ============================================================================

echo "📋 STEP 1: Setting up Python Environment"
echo "────────────────────────────────────────────────────────────────────────"

if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1)
echo "✅ $PYTHON_VERSION"

if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv .venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

source .venv/bin/activate
echo "✅ Virtual environment activated"

# ============================================================================
# STEP 2: INSTALL DEPENDENCIES
# ============================================================================

echo ""
echo "📋 STEP 2: Installing Dependencies"
echo "────────────────────────────────────────────────────────────────────────"

pip install --upgrade pip -q
echo "✅ Pip upgraded"

pip install -r requirements.txt
echo "✅ All dependencies installed"

# ============================================================================
# STEP 3: DATABASE SETUP
# ============================================================================

echo ""
echo "📋 STEP 3: MySQL Database Setup"
echo "────────────────────────────────────────────────────────────────────────"

read -p "Do you want to set up MySQL database now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter MySQL root password: " -s MYSQL_ROOT_PASS
    echo
    read -p "Enter desired database password: " -s DB_PASS
    echo
    
    mysql -u root -p"$MYSQL_ROOT_PASS" <<EOF
CREATE DATABASE IF NOT EXISTS learnejo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'learnejo'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON learnejo_db.* TO 'learnejo'@'localhost';
FLUSH PRIVILEGES;
EOF
    
    echo "✅ Database and user created"
    
    # Update .env
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=mysql+pymysql://learnejo:$DB_PASS@localhost/learnejo_db|" .env
    echo "✅ Updated .env with database credentials"
else
    echo "⚠️  Please manually create the database and update .env"
fi

# ============================================================================
# STEP 4: CONFIGURE OAUTH
# ============================================================================

echo ""
echo "📋 STEP 4: OAuth Configuration"
echo "────────────────────────────────────────────────────────────────────────"

echo ""
echo "You need to configure OAuth for the following providers:"
echo ""

echo "🔵 GOOGLE OAUTH:"
echo "  1. Go to: https://console.cloud.google.com"
echo "  2. Create a new project"
echo "  3. Enable Google+ API"
echo "  4. Create OAuth 2.0 credentials (Web application)"
echo "  5. Add redirect URI: http://localhost:8000/api/auth/google/callback"
echo "  6. Copy Client ID and Secret"
echo ""

echo "⚫ GITHUB OAUTH:"
echo "  1. Go to: https://github.com/settings/developers"
echo "  2. Create a new OAuth App"
echo "  3. Set Authorization callback URL: http://localhost:8000/api/auth/github/callback"
echo "  4. Copy Client ID and Secret"
echo ""

echo "🔗 LINKEDIN OAUTH:"
echo "  1. Go to: https://www.linkedin.com/developers/apps"
echo "  2. Create a new app"
echo "  3. Add Authorized redirect URL: http://localhost:8000/api/auth/linkedin/callback"
echo "  4. Copy Client ID and Secret"
echo ""

echo "⚙️  Update the .env file with your OAuth credentials:"
echo ""

# ============================================================================
# STEP 5: ENVIRONMENT VARIABLES
# ============================================================================

echo "📋 STEP 5: Environment Configuration"
echo "────────────────────────────────────────────────────────────────────────"

if grep -q "GOOGLE_CLIENT_ID=your-google-client-id" .env; then
    echo "⚠️  .env file contains placeholder values"
    echo ""
    echo "📝 Edit .env file and update these variables:"
    echo ""
    grep "^GOOGLE_CLIENT_ID\|^GOOGLE_CLIENT_SECRET\|^GITHUB_CLIENT_ID\|^GITHUB_CLIENT_SECRET\|^LINKEDIN_CLIENT_ID\|^LINKEDIN_CLIENT_SECRET" .env
    echo ""
    echo "Run: nano .env (or your preferred editor)"
else
    echo "✅ OAuth credentials appear to be configured"
fi

# ============================================================================
# STEP 6: MIGRATIONS
# ============================================================================

echo ""
echo "📋 STEP 6: Database Migrations"
echo "────────────────────────────────────────────────────────────────────────"

read -p "Do you want to run migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    alembic upgrade head
    echo "✅ Migrations completed"
else
    echo "⚠️  Run 'alembic upgrade head' when ready"
fi

# ============================================================================
# STEP 7: START SERVER
# ============================================================================

echo ""
echo "📋 STEP 7: Start the API Server"
echo "────────────────────────────────────────────────────────────────────────"

echo ""
echo "✅ Setup complete! Ready to start the server"
echo ""
echo "Run the following command to start the API:"
echo ""
echo "  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "Or use the startup script:"
echo ""
echo "  bash start.sh"
echo ""

echo "╔════════════════════════════════════════════════════════════════════════╗"
echo "║                       ACCESS THE API                                   ║"
echo "╠════════════════════════════════════════════════════════════════════════╣"
echo "║                                                                        ║"
echo "║  📚 API Documentation (Swagger UI):                                    ║"
echo "║     http://localhost:8000/docs                                         ║"
echo "║                                                                        ║"
echo "║  📚 API Documentation (ReDoc):                                         ║"
echo "║     http://localhost:8000/redoc                                        ║"
echo "║                                                                        ║"
echo "║  🏥 Health Check:                                                       ║"
echo "║     http://localhost:8000/api/health                                   ║"
echo "║                                                                        ║"
echo "║  🗂️  Project Structure:                                                 ║"
echo "║     python PROJECT_STRUCTURE.py                                        ║"
echo "║                                                                        ║"
echo "║  📖 API Examples:                                                       ║"
echo "║     bash API_EXAMPLES.sh                                               ║"
echo "║                                                                        ║"
echo "╚════════════════════════════════════════════════════════════════════════╝"
echo ""

# ============================================================================
# OPTIONAL: START SERVER NOW
# ============================================================================

read -p "Start the server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting FastAPI server..."
    echo ""
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
else
    echo "✅ Setup complete. Run the server manually whenever you're ready."
fi
