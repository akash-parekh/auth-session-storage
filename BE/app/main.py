from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db.session import SessionLocal
from app.core.redis import redis_client
from app.api.routes import auth
from app.middleware.session_middleware import SessionMiddleware

app = FastAPI()
app.add_middleware(SessionMiddleware)
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix='/auth', tags=['auth'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health/db")
def db_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))  # raises if connection fails
    return {"status": "ok"}

@app.get("/health/redis")
def redis_health():
    try:
        redis_client.set("health_check", "ok", ex=5)
        value = redis_client.get("health_check")
        return {"status": value}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
