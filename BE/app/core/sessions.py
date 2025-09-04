import uuid
from datetime import timedelta
from typing import cast

from app.core.redis import redis_client

SESSION_EXPIRE_SECONDS = 60

def create_session(user_id: str) -> str:
    session_id = str(uuid.uuid4())
    print(f"session_id : {session_id}, user_id : {user_id}")
    redis_client.set(session_id, user_id, ex=SESSION_EXPIRE_SECONDS)
    return session_id

def get_user_id_from_session(session_id: str) -> str | None:
    return cast(str | None , redis_client.get(session_id))

def delete_session(session_id: str) -> None:
    redis_client.delete(session_id)
