from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services import run_research_pipeline_stream

router = APIRouter()


@router.websocket("/ws/progress")
async def websocket_progress(ws: WebSocket):
    await ws.accept()

    try:
        # 1) Receive initial config from frontend
        data = await ws.receive_json()
        topic = data.get("topic")
        max_sources = data.get("max_sources", 5)

        # 2) Stream progress events async
        async for event in run_research_pipeline_stream(topic, max_sources):
            await ws.send_json(event)

    except WebSocketDisconnect:
        print("❌ WebSocket disconnected")

    except Exception as e:
        await ws.send_json({"error": str(e)})

    finally:
        await ws.close()
