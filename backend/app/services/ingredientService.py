from fastapi import HTTPException
from tortoise.contrib.pydantic import pydantic_queryset_creator
import os
import datetime
from backend.app.models.recipe import Recipe_Pydantic, RecipeIn_Pydantic, Recipe
from backend.app.models.ingredient import IngredientIn_Pydantic, Ingredient_Pydantic, Ingredient


async def create_Ingredient(recipe_id: int, ingredient: IngredientIn_Pydantic):
    recipe = await Recipe.filter(id=recipe_id)
    print(recipe)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    else:
        ingredient_obj = Ingredient(ingredient_name=ingredient.ingredient_name, price=ingredient.price,
                                    kcal=ingredient.kcal, quantity=ingredient.quantity, if_vegan=ingredient.if_vegan,
                                    recipe_id=ingredient.recipe_id)
        ingredient_obj.recipe_id = recipe_id
        await ingredient_obj.save()
        return ingredient_obj


async def get_Ingredient_forRecipe(recipe_id):
    ingredient = await Ingredient.filter(recipe_id=recipe_id)
    return ingredient


async def get_All():
    ingredient = await Ingredient.all()
    return ingredient


async def delete_ingredient(recipeStep_id: int):
    ringredient_to_delete = await Ingredient.filter(id=recipeStep_id)
    obj = ringredient_to_delete
    await Ingredient.filter(id=recipeStep_id).delete()
    return obj


async def get_ingredient(id: int):
    ingredient = await Ingredient.filter(id=id)
    return ingredient
