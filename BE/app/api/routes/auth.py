from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from typing import cast

from app.db.session import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password
from app.core.sessions import create_session, delete_session

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_pw = hash_password(user_in.password)

    # Create user
    user = User(email=user_in.email, password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"id": str(user.id), "email": user.email}

@router.post("/login")
def login(user_in: UserCreate, response: Response, db: Session = Depends(get_db)):
    #Check if user exists
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if not existing_user or not verify_password(user_in.password, cast(str, existing_user.password)):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create Session ID
    session_id = create_session(str(existing_user.id))

    # Return HTTPOnly Cookie
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        max_age=60,
        secure=False,
        samesite="lax"
    )

    return {"message": "Login successful"}

@router.get("/me")
def get_me(request: Request):
    if not hasattr(request.state, "user"):
        raise HTTPException(status_code=401, detail="Not authenticated")
    return {"id": request.state.user.id, "email": request.state.user.email}

@router.post("/logout")
def logout(response: Response, request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(status_code=401, detail="No active session")

    # Delete session from Redis
    delete_session(session_id)
    response.delete_cookie("session_id")
    return {"message": "Logged out successfully"}
