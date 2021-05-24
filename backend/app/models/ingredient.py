from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Ingredient(models.Model):
    id = fields.IntField(pk=True)
    ingredient_name  = fields.CharField(max_length=25)
    price = fields.IntField()
    kcal  = fields.IntField()
    quantity = fields.FloatField()
    if_vegan = fields.BooleanField()
    recipe_id = fields.IntField()


Ingredient_Pydantic = pydantic_model_creator(Ingredient, name="Ingredient")
IngredientIn_Pydantic = pydantic_model_creator(Ingredient, name="IngredientIn", exclude_readonly=True)