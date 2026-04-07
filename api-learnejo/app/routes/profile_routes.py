from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserProfile
from app.utils.jwt_handler import get_current_user
from typing import Dict, Any, Optional
from pydantic import BaseModel
from datetime import date

router = APIRouter(prefix="/api/profile", tags=["profile"])


class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    dob: Optional[date] = None
    gender: Optional[str] = None
    profile_photo: Optional[str] = None
    current_role: Optional[str] = None
    experience_years: Optional[float] = None
    experience_level: Optional[str] = None
    primary_skill: Optional[str] = None
    highest_qualification: Optional[str] = None
    college_name: Optional[str] = None
    graduation_year: Optional[int] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    timezone: Optional[str] = None
    job_alerts_enabled: Optional[bool] = None
    whatsapp_opt_in: Optional[bool] = None
    telegram_opt_in: Optional[bool] = None


@router.get("/")
async def get_profile(current_user: Dict[str, Any] = Depends(get_current_user), db: Session = Depends(get_db)):
    user = db.query(User).get(current_user.get('user_id'))
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    profile = user.profile
    profile_data = {
        'user_id': user.id,
        'name': user.name,
        'email': user.email,
        'phone': user.phone,
        'avatar_url': user.avatar_url,
    }
    
    if profile:
        profile_data['profile'] = {
            'dob': profile.dob.isoformat() if profile.dob else None,
            'gender': profile.gender,
            'profile_photo': profile.profile_photo,
            'current_role': profile.current_role,
            'experience_years': profile.experience_years,
            'experience_level': profile.experience_level,
            'primary_skill': profile.primary_skill,
            'highest_qualification': profile.highest_qualification,
            'college_name': profile.college_name,
            'graduation_year': profile.graduation_year,
            'city': profile.city,
            'state': profile.state,
            'country': profile.country,
            'timezone': profile.timezone,
            'job_alerts_enabled': profile.job_alerts_enabled,
            'whatsapp_opt_in': profile.whatsapp_opt_in,
            'telegram_opt_in': profile.telegram_opt_in,
        }
    
    return profile_data


@router.put("/")
async def update_profile(
    request: ProfileUpdateRequest,
    current_user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).get(current_user.get('user_id'))
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user basic info
    if request.name is not None:
        user.name = request.name
    if request.phone is not None:
        user.phone = request.phone
    if request.avatar_url is not None:
        user.avatar_url = request.avatar_url
    
    # Create profile if not exists
    if not user.profile:
        user.profile = UserProfile(user_id=user.id)
        db.add(user.profile)
    
    profile = user.profile
    
    # Update profile fields
    if request.dob is not None:
        profile.dob = request.dob
    if request.gender is not None:
        profile.gender = request.gender
    if request.profile_photo is not None:
        profile.profile_photo = request.profile_photo
    if request.current_role is not None:
        profile.current_role = request.current_role
    if request.experience_years is not None:
        profile.experience_years = request.experience_years
    if request.experience_level is not None:
        profile.experience_level = request.experience_level
    if request.primary_skill is not None:
        profile.primary_skill = request.primary_skill
    if request.highest_qualification is not None:
        profile.highest_qualification = request.highest_qualification
    if request.college_name is not None:
        profile.college_name = request.college_name
    if request.graduation_year is not None:
        profile.graduation_year = request.graduation_year
    if request.city is not None:
        profile.city = request.city
    if request.state is not None:
        profile.state = request.state
    if request.country is not None:
        profile.country = request.country
    if request.timezone is not None:
        profile.timezone = request.timezone
    if request.job_alerts_enabled is not None:
        profile.job_alerts_enabled = request.job_alerts_enabled
    if request.whatsapp_opt_in is not None:
        profile.whatsapp_opt_in = request.whatsapp_opt_in
    if request.telegram_opt_in is not None:
        profile.telegram_opt_in = request.telegram_opt_in
    
    db.commit()
    
    return {"message": "Profile updated successfully"}

