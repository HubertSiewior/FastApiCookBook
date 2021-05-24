from fastapi import HTTPException
from tortoise.contrib.pydantic import pydantic_queryset_creator
import os
import datetime
from backend.app.models.recipe import Recipe_Pydantic , RecipeIn_Pydantic, Recipe
from backend.app.models.recipeStep import RecipeStep_Pydantic , RecipeStepIn_Pydantic, RecipeStep


async def create_recipeStep(recipe_id: int , recipeStep: RecipeStepIn_Pydantic):
    recipe = await Recipe.filter(id=recipe_id)
    print(recipe)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    else:
        recipeStep_obj = RecipeStep(description=recipeStep.description, time=recipeStep.time,
                                    recipe_id=recipeStep.recipe_id)
        recipeStep_obj.recipe_id = recipe_id
        await recipeStep_obj.save()
        return recipeStep_obj





async def get_all(recipe_id):
    recipeSteps = await RecipeStep.filter(recipe_id=recipe_id)
    return recipeSteps

async def get_recipeSteps_forRecipe():
    recipeSteps = await RecipeStep.filter()
    return recipeSteps

async def delete_recipeStep(recipeStep_id: int):
    recipeStep_to_delete = await RecipeStep.filter(id=recipeStep_id)
    obj = recipeStep_to_delete
    await RecipeStep.filter(id=recipeStep_id).delete()
    return obj