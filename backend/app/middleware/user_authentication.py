from fastapi.security import OAuth2PasswordBearer
from backend.app.middleware.jwt_authenticate import decode_token
from fastapi import Depends, HTTPException
from backend.app.models.user import User, User_Pydantic

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = await decode_token(token)
    if payload:
        user = await User.get(id=payload.get('id'))
        return await User_Pydantic.from_tortoise_orm(user)
    else:
        raise HTTPException(status_code=401, detail="invalid username or password")
