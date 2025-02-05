from rest_framework import viewsets
from rest_framework.views import APIView

from cocktailsApi.models import Cocktails
from cocktailsApi.serializers import CocktailsSerializer, PhotoUploadSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

from rest_framework import viewsets, status
from rest_framework.response import Response
from cocktailsApi.models import Cocktails
from cocktailsApi.serializers import CocktailsSerializer

class CocktailsViewSet(viewsets.ModelViewSet):
    queryset = Cocktails.objects.all().order_by("id")
    serializer_class = CocktailsSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action == 'list' and self.request.query_params:
            params = self.request.query_params

            # Validate and sanitize 'nonalcoholic' filter
            nonalcoholic = params.get("nonalcoholic")
            if nonalcoholic is not None:
                nonalcoholic = nonalcoholic.lower() in ('true', '1', 'yes')
                queryset = queryset.filter(alcoholic=not nonalcoholic)

            # Validate and sanitize 'name' filter
            name = params.get("name")
            if name:
                name = name.strip()
                if name.isalnum():  # Example validation
                    queryset = queryset.filter(name__icontains=name)
                else:
                    return Cocktails.objects.none()  # Return empty queryset for invalid input

            # Validate and sanitize ingredient filters
            for key in params:
                if key.startswith("ingredient"):
                    ingredient = params.get(key).strip()
                    if ingredient.isalnum():  # Example validation
                        queryset = queryset.filter(ingredients__icontains=ingredient)
                    else:
                        return Cocktails.objects.none()  # Return empty queryset for invalid input

        return queryset.order_by("id")
