# AI Research Agent - Backend (FastAPI)

This backend exposes an API that:
1. Searches the web for a topic.
2. Scrapes and summarizes relevant pages using OpenAI.
3. Generates a PowerPoint deck with the insights.
4. Returns a URL to download the PPT.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
