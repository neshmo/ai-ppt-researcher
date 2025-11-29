from fastapi import APIRouter
from .routes.generate import router as generate_router


api_router = APIRouter()

api_router.include_router(generate_router, prefix="/generate", tags=["generate"])

