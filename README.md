# 📊 AI PPT Researcher
Generate a full consulting-grade research report + PowerPoint deck using AI. A modern full-stack project built with FastAPI, React, OpenAI, and a multi-agent LLM pipeline.

## 🚀 Features
- Multi-agent AI research pipeline
- Auto-generated 15–20 slide PPT deck
- AI-generated charts
- Theme customization
- Live WebSocket progress streaming
- Modern React UI with glassmorphism and animations

## 🏗️ Tech Stack
Backend: FastAPI, OpenAI, Python-PPTX, Matplotlib  
Frontend: React, TailwindCSS, WebSockets  

## 📦 Installation
Clone:
git clone https://github.com/neshmo/ai-ppt-researcher.git

### Backend
cd backend  
python -m venv env  
source env/bin/activate (Windows: env\Scripts\activate)  
pip install -r requirements.txt  
Add .env with OPENAI_API_KEY  
uvicorn app.main:app --reload

### Frontend
cd frontend  
npm install  
npm start

## 🛡️ Security
- .env is ignored
- env folder is ignored

## ⭐ Support
Star the repo if you like it!


cd frontend  
npm install  
npm start
