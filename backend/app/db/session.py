from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# Local MongoDB doesn't need SSL
client = AsyncIOMotorClient(
    settings.MONGODB_URL,
    tls=False,
    uuidRepresentation="standard"
)

db = client[settings.DB_NAME]

users_collection = db["users"]
submissions_collection = db["submissions"]

async def get_database():
    return db