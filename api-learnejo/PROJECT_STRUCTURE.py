"""
LEARNEJO PROJECT STRUCTURE
==========================

Core Project Structure:
"""

PROJECT_STRUCTURE = """
api-learnejo/
├── app/
│   ├── __init__.py                 # FastAPI app initialization
│   ├── main.py                     # Main entry point
│   ├── database.py                 # Database configuration & session
│   │
│   ├── config/
│   │   ├── __init__.py
│   │   └── settings.py             # Configuration from Pydantic
│   │
│   ├── models/
│   │   └── __init__.py             # SQLAlchemy models (User, UserProfile)
│   │
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth_routes.py          # OAuth endpoints (Google/GitHub/LinkedIn)
│   │   ├── profile_routes.py       # Profile management endpoints
│   │   └── health_routes.py        # Health check endpoints
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py         # Authentication logic
│   │   └── oauth_service.py        # OAuth provider logic
│   │
│   ├── schemas/
│   │   └── response.py             # Pydantic response schemas
│   │
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── jwt_handler.py          # JWT token generation/validation
│   │   └── logger.py               # Logging configuration
│   │
│   └── middleware/
│       └── exception_handler.py     # Exception handling middleware
│
├── migrations/
│   ├── env.py                      # Alembic environment
│   ├── script.py.mako              # Alembic migration template
│   └── versions/
│       └── 001_initial_migration.py # Initial schema migration
│
├── logs/
│   └── .gitkeep                    # Log directory
│
├── run.py                          # Uvicorn runner script
├── alembic.ini                     # Alembic configuration
├── requirements.txt                # Python dependencies
├── .env                            # Environment variables (NOT in git)
├── .gitignore                      # Git ignore rules
├── setup.sh                        # Setup script
├── start.sh                        # Startup script
├── API_EXAMPLES.sh                 # cURL API examples
└── README.md                       # Project documentation


TECHNOLOGY STACK
================

Framework: FastAPI (Async Python web framework)
Database: MySQL with SQLAlchemy ORM
Migrations: Alembic
Authentication: JWT (JSON Web Tokens)
OAuth Providers: Google, GitHub, LinkedIn
HTTP Client: Requests


DATABASE SCHEMA
===============

Users Table:
  - id (Primary Key)
  - name, email, phone, avatar_url
  - auth_provider (local/google/github/linkedin)
  - provider_id (OAuth provider ID)
  - password (nullable, for future email auth)
  - status (active/inactive/banned)
  - email_verified_at, phone_verified_at
  - access_token, refresh_token, remember_token
  - last_login_at, last_login_ip
  - created_at, updated_at, deleted_at

UserProfiles Table:
  - id (Primary Key)
  - user_id (Foreign Key → Users)
  - Personal: dob, gender, profile_photo
  - Career: current_role, experience_years, experience_level, primary_skill
  - Education: highest_qualification, college_name, graduation_year
  - Location: city, state, country, timezone
  - Preferences: job_alerts_enabled, whatsapp_opt_in, telegram_opt_in
  - created_at, updated_at


API ENDPOINTS
=============

Authentication:
  GET  /api/auth/google/authorize      - Get Google OAuth URL
  GET  /api/auth/google/callback       - Google OAuth callback
  GET  /api/auth/github/authorize      - Get GitHub OAuth URL
  GET  /api/auth/github/callback       - GitHub OAuth callback
  GET  /api/auth/linkedin/authorize    - Get LinkedIn OAuth URL
  GET  /api/auth/linkedin/callback     - LinkedIn OAuth callback
  POST /api/auth/refresh               - Refresh access token
  GET  /api/auth/me                    - Get current user (requires auth)
  POST /api/auth/logout                - Logout user (requires auth)

Profile:
  GET  /api/profile/                   - Get user profile (requires auth)
  PUT  /api/profile/                   - Update user profile (requires auth)

Health:
  GET  /api/health/                    - Health check
  GET  /api/health/database            - Database health check


JWT TOKEN STRUCTURE
===================

Access Token (expires in 1 hour):
  - user_id
  - email
  - auth_provider
  - type: 'access'
  - iat, exp

Refresh Token (expires in 30 days):
  - user_id
  - email
  - type: 'refresh'
  - iat, exp


SECURITY FEATURES
=================

1. JWT Authentication
   - Secure token generation using HS256
   - Token validation on protected routes
   - Separate access and refresh tokens

2. OAuth 2.0 Integration
   - Google OAuth 2.0
   - GitHub OAuth 2.0
   - LinkedIn OAuth 2.0

3. No Email/Password Authentication
   - Social login only
   - Strong authentication via OAuth providers

4. CORS Enabled
   - Allow requests from frontend
   - Configurable origins

5. Exception Handling
   - Global exception handlers
   - Proper HTTP status codes
   - Detailed error responses

6. Logging
   - Authentication events logging
   - Error logging
   - Request/response logging


ENVIRONMENT VARIABLES
=====================

Required (.env file):
  DATABASE_URL                 # MySQL connection string
  JWT_SECRET_KEY              # Secret key for JWT signing
  GOOGLE_CLIENT_ID            # Google OAuth client ID
  GOOGLE_CLIENT_SECRET        # Google OAuth secret
  GITHUB_CLIENT_ID            # GitHub OAuth client ID
  GITHUB_CLIENT_SECRET        # GitHub OAuth secret
  LINKEDIN_CLIENT_ID          # LinkedIn OAuth client ID
  LINKEDIN_CLIENT_SECRET      # LinkedIn OAuth secret
  BACKEND_URL                 # Backend URL for callbacks
  FRONTEND_URL                # Frontend URL for redirects


GETTING STARTED
===============

1. Setup Virtual Environment:
   bash setup.sh

2. Create MySQL Database:
   mysql -u root -p
   CREATE DATABASE learnejo_db;

3. Update .env file with OAuth credentials and DB URL

4. Run Migrations:
   alembic upgrade head

5. Start Server:
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

6. Access API Docs:
   http://localhost:8000/docs (Swagger UI)
   http://localhost:8000/redoc (ReDoc)


KEY FILES DESCRIPTION
=====================

app/__init__.py
  - Creates FastAPI instance
  - Registers middleware and routers
  - Initializes database

app/models/__init__.py
  - User model (authentication, identity, security)
  - UserProfile model (personal, career, education, location)

app/utils/jwt_handler.py
  - JWTHandler class for token generation/validation
  - get_current_user dependency for route protection

app/services/oauth_service.py
  - GoogleOAuth, GitHubOAuth, LinkedInOAuth classes
  - OAuth token exchange and user info fetching

app/services/auth_service.py
  - User creation/retrieval logic
  - Token generation and refresh
  - User data serialization

app/routes/auth_routes.py
  - OAuth authorization URLs
  - OAuth callbacks
  - Token refresh endpoint
  - User info endpoint
  - Logout endpoint

app/routes/profile_routes.py
  - Get user profile
  - Update user profile

migrations/versions/001_initial_migration.py
  - Create users and user_profiles tables
  - Define foreign key relationships


FUTURE ENHANCEMENTS
===================

1. Email verification flow
2. Phone verification
3. Two-factor authentication (2FA)
4. Social profile data sync
5. User preferences management
6. Activity/audit logging
7. Account linking (combine multiple OAuth providers)
8. Permission-based access control
9. Rate limiting
10. API key authentication for third-party services
"""

print(PROJECT_STRUCTURE)
