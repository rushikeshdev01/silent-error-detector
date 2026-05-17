from pydantic import BaseModel
from datetime import datetime

class SubmissionModel(BaseModel):
    """
    Represents a code submission document in MongoDB.
    Each time a user runs code, one document is saved in the submissions collection.
    """
    user_id: str                  # Links to the user who submitted
    code: str                     # The code they wrote
    stdout: str = ""              # Normal output
    stderr: str = ""              # Error output
    exit_code: int = 0            # 0 = success, non-zero = error
    ai_feedback: str = ""         # AI explanation
    created_at: datetime = datetime.utcnow()

class SubmissionResponse(BaseModel):
    """What we send back to the frontend."""
    id: str
    code: str
    stdout: str
    stderr: str
    exit_code: int
    ai_feedback: str
    created_at: datetime