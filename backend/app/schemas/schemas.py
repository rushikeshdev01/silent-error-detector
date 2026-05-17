from pydantic import BaseModel, EmailStr
from typing import Optional

# ── Auth schemas ────────────────────────────────────────
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ── Code submission schemas ──────────────────────────────
class CodeSubmit(BaseModel):
    code: str                    # The Python code from the editor
    language: str = "python"     # Extendable for future languages

class AnalysisResult(BaseModel):
    stdout: str                  # Normal program output
    stderr: str                  # Runtime errors (tracebacks, etc.)
    exit_code: int               # 0 = success, non-zero = error
    ai_feedback: str             # AI explanation of what went wrong
    submission_id: str           # ID saved in DB for history