import os
from functools import lru_cache
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv

# Load .env file
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
load_dotenv(env_path)


class Settings(BaseModel):
    app_name: str = "AI Research Agent Backend"
    environment: str = os.getenv("ENVIRONMENT", "development")

    # OpenAI API Key
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")

    # CORS Setup
    backend_host: str = os.getenv("BACKEND_HOST", "http://localhost:8000")
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
    cors_allow_origins: List[str] = [
        frontend_origin,
        "http://127.0.0.1:3000",
    ]

    # Directory for saving PPTs
    project_root: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    outputs_dir: str = os.path.join(project_root, "outputs")


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    if not settings.openai_api_key:
        print("\n[ERROR] OPENAI_API_KEY missing in .env file!\n")
    os.makedirs(settings.outputs_dir, exist_ok=True)
    return settings
