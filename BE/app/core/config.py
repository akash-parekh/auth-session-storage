from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "auth_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: str = "5432"

    class Config:
        env_file = ".env"

settings = Settings()
