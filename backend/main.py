from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import code, auth

app = FastAPI(
    title="Silent Error Detector API",
    description="Detects logical and runtime errors in beginner code using AI",
    version="1.0.0"
)

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route groups
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(code.router, prefix="/code", tags=["Code"])

@app.get("/")
def root():
    return {"message": "Silent Error Detector API is running"}