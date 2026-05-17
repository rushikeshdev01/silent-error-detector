from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "silent_errors"

    # JWT
    SECRET_KEY: str = "your-super-secret-key-change-this"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    
    # AI
    GEMINI_API_KEY: str = ""
    AI_MODEL: str = "gemini-2.0-flash"

    # Code execution timeout (seconds)
    EXECUTION_TIMEOUT: int = 10

    class Config:
        env_file = ".env"

settings = Settings()