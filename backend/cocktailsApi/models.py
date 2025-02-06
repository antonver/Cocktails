from django.db import models


class Cocktails(models.Model):
    image = models.ImageField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    instruction = models.TextField(blank=True, null=True)
    alcoholic = models.BooleanField(default=False)  # Changed to BooleanField
    ingredients = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

