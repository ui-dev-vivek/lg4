from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text
from sqlalchemy.sql import func
from app.config.database import Base

class UdemyCourse(Base):
    __tablename__ = "udemy_courses"
    
    id = Column(Integer, primary_key=True, index=True)
    udemy_id = Column(Integer, nullable=False, unique=True)
    name = Column(String(500), nullable=False)
    slug = Column(String(500), nullable=False, unique=True)
    category = Column(String(255), nullable=False)
    subcategory = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    url = Column(String(500), nullable=False)
    image = Column(String(500), nullable=True)
    language = Column(String(50), nullable=True)
    price = Column(Float, nullable=True)
    sale_price = Column(Float, nullable=True)
    sale_start = Column(DateTime(timezone=True), nullable=True)
    rating = Column(Float, nullable=True, server_default='0')
    lectures = Column(Float, nullable=True)
    views = Column(Integer, nullable=True, server_default='0')
    store = Column(String(100), nullable=True, server_default='Udemy')
    type = Column(String(50), nullable=True, server_default='external')
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
