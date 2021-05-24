import jwt
from fastapi import HTTPException, status
from backend.app.models.user import User, User_Pydantic
from datetime import datetime, timedelta
from backend.app.settings import JWT_SECRET


async def authenticate_and_generate_token(username, password):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='invalid username or password')
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    payload = {
        'id': user_obj.id,
        'email': user_obj.email,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
    }
    token = jwt.encode(payload, JWT_SECRET)
    return {'token': token}


async def authenticate_user(username: str, password: str):
    try:
        user = await User.get(username=username)
        if not user:
            raise Exception
        if not user.verify_password(password):
            raise Exception
        return user
    except Exception:
        return False


async def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        if not payload:
            raise Exception
        return payload
    except Exception:
        return False
