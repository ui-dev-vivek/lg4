#!/bin/bash

# Learnejo API Startup Script

set -e

echo "🚀 Starting Learnejo API..."

# Activate virtual environment
if [ -d ".venv" ]; then
    source .venv/bin/activate
    echo "✅ Virtual environment activated"
else
    echo "❌ Virtual environment not found. Creating..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
fi

# Check database connection (optional)
echo "📦 Database configuration:"
echo "  URL: ${DATABASE_URL}"

# Run migrations (optional - uncomment if DB is ready)
# echo "🔄 Running database migrations..."
# alembic upgrade head

# Start the server
echo "🌐 Starting FastAPI server on http://localhost:8000"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
