from backend.app.models.recipeStep import RecipeStep
from backend.app.models.ingredient import Ingredient
from backend.app.models.recipe import Recipe_Pydantic , RecipeIn_Pydantic, Recipe
from fastapi import HTTPException

async def create_recipe(recipe: Recipe_Pydantic):
    recipe_obj = Recipe(dish_name=recipe.dish_name, average_time=recipe.average_time,
                        average_price=recipe.average_price, difficulty=recipe.difficulty)
    await recipe_obj.save()
    return recipe_obj


async def get_all():
    recipes = await Recipe.all()
    return recipes


async def update_recipe(id: int, recipe: RecipeIn_Pydantic):
    recipe_to_update = await Recipe.filter(id=id).update(
        **{'dish_name': recipe.dish_name, 'average_time': recipe.average_time, 'average_price': recipe.average_price,
           'difficulty': recipe.difficulty})
    recipe = await Recipe.filter(id=id)
    if recipe_to_update:
        return recipe
    else:
        raise HTTPException(status_code=404, detail="Recipe not found")


async def delete_recipe(recipe_id: int):
    recipe_to_delete = await Recipe.filter(id=recipe_id)
    recipestep_to_delete = await RecipeStep.filter(recipe_id=recipe_id).delete()
    ingredient_to_delete = await Ingredient.filter(recipe_id=recipe_id).delete()
    obj = recipe_to_delete
    await Recipe.filter(id=recipe_id).delete()
    return obj

async def get_Recipe(recipe_id: int):
    recipe = await Recipe.filter(id = recipe_id)
    return recipe