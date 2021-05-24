from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class RecipeStep(models.Model):
    id = fields.IntField(pk=True)
    description  = fields.CharField(max_length=25)
    time = fields.IntField()
    recipe_id = fields.IntField()

RecipeStep_Pydantic = pydantic_model_creator(RecipeStep, name="RecipeStep")
RecipeStepIn_Pydantic = pydantic_model_creator(RecipeStep, name="RecipeStepIn", exclude_readonly=True)