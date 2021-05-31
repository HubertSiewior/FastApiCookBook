from fastapi import APIRouter
from tortoise.contrib.pydantic import pydantic_queryset_creator

from backend.app.models.ingredient import IngredientIn_Pydantic , Ingredient_Pydantic, Ingredient
from backend.app.services.ingredientService import create_Ingredient, get_All, get_Ingredient_forRecipe, \
    delete_ingredient, get_ingredient, update_ingredient

router = APIRouter(tags=['Ingredient'])


@router.post('/recipe/{recipe_id}/ingredient', response_model=Ingredient_Pydantic)
async def create(recipe_id: int ,ingredient: IngredientIn_Pydantic):
    return await create_Ingredient(recipe_id, ingredient)


@router.get('/recipe/{recipe_id}/ingredient')
async def get_recipeSteps(recipe_id: int):
    return await get_Ingredient_forRecipe(recipe_id)

@router.get('/recipe/ingredient/all')
async def get_all_recipesteps():
    return await get_All()

@router.delete('/recipe/ingredient/{id}delete')
async def delete(id: int):
    return await delete_ingredient(id)

@router.get('/recipe/ingredient/{id}')
async def get_specyfic_ingredient(id: int):
    return await get_ingredient(id)

@router.put('/recipe/ingredient/{id}')
async def update(id: int, ingredient: IngredientIn_Pydantic):
    return await update_ingredient(id, ingredient)
