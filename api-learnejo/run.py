import uvicorn
from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    debug = os.getenv('FLASK_ENV') == 'development'
    uvicorn.run(
        "run:app",
        host="0.0.0.0",
        port=8000,
        reload=debug,
        log_level="info"
    )

