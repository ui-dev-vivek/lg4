import logging
from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from typing import Dict, Any
from fastapi import Depends

router = APIRouter(prefix="/api/health", tags=["health"])

logger = logging.getLogger(__name__)


@router.get("/")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}


@router.get("/database")
async def database_health(db: Session = Depends(get_db)):
    try:
        user_count = db.query(User).count()
        return {
            "status": "healthy",
            "database": "connected",
            "users_count": user_count
        }
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection failed"
        )
