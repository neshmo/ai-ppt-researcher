from fastapi import APIRouter, HTTPException
from app.models.request_models import GenerateRequest
from app.models.response_models import GenerateResponse

from app.services import run_research_pipeline
from app.core import get_settings

import traceback

router = APIRouter()


@router.post("/", response_model=GenerateResponse)
async def generate_report(payload: GenerateRequest):
    """
    Trigger the full AI research → insights → PPT pipeline asynchronously.
    """
    settings = get_settings()

    try:
        # MUST await!
        result = await run_research_pipeline(payload.topic, payload.max_sources, payload.theme_config)

    except Exception as e:
        print("\n\n===== PIPELINE CRASHED =====")
        traceback.print_exc()
        print("===== END ERROR =====\n\n")

        raise HTTPException(status_code=500, detail=str(e))

    ppt_filename = result["ppt_filename"]
    ppt_url = f"{settings.backend_host}/outputs/{ppt_filename}"

    return GenerateResponse(
        topic=result.get("topic"),
        message="Report generated successfully.",
        ppt_filename=ppt_filename,
        ppt_url=ppt_url,
        summary=result.get("summary"),
        key_points=result.get("key_points"),
    )
