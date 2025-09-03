from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.db.session import SessionLocal

app = FastAPI()

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
