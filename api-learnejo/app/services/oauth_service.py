import requests
from urllib.parse import urlencode
from typing import Dict, Any, Optional
from app.config.settings import settings


class GoogleOAuth:
    @staticmethod
    def get_authorization_url(redirect_uri: str) -> str:
        params = {
            'client_id': settings.GOOGLE_CLIENT_ID,
            'redirect_uri': redirect_uri,
            'scope': 'openid email profile',
            'response_type': 'code',
            'access_type': 'offline'
        }
        return f"{settings.GOOGLE_OAUTH_URL}?{urlencode(params)}"

    @staticmethod
    def get_access_token(code: str, redirect_uri: str) -> Dict[str, Any]:
        token_url = 'https://oauth2.googleapis.com/token'
        data = {
            'code': code,
            'client_id': settings.GOOGLE_CLIENT_ID,
            'client_secret': settings.GOOGLE_CLIENT_SECRET,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
        response = requests.post(token_url, data=data)
        return response.json()

    @staticmethod
    def get_user_info(access_token: str) -> Dict[str, Any]:
        user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(user_info_url, headers=headers)
        return response.json()


class GitHubOAuth:
    @staticmethod
    def get_authorization_url(redirect_uri: str) -> str:
        params = {
            'client_id': settings.GITHUB_CLIENT_ID,
            'redirect_uri': redirect_uri,
            'scope': 'user:email',
            'allow_signup': 'true'
        }
        return f"{settings.GITHUB_OAUTH_URL}?{urlencode(params)}"

    @staticmethod
    def get_access_token(code: str) -> Dict[str, Any]:
        token_url = 'https://github.com/login/oauth/access_token'
        data = {
            'code': code,
            'client_id': settings.GITHUB_CLIENT_ID,
            'client_secret': settings.GITHUB_CLIENT_SECRET
        }
        headers = {'Accept': 'application/json'}
        response = requests.post(token_url, data=data, headers=headers)
        return response.json()

    @staticmethod
    def get_user_info(access_token: str) -> Dict[str, Any]:
        user_info_url = 'https://api.github.com/user'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(user_info_url, headers=headers)
        return response.json()

    @staticmethod
    def get_user_emails(access_token: str) -> list:
        emails_url = 'https://api.github.com/user/emails'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        response = requests.get(emails_url, headers=headers)
        return response.json()


class LinkedInOAuth:
    @staticmethod
    def get_authorization_url(redirect_uri: str) -> str:
        params = {
            'response_type': 'code',
            'client_id': settings.LINKEDIN_CLIENT_ID,
            'redirect_uri': redirect_uri,
            'scope': 'openid profile email'
        }
        return f"{settings.LINKEDIN_OAUTH_URL}?{urlencode(params)}"

    @staticmethod
    def get_access_token(code: str, redirect_uri: str) -> Dict[str, Any]:
        token_url = 'https://www.linkedin.com/oauth/v2/accessToken'
        data = {
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': settings.LINKEDIN_CLIENT_ID,
            'client_secret': settings.LINKEDIN_CLIENT_SECRET,
            'redirect_uri': redirect_uri
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        response = requests.post(token_url, data=data, headers=headers)
        return response.json()

    @staticmethod
    def get_user_info(access_token: str) -> Dict[str, Any]:
        user_info_url = 'https://api.linkedin.com/v2/me'
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(user_info_url, headers=headers)
        return response.json()

    @staticmethod
    def get_user_email(access_token: str) -> Dict[str, Any]:
        email_url = 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))'
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(email_url, headers=headers)
        return response.json()

