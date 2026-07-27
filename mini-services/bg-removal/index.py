import io
import os
import base64
import signal
import logging
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Background Removal Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/remove-bg")
async def remove_background(file: UploadFile = File(...)):
    """Remove background from uploaded image and return base64 PNG."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Lazy import to avoid loading model at startup (saves memory)
        from rembg import remove

        # Read image bytes
        input_bytes = await file.read()
        logger.info(f"Processing image: {file.filename}, size: {len(input_bytes)} bytes")

        # Remove background
        output_bytes = remove(input_bytes)
        logger.info(f"Processed image size: {len(output_bytes)} bytes")

        # Encode to base64
        result_b64 = base64.b64encode(output_bytes).decode("utf-8")

        return JSONResponse(content={
            "success": True,
            "image": f"data:image/png;base64,{result_b64}",
            "original_size": len(input_bytes),
            "processed_size": len(output_bytes),
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Background removal failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3031, log_level="info", timeout_keep_alive=300)
