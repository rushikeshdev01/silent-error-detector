from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from app.db.session import users_collection
from app.models.user import UserModel
from app.schemas.schemas import UserCreate, Token
from app.core.security import create_access_token
from datetime import datetime

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

@router.post("/register", response_model=Token)
async def register(payload: UserCreate):
    """Create a new user and return a JWT immediately."""

    # Check if email already exists
    existing = await users_collection.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user document
    user = UserModel(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        created_at=datetime.utcnow()
    )

    # Save to MongoDB
    result = await users_collection.insert_one(user.dict())

    # Use the MongoDB generated ID as the token subject
    token = create_access_token({"sub": str(result.inserted_id)})
    return Token(access_token=token)

@router.post("/login", response_model=Token)
async def login(payload: UserCreate):
    """Verify credentials and return a JWT."""

    # Find user by email
    user = await users_collection.find_one({"email": payload.email})
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    token = create_access_token({"sub": str(user["_id"])})
    return Token(access_token=token)