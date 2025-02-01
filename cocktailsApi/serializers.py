from django.core.files.base import ContentFile
import requests
from rest_framework import serializers
from .models import Cocktails


class CocktailsSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField(write_only=True, required=False)

    class Meta:
        model = Cocktails
        fields = "__all__"

    def create(self, validated_data):
        image_url = validated_data.pop('image_url', None)

        cocktail = Cocktails.objects.create(**validated_data)

        if image_url:
            response = requests.get(image_url)
            if response.status_code == 200:
                cocktail.image.save("downloaded.jpg", ContentFile(response.content), save=True)

        return cocktail


class PhotoUploadSerializer(serializers.Serializer):
    photo = serializers.ImageField()

