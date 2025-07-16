# Reddit Profile Analyzer 🧠📊

An AI-powered tool that analyzes Reddit user profiles using scraped data and generates personality insights and behavioral summaries.


## 🧩 Project Structure

reddit-profile-analyzer/
├── backend/ → Django REST API to scrape Reddit and generate AI summary
├── frontend/ → React + Tailwind UI to input Reddit profile URL and display analysis


## 🚀 Features

- 🔍 Scrapes Reddit user data (posts, comments, karma, account age, etc.)
- 🤖 AI-powered summary of Reddit profile behavior and interests
- 📊 Displays top subreddits, activity breakdown, and recent posts/comments
- 🧼 Clean UI built with React, Tailwind CSS
- 🔐 Validates both `/u/username` and `/user/username` URLs

## ⚙️ Setup Instructions

### 🔁 1. Clone the Repo

```bash
git clone https://github.com/swagathreddy/RedditAnalyzer.git
cd RedditAnalyzer
🖥️ Backend (Django + REST API)
🔧 Setup

bash
cd backend
pip install -r requirements.txt

🚀 Run Django Server
bash
python manage.py runserver
By default, the backend will run at:
http://localhost:8000

🌐 Frontend (React + Tailwind)
🔧 Setup
bash
cd frontend
npm install

🚀 Run React App
bash
npm run dev
The frontend will run at:
http://localhost:5173 (or the port shown in terminal)

✅ Example Reddit URLs to Test
https://reddit.com/u/spez
https://reddit.com/user/AutoModerator


📦 Technologies Used
Frontend: React, TypeScript, Tailwind CSS
Backend: Django, Django REST Framework
AI: Custom summarization using AIService logic
Web Scraping: Reddit user data via RedditScraper


👨‍💻 Developed by
Swagath Reddy
