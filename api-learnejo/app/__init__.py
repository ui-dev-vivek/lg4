from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.database import engine
from app.models import Base

# Create tables only if database is available
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not create tables: {e}")


def create_app():
    app = FastAPI(
        title="Learnejo API",
        description="Social login authentication system with JWT tokens",
        version="1.0.0"
    )
    
    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include routers
    from app.routes import auth_routes, profile_routes, health_routes,udemy_courses
    
    app.include_router(auth_routes.router)
    app.include_router(profile_routes.router)
    app.include_router(health_routes.router)
    
    # Udemy Courses
    app.include_router(udemy_courses.router)
    
    return app



