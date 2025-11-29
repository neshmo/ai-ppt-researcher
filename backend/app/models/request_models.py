from pydantic import BaseModel, Field

class GenerateRequest(BaseModel):
    topic: str = Field(..., description="Research topic for the AI agent")
    max_sources: int = Field(5, ge=1, le=10, description="Number of web sources to use")
    theme_config: dict = Field(default_factory=dict, description="Custom theme configuration")