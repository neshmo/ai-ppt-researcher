from pydantic import BaseModel, Field
from typing import List, Optional

class GenerateResponse(BaseModel):
    topic: str = Field(..., description="The topic that was researched")
    message: str = Field(..., description="Status message")
    ppt_filename: str = Field(..., description="Filename of the generated PPT")
    ppt_url: str = Field(..., description="URL where the PPT can be downloaded")
    summary: Optional[str] = Field(None, description="Short summary of the research")
    key_points: Optional[List[str]] = Field(default=None, description="Key bullet points")
