import jwt
from datetime import datetime, timedelta
from typing import Optional, Tuple, Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.config.settings import settings

security = HTTPBearer()


class JWTHandler:
    @staticmethod
    def generate_access_token(user_id: int, email: str, auth_provider: str) -> str:
        payload = {
            'user_id': user_id,
            'email': email,
            'auth_provider': auth_provider,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_ACCESS_TOKEN_EXPIRES),
            'type': 'access'
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
        return token

    @staticmethod
    def generate_refresh_token(user_id: int, email: str) -> str:
        payload = {
            'user_id': user_id,
            'email': email,
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(seconds=settings.JWT_REFRESH_TOKEN_EXPIRES),
            'type': 'refresh'
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
        return token

    @staticmethod
    def verify_token(token: str, token_type: str = 'access') -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
            if payload.get('type') != token_type:
                return None, 'Invalid token type'
            return payload, None
        except jwt.ExpiredSignatureError:
            return None, 'Token expired'
        except jwt.InvalidTokenError:
            return None, 'Invalid token'

    @staticmethod
    def decode_token(token: str) -> Optional[Dict[str, Any]]:
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None


async def get_current_user(credentials = Depends(security)) -> Dict[str, Any]:
    token = credentials.credentials
    payload, error = JWTHandler.verify_token(token, token_type='access')
    
    if error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=error,
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return payload or {}



