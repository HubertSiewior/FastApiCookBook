from backend.app.models.user import User, User_Pydantic
from fastapi import HTTPException
from passlib.hash import bcrypt

#
# async def change_songs_count(user: User_Pydantic, count: int):
#     # user.songs_count = user.songs_count + count
#     await User.filter(id=user.id).update(**{'songs_count': user.songs_count})


async def delete_user(user: User_Pydantic):
    user_to_delete = await User.filter(id=user.id).delete()
    if user_to_delete:
        raise HTTPException(status_code=200, detail="user deleted")
    else:
        raise HTTPException(status_code=404, detail="could not find user to delete")


async def update_user_data(user_data, user: User_Pydantic):
    if "username" in user_data:
        await User.filter(id=user.id).update(**{'username': user_data["username"]})
    if "email" in user_data:
        await User.filter(id=user.id).update(**{'email': user_data["email"]})
    if "password" in user_data and "confirm password" in user_data:
        if user_data["password"] == user_data["confirm password"]:
            await User.filter(id=user.id).update(**{'password_hash': bcrypt.hash(user_data["password"])})
        else:
            raise HTTPException(status_code=422, detail="password not confirmed")
    raise HTTPException(status_code=200, detail="user updated")

