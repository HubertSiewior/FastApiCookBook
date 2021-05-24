from fastapi import APIRouter
from tortoise.contrib.pydantic import pydantic_queryset_creator

from backend.app.models.recipe import Recipe_Pydantic , RecipeIn_Pydantic, Recipe
from backend.app.services.recipeService import create_recipe, get_all, delete_recipe

router = APIRouter(tags=['Recipe'])


@router.post('/recipe/',response_model=Recipe_Pydantic)
async def create(recipe: RecipeIn_Pydantic):
    return await create_recipe(recipe)


@router.get('/recipe/')
async def get_all_recipes():
    return await get_all()



@router.delete('/recipe/')
async def delete(recipe_id: int):
    return await delete_recipe(recipe_id)