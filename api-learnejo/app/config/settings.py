import os
from datetime import timedelta
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    SECRET_KEY: str = 'dev-secret-key'
    DATABASE_URL: str = 'mysql+pymysql://root:password@localhost:3306/learnejo_db'
    
    JWT_SECRET_KEY: str = 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES: int = 3600
    JWT_REFRESH_TOKEN_EXPIRES: int = 2592000
    
    GOOGLE_CLIENT_ID: str = ''
    GOOGLE_CLIENT_SECRET: str = ''
    GOOGLE_OAUTH_URL: str = ''
    
    GITHUB_CLIENT_ID: str = ''
    GITHUB_CLIENT_SECRET: str = ''
    GITHUB_OAUTH_URL: str = ''
    
    LINKEDIN_CLIENT_ID: str = ''
    LINKEDIN_CLIENT_SECRET: str = ''
    LINKEDIN_OAUTH_URL: str = ''
    
    BACKEND_URL: str = 'http://localhost:8000'
    FRONTEND_URL: str = 'http://localhost:3000'
    
    ENVIRONMENT: str = 'development'
    COURSES_API_URL: str = ''
    
    LLM_PROVIDER: str = 'groq'
    GROQ_API_KEY: str = ''
    GROQ_MODEL: str = 'mixtral-8x7b-32768'
    OPENAI_API_KEY: str = ''
    OPEN_ROUTER_API_KEY: str = ''
    LLM_MODEL: str = 'gpt-3.5-turbo'
    SARVAM_API_KEY: str = ''
    
    class Config:
        env_file = '.env'
        case_sensitive = True
        extra = 'ignore'


settings = Settings()


