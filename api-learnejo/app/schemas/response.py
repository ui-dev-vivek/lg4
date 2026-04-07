from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import date, datetime


class UserLoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: dict


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: Optional[str]
    phone: Optional[str]
    avatar_url: Optional[str]
    auth_provider: str
    status: str
    email_verified: bool
    last_login_at: Optional[datetime]


class ProfileResponse(BaseModel):
    dob: Optional[date]
    gender: Optional[str]
    profile_photo: Optional[str]
    current_role: Optional[str]
    experience_years: float
    experience_level: Optional[str]
    primary_skill: Optional[str]
    highest_qualification: Optional[str]
    college_name: Optional[str]
    graduation_year: Optional[int]
    city: Optional[str]
    state: Optional[str]
    country: str
    timezone: str
    job_alerts_enabled: bool
    whatsapp_opt_in: bool
    telegram_opt_in: bool


class UserDetailResponse(BaseModel):
    user_id: int
    name: str
    email: Optional[str]
    phone: Optional[str]
    avatar_url: Optional[str]
    profile: Optional[ProfileResponse]


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
