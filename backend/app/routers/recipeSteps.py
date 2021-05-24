from fastapi import APIRouter
from tortoise.contrib.pydantic import pydantic_queryset_creator

from backend.app.models.recipeStep import RecipeStep_Pydantic , RecipeStepIn_Pydantic, RecipeStep
from backend.app.services.recipeStepService import create_recipeStep, get_all, delete_recipeStep, get_recipeSteps_forRecipe

router = APIRouter(tags=['RecipeStep'])


@router.post('/recipe/{recipe_id}/recipeStep',response_model=RecipeStep_Pydantic)
async def create(recipe_id: int ,recipeStep: RecipeStepIn_Pydantic):
    return await create_recipeStep(recipe_id, recipeStep)


@router.get('/recipe/{recipe_id}/recipeStep')
async def get_all_recipeSteps(recipe_id: int):
    return await get_all(recipe_id)

@router.get('/recipe/recipeStep')
async def get_all_recipesteps():
    return await get_recipeSteps_forRecipe()

@router.delete('/recipe/{recipe_id}/recipeStep')
async def delete(recipe_id: int):
    return await delete_recipeStep(recipe_id)