from fastapi import APIRouter, HTTPException, status, Depends, Query
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.oauth_service import GoogleOAuth, GitHubOAuth, LinkedInOAuth
from app.services.auth_service import AuthService
from app.utils.jwt_handler import get_current_user
from app.config.settings import settings
from typing import Dict, Any
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["authentication"])


class RefreshTokenRequest(BaseModel):
    refresh_token: str


@router.get("/google/authorize")
async def google_authorize():
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"
    authorization_url = GoogleOAuth.get_authorization_url(redirect_uri)
    return {"authorization_url": authorization_url}


@router.get("/google/callback")
async def google_callback(code: str = Query(None), db: Session = Depends(get_db)):
    if not code:
        raise HTTPException(status_code=400, detail="No authorization code provided")
    
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/google/callback"
    
    try:
        token_response = GoogleOAuth.get_access_token(code, redirect_uri)
        
        if 'error' in token_response:
            raise HTTPException(status_code=400, detail="Failed to get access token")
        
        access_token = token_response.get('access_token')
        user_info = GoogleOAuth.get_user_info(access_token)
        
        user = AuthService.get_or_create_user(
            db,
            oauth_provider='google',
            provider_id=user_info.get('id'),
            email=user_info.get('email'),
            name=user_info.get('name'),
            avatar_url=user_info.get('picture')
        )
        
        tokens = AuthService.generate_tokens(db, user)
        frontend_url = f"{settings.FRONTEND_URL}/auth/success?access_token={tokens['access_token']}&refresh_token={tokens['refresh_token']}"
        
        return RedirectResponse(url=frontend_url)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/github/authorize")
async def github_authorize():
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/github/callback"
    authorization_url = GitHubOAuth.get_authorization_url(redirect_uri)
    return {"authorization_url": authorization_url}


@router.get("/github/callback")
async def github_callback(code: str = Query(None), db: Session = Depends(get_db)):
    if not code:
        raise HTTPException(status_code=400, detail="No authorization code provided")
    
    try:
        token_response = GitHubOAuth.get_access_token(code)
        
        if 'error' in token_response:
            raise HTTPException(status_code=400, detail="Failed to get access token")
        
        access_token = token_response.get('access_token')
        user_info = GitHubOAuth.get_user_info(access_token)
        emails = GitHubOAuth.get_user_emails(access_token)
        
        primary_email = next((e['email'] for e in emails if e.get('primary')), None)
        if not primary_email and emails:
            primary_email = emails[0].get('email')
        
        user = AuthService.get_or_create_user(
            db,
            oauth_provider='github',
            provider_id=str(user_info.get('id')),
            email=primary_email or user_info.get('email'),
            name=user_info.get('name') or user_info.get('login'),
            avatar_url=user_info.get('avatar_url')
        )
        
        tokens = AuthService.generate_tokens(db, user)
        frontend_url = f"{settings.FRONTEND_URL}/auth/success?access_token={tokens['access_token']}&refresh_token={tokens['refresh_token']}"
        
        return RedirectResponse(url=frontend_url)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/linkedin/authorize")
async def linkedin_authorize():
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/linkedin/callback"
    authorization_url = LinkedInOAuth.get_authorization_url(redirect_uri)
    return {"authorization_url": authorization_url}


@router.get("/linkedin/callback")
async def linkedin_callback(code: str = Query(None), db: Session = Depends(get_db)):
    if not code:
        raise HTTPException(status_code=400, detail="No authorization code provided")
    
    redirect_uri = f"{settings.BACKEND_URL}/api/auth/linkedin/callback"
    
    try:
        token_response = LinkedInOAuth.get_access_token(code, redirect_uri)
        
        if 'error' in token_response:
            raise HTTPException(status_code=400, detail="Failed to get access token")
        
        access_token = token_response.get('access_token')
        user_info = LinkedInOAuth.get_user_info(access_token)
        email_info = LinkedInOAuth.get_user_email(access_token)
        
        linkedin_id = user_info.get('sub')
        name = f"{user_info.get('given_name', '')} {user_info.get('family_name', '')}".strip()
        email = user_info.get('email') or (
            email_info.get('elements', [{}])[0].get('handle~', {}).get('emailAddress') 
            if email_info.get('elements') else None
        )
        
        user = AuthService.get_or_create_user(
            db,
            oauth_provider='linkedin',
            provider_id=linkedin_id,
            email=email,
            name=name or 'LinkedIn User',
            avatar_url=user_info.get('picture') if 'picture' in user_info else None
        )
        
        tokens = AuthService.generate_tokens(db, user)
        frontend_url = f"{settings.FRONTEND_URL}/auth/success?access_token={tokens['access_token']}&refresh_token={tokens['refresh_token']}"
        
        return RedirectResponse(url=frontend_url)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/refresh")
async def refresh_token(request: RefreshTokenRequest, db: Session = Depends(get_db)):
    if not request.refresh_token:
        raise HTTPException(status_code=400, detail="Missing refresh token")
    
    tokens, error = AuthService.refresh_access_token(db, request.refresh_token)
    
    if error:
        raise HTTPException(status_code=401, detail=error)
    
    return tokens


@router.get("/me")
async def get_current_user_info(current_user: Dict[str, Any] = Depends(get_current_user), db: Session = Depends(get_db)):
    user_data = AuthService.get_user_by_id(db, current_user.get('user_id'))
    
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user_data


@router.post("/logout")
async def logout(current_user: Dict[str, Any] = Depends(get_current_user), db: Session = Depends(get_db)):
    success = AuthService.logout_user(db, current_user.get('user_id'))
    
    if not success:
        raise HTTPException(status_code=400, detail="Logout failed")
    
    return {"message": "Logged out successfully"}

