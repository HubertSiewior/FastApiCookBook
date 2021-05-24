from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Recipe(models.Model):
    id = fields.IntField(pk=True)
    dish_name = fields.CharField(max_length=25)
    average_time = fields.IntField()
    average_price = fields.IntField()
    difficulty = fields.CharField(
        choices=[("E", "Easy"), ("M", "Medium"), ("H", "High")],
        default="Medium",
        max_length=10
    )

    # class Meta:
    #     ordering = ["id"]


Recipe_Pydantic = pydantic_model_creator(Recipe, name="Recipe")
RecipeIn_Pydantic = pydantic_model_creator(Recipe, name="RecipeIn", exclude_readonly=True)