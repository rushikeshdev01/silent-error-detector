from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserModel(BaseModel):
    """
    Represents a user document in MongoDB.
    No SQL tables — just a Python class that maps to a MongoDB document.
    """
    email: EmailStr
    hashed_password: str
    created_at: datetime = datetime.utcnow()

class UserResponse(BaseModel):
    """What we send back when someone asks for user info."""
    id: str
    email: EmailStr
    created_at: datetime