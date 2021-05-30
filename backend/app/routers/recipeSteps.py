from fastapi import APIRouter
from backend.app.models.recipeStep import RecipeStep_Pydantic, RecipeStepIn_Pydantic, RecipeStep
from backend.app.services.recipeStepService import create_recipeStep, get_all, delete_recipeStep, \
    get_recipeSteps_forRecipe, get_recipeStep, update_recipeStep

router = APIRouter(tags=['RecipeStep'])


@router.post('/recipe/{recipe_id}/recipeStep', response_model=RecipeStep_Pydantic)
async def create(recipe_id: int, recipeStep: RecipeStepIn_Pydantic):
    return await create_recipeStep(recipe_id, recipeStep)


@router.get('/recipe/{recipe_id}/recipeStep')
async def get_recipeSteps(recipe_id: int):
    return await get_recipeSteps_forRecipe(recipe_id)


@router.get('/recipe/recipeStep/all')
async def get_all_rS():
    return await get_all()


@router.put('/recipe/recipeStep/{id}')
async def update(id: int, recistepStep: RecipeStepIn_Pydantic):
    return await update_recipeStep(id, recistepStep)

@router.delete('/recipe/recipeStep/{id}/delete')
async def delete(id: int):
    return await delete_recipeStep(id)


@router.get('/recipe/recipeStep/{id}')
async def get_specyfic_recipeStep(id: int):
    return await get_recipeStep(id)
