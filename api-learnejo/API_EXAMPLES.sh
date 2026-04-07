"""
API Usage Examples
=================

This file contains curl examples for testing the Learnejo API endpoints.
"""

# 1. GET AUTHORIZATION URL FOR GOOGLE
curl http://localhost:8000/api/auth/google/authorize

# 2. GET AUTHORIZATION URL FOR GITHUB
curl http://localhost:8000/api/auth/github/authorize

# 3. GET AUTHORIZATION URL FOR LINKEDIN
curl http://localhost:8000/api/auth/linkedin/authorize

# 4. REFRESH ACCESS TOKEN
curl -X POST http://localhost:8000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "YOUR_REFRESH_TOKEN_HERE"}'

# 5. GET CURRENT USER INFO (requires Bearer token)
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  http://localhost:8000/api/auth/me

# 6. GET USER PROFILE
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  http://localhost:8000/api/profile/

# 7. UPDATE USER PROFILE
curl -X PUT http://localhost:8000/api/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+91-9876543210",
    "current_role": "Software Engineer",
    "experience_years": 5.5,
    "experience_level": "mid",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India"
  }'

# 8. LOGOUT
curl -X POST http://localhost:8000/api/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"

# 9. HEALTH CHECK
curl http://localhost:8000/api/health/

# 10. DATABASE HEALTH CHECK
curl http://localhost:8000/api/health/database
