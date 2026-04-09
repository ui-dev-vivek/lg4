from fastapi import APIRouter, Depends, HTTPException
import requests
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from app.config.settings import settings
from app.config.database import get_db
from app.models.udemy_course_model import UdemyCourse
from app.config.llm import llm
router = APIRouter(prefix="/api/udemy-courses", tags=["Udemy Courses"])


# Response Models
class UdemyCourseResponse(BaseModel):
    id: int
    udemy_id: int
    name: str
    slug: str
    category: str
    subcategory: Optional[str]
    description: Optional[str]
    url: str
    image: Optional[str]
    language: Optional[str]
    price: Optional[float]
    sale_price: Optional[float]
    rating: Optional[float]
    lectures: Optional[float]
    views: Optional[int]
    store: str
    type: str
    is_active: bool
    
    class Config:
        from_attributes = True



def send_courses(courses):

    pass
async def check_usefullness(title,category):
    prompt = f'Is this IT Professional/ CS Students related? Title: {title}; Category: {category}. Answer only true or false.'
    response = await llm.ainvoke(prompt=prompt)
    return response




@router.get("/load")
async def load_udemy_courses(db: Session = Depends(get_db)):
    """Load Udemy courses from external API and store in database."""
    course_to_sell=[]
    try:
        response = requests.get(settings.COURSES_API_URL)
        response.raise_for_status()
        response = response.json()
        
        if response.get("status") != "success":
            return {"message": "No Udemy courses found"}
        
        courses = response.get("data", []).get("items", [])
        added_count = 0
        skipped_count = 0
        error_count = 0
        
        for course in courses:
            try:
                # Skip courses with missing critical fields
                if not course.get("slug") or not course.get("id"):
                    error_count += 1
                    print(f"Skipping course with missing slug or id: {course.get('name')}")
                    continue
                # if(course.get("category")=="Development" or course.get("category")=="IT & Software" and len(course_to_sell)>=2):
                #     course_to_sell.append({'title':course.get("name"),'category':course.get("category"),'slug':course.get("slug")})
                
                            
                
                # Check if course already exists
                is_existing = db.query(UdemyCourse).filter(
                    UdemyCourse.slug == course.get("slug")
                ).first()
                
                if is_existing:
                    skipped_count += 1
                    continue

                # Map API response to model fields
                db_course = UdemyCourse(
                    udemy_id=course.get("id"),
                    name=course.get("name") or "Untitled Course",
                    slug=course.get("slug"),
                    category=course.get("category") or "Uncategorized",
                    subcategory=course.get("subcategory"),
                    description=course.get("description"),
                    url=course.get("url") or "",
                    image=course.get("image"),
                    language=course.get("language"),
                    price=float(course.get("price", 0)) if course.get("price") else None,
                    sale_price=float(course.get("sale_price", 0)) if course.get("sale_price") else None,
                    sale_start=course.get("sale_start"),
                    rating=float(course.get("rating", 0)) if course.get("rating") else None,
                    lectures=float(course.get("lectures", 0)) if course.get("lectures") else None,
                    views=int(course.get("views", 0)) if course.get("views") else None,
                    store=course.get("store", "Udemy"),
                    type=course.get("type", "external"),
                    is_active=True
                )
                db.add(db_course)
                added_count += 1
            except Exception as e:
                error_count += 1
                print(f"Error adding course {course.get('name')}: {e}")
                continue
        
        db.commit()
        return {
            "message": "Udemy courses loaded successfully",
            "added": added_count,
            "skipped": skipped_count,
            "errors": error_count,
            "total": added_count + skipped_count + error_count
        }
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error loading Udemy courses: {str(e)}"
        )


@router.get("/", response_model=List[UdemyCourseResponse])
def get_all_courses(
    skip: int = 0,
    limit: int = 10,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all Udemy courses with optional filtering by category."""
    query = db.query(UdemyCourse).filter(UdemyCourse.is_active == True).order_by(UdemyCourse.id.desc())
    
    if category:
        query = query.filter(UdemyCourse.category == category)
    
    courses = query.offset(skip).limit(limit).all()
    return courses


@router.get("/{course_id}", response_model=UdemyCourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    """Get a specific Udemy course by ID."""
    course = db.query(UdemyCourse).filter(UdemyCourse.id == course_id).first()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    return course


@router.get("/slug/{slug}", response_model=UdemyCourseResponse)
def get_course_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a specific Udemy course by slug."""
    course = db.query(UdemyCourse).filter(UdemyCourse.slug == slug).first()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    return course