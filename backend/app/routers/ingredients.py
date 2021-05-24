from fastapi import APIRouter
from tortoise.contrib.pydantic import pydantic_queryset_creator

from backend.app.models.ingredient import IngredientIn_Pydantic , Ingredient_Pydantic, Ingredient
from backend.app.services.ingredientService import create_Ingredient, get_all, get_Ingredient_forRecipe, delete_ingredient

router = APIRouter(tags=['Ingredient'])


@router.post('/recipe/{recipe_id}/ingredient', response_model=Ingredient_Pydantic)
async def create(recipe_id: int ,ingredient: IngredientIn_Pydantic):
    return await create_Ingredient(recipe_id, ingredient)


@router.get('/recipe/{recipe_id}/ingredient')
async def get_all_recipeSteps(recipe_id: int):
    return await get_all(recipe_id)

@router.get('/recipe/ingredient')
async def get_all_recipesteps():
    return await get_Ingredient_forRecipe()

@router.delete('/recipe/{recipe_id}/ingredient')
async def delete(recipe_id: int):
    return await delete_ingredient(recipe_id)