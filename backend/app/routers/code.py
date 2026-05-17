from fastapi import APIRouter, Depends, HTTPException
from app.db.session import submissions_collection, users_collection
from app.core.security import get_current_user
from app.models.submission import SubmissionModel
from app.schemas.schemas import CodeSubmit, AnalysisResult
from app.services.executor import execute_code
from app.services.ai_client import analyze_code
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/submit", response_model=AnalysisResult)
async def submit_code(
    payload: CodeSubmit,
    current_user: dict = Depends(get_current_user),
):
    """
    Main endpoint — the full pipeline:
    1. Receive code from the Monaco editor
    2. Run it in a subprocess
    3. Send code + output to AI for analysis
    4. Save everything to MongoDB
    5. Return results to the frontend
    """

    # Step 1: Execute the code
    execution = execute_code(payload.code)

    # Step 2: Ask AI to analyze what happened
    ai_feedback = analyze_code(
        code=payload.code,
        stdout=execution["stdout"],
        stderr=execution["stderr"],
        exit_code=execution["exit_code"],
    )

    # Step 3: Save submission to MongoDB
    submission = SubmissionModel(
        user_id=str(current_user["_id"]),
        code=payload.code,
        stdout=execution["stdout"],
        stderr=execution["stderr"],
        exit_code=execution["exit_code"],
        ai_feedback=ai_feedback,
        created_at=datetime.utcnow()
    )

    result = await submissions_collection.insert_one(submission.dict())

    # Step 4: Return everything to the frontend
    return AnalysisResult(
        stdout=execution["stdout"],
        stderr=execution["stderr"],
        exit_code=execution["exit_code"],
        ai_feedback=ai_feedback,
        submission_id=str(result.inserted_id),
    )

@router.get("/history")
async def get_history(
    current_user: dict = Depends(get_current_user),
):
    """Return the last 10 submissions for the logged-in user."""
    cursor = submissions_collection.find(
        {"user_id": str(current_user["_id"])}
    ).sort("created_at", -1).limit(10)

    submissions = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        submissions.append(doc)

    return submissions