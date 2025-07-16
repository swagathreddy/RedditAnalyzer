# Simple Reddit Scraper Backend Setup (No Database)

## Project Structure
```
reddit-analyzer/
├── frontend/          # Your current React app
└── backend/
    ├── reddit_analyzer/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── api/
    │   ├── __init__.py
    │   ├── views.py
    │   └── urls.py
    ├── scraper/
    │   ├── __init__.py
    │   ├── reddit_scraper.py
    │   └── ai_service.py
    ├── requirements.txt
    ├── manage.py
    └── .env
```

## Setup Instructions

### 1. Create Django Project
```bash
mkdir backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers praw requests python-decouple

# Create Django project
django-admin startproject reddit_analyzer .

# Create API app
python manage.py startapp api
```

### 2. Get Reddit API Credentials
1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" → Choose "script"
3. Note client ID and secret

### 3. Get OpenRouter API Key
1. Go to https://openrouter.ai/
2. Sign up and get API key

## Files to Create: