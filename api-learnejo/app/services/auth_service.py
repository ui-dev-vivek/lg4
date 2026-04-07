from app.models import User, UserProfile
from app.utils.jwt_handler import JWTHandler
from app.database import SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Dict, Any, Optional, Tuple


class AuthService:
    @staticmethod
    def get_or_create_user(
        db: Session,
        oauth_provider: str,
        provider_id: str,
        email: str,
        name: str,
        avatar_url: Optional[str] = None
    ) -> User:
        user = db.query(User).filter_by(provider_id=provider_id, auth_provider=oauth_provider).first()
        
        if not user:
            user = db.query(User).filter_by(email=email).first()
        
        if not user:
            user = User(
                name=name,
                email=email,
                auth_provider=oauth_provider,
                provider_id=provider_id,
                avatar_url=avatar_url,
                status='active'
            )
            db.add(user)
        else:
            if not user.provider_id:
                user.provider_id = provider_id
            if not user.auth_provider or user.auth_provider == 'local':
                user.auth_provider = oauth_provider
            if avatar_url and not user.avatar_url:
                user.avatar_url = avatar_url
        
        user.last_login_at = datetime.utcnow()
        db.commit()
        db.refresh(user)
        
        return user

    @staticmethod
    def generate_tokens(db: Session, user: User) -> Dict[str, Any]:
        access_token = JWTHandler.generate_access_token(user.id, user.email, user.auth_provider)
        refresh_token = JWTHandler.generate_refresh_token(user.id, user.email)
        
        user.access_token = access_token
        user.refresh_token = refresh_token
        db.commit()
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'avatar_url': user.avatar_url,
                'auth_provider': user.auth_provider
            }
        }

    @staticmethod
    def refresh_access_token(db: Session, refresh_token: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        payload, error = JWTHandler.verify_token(refresh_token, token_type='refresh')
        
        if error:
            return None, error
        
        user = db.query(User).get(payload.get('user_id'))
        if not user or user.refresh_token != refresh_token:
            return None, 'Invalid refresh token'
        
        new_access_token = JWTHandler.generate_access_token(user.id, user.email, user.auth_provider)
        user.access_token = new_access_token
        db.commit()
        
        return {
            'access_token': new_access_token,
            'refresh_token': refresh_token
        }, None

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[Dict[str, Any]]:
        user = db.query(User).get(user_id)
        if not user or user.status == 'banned':
            return None
        
        return {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'phone': user.phone,
            'avatar_url': user.avatar_url,
            'auth_provider': user.auth_provider,
            'status': user.status,
            'email_verified': user.email_verified_at is not None,
            'last_login_at': user.last_login_at,
            'profile': {
                'dob': user.profile.dob.isoformat() if user.profile and user.profile.dob else None,
                'gender': user.profile.gender if user.profile else None,
                'profile_photo': user.profile.profile_photo if user.profile else None,
                'current_role': user.profile.current_role if user.profile else None,
                'experience_years': user.profile.experience_years if user.profile else None,
                'experience_level': user.profile.experience_level if user.profile else None,
                'city': user.profile.city if user.profile else None,
                'country': user.profile.country if user.profile else None,
            } if user.profile else None
        }

    @staticmethod
    def logout_user(db: Session, user_id: int) -> bool:
        user = db.query(User).get(user_id)
        if user:
            user.access_token = None
            user.refresh_token = None
            db.commit()
            return True
        return False

