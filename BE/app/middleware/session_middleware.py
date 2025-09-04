from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.core.sessions import get_user_id_from_session
from app.db.session import SessionLocal
from app.models.user import User

class SessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        print(f"Request Cookies: {request.cookies}")
        session_token = request.cookies.get("session_id")
        print(f"Session Token: {session_token}")
        if session_token:
            user_id = get_user_id_from_session(session_token)
            if user_id:
                db = SessionLocal()
                user = db.query(User).filter(User.id == user_id).first()
                db.close()
                if user:
                    request.state.user = user
        response = await call_next(request)
        return response
