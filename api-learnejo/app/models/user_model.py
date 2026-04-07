from sqlalchemy import Column, Integer, String, DateTime, Date, Float, Boolean, ForeignKey, Enum
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
from app.config.database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Identity
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    phone = Column(String(20), unique=True, nullable=True)
    avatar_url = Column(String(500), nullable=True)
    
    # Auth
    password = Column(String(255), nullable=True)
    auth_provider = Column(String(50), default='local', nullable=False)
    provider_id = Column(String(255), nullable=True, unique=True)
    
    # Status
    status = Column(String(20), default='active', nullable=False)
    email_verified_at = Column(DateTime, nullable=True)
    phone_verified_at = Column(DateTime, nullable=True)
    
    # Security
    remember_token = Column(String(500), nullable=True)
    access_token = Column(String(1000), nullable=True)
    refresh_token = Column(String(1000), nullable=True)
    last_login_at = Column(DateTime, nullable=True)
    last_login_ip = Column(String(45), nullable=True)
    
    # Meta
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    deleted_at = Column(DateTime, nullable=True)
    
    # Relationships
    profile = relationship('UserProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email or self.name}>'


class UserProfile(Base):
    __tablename__ = 'user_profiles'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True, nullable=False)
    
    # Personal
    dob = Column(Date, nullable=True)
    gender = Column(String(20), nullable=True)
    profile_photo = Column(String(500), nullable=True)
    
    # Career
    current_role = Column(String(255), nullable=True)
    experience_years = Column(Float, default=0.0, nullable=False)
    experience_level = Column(String(50), nullable=True)
    primary_skill = Column(String(255), nullable=True)
    
    # Education
    highest_qualification = Column(String(255), nullable=True)
    college_name = Column(String(255), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    
    # Location
    city = Column(String(255), nullable=True)
    state = Column(String(255), nullable=True)
    country = Column(String(255), default='India', nullable=False)
    timezone = Column(String(100), default='Asia/Kolkata', nullable=False)
    
    # Preferences
    job_alerts_enabled = Column(Boolean, default=True, nullable=False)
    whatsapp_opt_in = Column(Boolean, default=False, nullable=False)
    telegram_opt_in = Column(Boolean, default=False, nullable=False)
    
    # Meta
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f'<UserProfile user_id={self.user_id}>'

