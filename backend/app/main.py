from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any

from .services.training_service import (
    get_analytics,
    get_dataset_preview,
    get_dataset_summary,
    predict_student,
    train_model,
)
from .api.weather import router as weather_router

app = FastAPI(title="Student Performance Prediction API", version="1.0.0")
app.include_router(weather_router)
import os

cors_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://localhost:3000",
]

frontend_url_env = os.getenv("FRONTEND_URL")
if frontend_url_env:
    for url in frontend_url_env.split(","):
        cleaned_url = url.strip().rstrip("/")
        if cleaned_url and cleaned_url not in cors_origins:
            cors_origins.append(cleaned_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if frontend_url_env else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    gender: str | None = None
    age: float | None = None
    study_time: float | None = None
    attendance: float | None = None
    previous_score: float | None = None
    parent_education: str | None = None
    family_support: str | None = None
    internet_access: str | None = None
    extra_activities: str | None = None
    sleep_hours: float | None = None
    studyTimeHours: float | None = None
    attendancePercentage: float | None = None
    previousScore: float | None = None
    parentEducation: str | None = None
    familySupport: str | None = None
    internetAccess: str | None = None
    extraActivities: str | None = None
    sleepHours: float | None = None


@app.get("/")
def root() -> dict[str, Any]:
    return {
        "message": "Student Performance Prediction & Real-Time Weather API",
        "status": "online",
        "health": "/health",
        "docs": "/docs",
        "author": "Subhash107k"
    }


@app.get("/favicon.ico")
def favicon() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health")
def health() -> dict[str, Any]:
    return {"status": "ok"}


@app.get("/dataset")
def dataset() -> dict[str, Any]:
    try:
        return get_dataset_summary()
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/dataset/preview")
def dataset_preview(limit: int = 50, offset: int = 0) -> dict[str, Any]:
    try:
        rows = get_dataset_preview(limit=limit, offset=offset)
        return {"success": True, "rows": rows, "limit": limit, "offset": offset}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/model/status")
def model_status() -> dict[str, Any]:
    try:
        metadata = train_model()
        return {"success": True, "model_ready": True, "metadata": metadata}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/train")
def train() -> dict[str, Any]:
    try:
        metadata = train_model()
        return {"success": True, "message": "Training completed", "metadata": metadata}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/analytics")
def analytics() -> dict[str, Any]:
    try:
        return get_analytics()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.post("/predict")
def predict(payload: PredictionRequest) -> dict[str, Any]:
    try:
        payload_dict = payload.model_dump(exclude_none=True)
        return predict_student(payload_dict)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/metrics")
def metrics() -> dict[str, Any]:
    try:
        metadata = train_model()
        return {"success": True, "metrics": metadata.get("metrics", {})}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/feature-importance")
def feature_importance() -> dict[str, Any]:
    try:
        metadata = train_model()
        return {"success": True, "feature_importances": metadata.get("feature_importances", [])}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

from fastapi.responses import FileResponse
from pathlib import Path

@app.get("/download/{filename}")
def download_file(filename: str) -> Any:
    safe_files = {
        "student_performance.csv": "data/student_performance.csv",
        "train.py": "train.py",
        "predict.py": "predict.py",
        "notebook.ipynb": "Student_Predict.ipynb",
        "requirements.txt": "requirements.txt",
        "README.md": "README.md",
        "presentation.pptx": "Student_Performance_Prediction_ML_Presentation.pptx",
        "student_performance_model.pkl": "models/student_performance_model.pkl"
    }
    
    if filename not in safe_files:
        raise HTTPException(status_code=404, detail="File not found")
        
    root_dir = Path(__file__).resolve().parents[2]
    file_path = root_dir / safe_files[filename]
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found or still generating")
        
    return FileResponse(path=file_path, filename=filename)
