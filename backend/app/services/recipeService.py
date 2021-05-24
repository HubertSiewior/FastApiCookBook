from fastapi import HTTPException
from tortoise.contrib.pydantic import pydantic_queryset_creator
import os
import datetime
from backend.app.models.recipeStep import RecipeStep
from backend.app.models.ingredient import Ingredient
from backend.app.models.recipe import Recipe_Pydantic , RecipeIn_Pydantic, Recipe


async def create_recipe(recipe: Recipe_Pydantic):
    recipe_obj = Recipe(dish_name=recipe.dish_name, average_time=recipe.average_time,
                        average_price=recipe.average_price, difficulty=recipe.difficulty)
    await recipe_obj.save()
    return recipe_obj


async def get_all():
    recipes = await Recipe.all()
    return recipes
    # Recipe_List = pydantic_queryset_creator(Recipe)
    # return await Recipe_List.from_queryset(Recipe.all())

async def delete_recipe(recipe_id: int):
    recipe_to_delete = await Recipe.filter(id=recipe_id)
    recipestep_to_delete = await RecipeStep.filter(recipe_id=recipe_id).delete()
    ingredient_to_delete = await Ingredient.filter(recipe_id=recipe_id).delete()
    obj = recipe_to_delete
    await Recipe.filter(id=recipe_id).delete()
    return obj