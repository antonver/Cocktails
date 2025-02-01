from rest_framework import viewsets
from rest_framework.views import APIView

from cocktailsApi.models import Cocktails
from cocktailsApi.serializers import CocktailsSerializer, PhotoUploadSerializer
from RockPaperScissorsClassifier import RockPaperScissorsClassifier
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

class CocktailsViewSet(viewsets.ModelViewSet):
    queryset = Cocktails.objects.all().order_by("id")  # Base ordered queryset
    serializer_class = CocktailsSerializer

    def get_queryset(self):
        queryset = self.queryset  # Start with the ordered base queryset

        if self.action == 'list' and self.request.query_params:
            params = self.request.query_params

            # Handle 'nonalcoholic' filter (correctly map to the 'alcoholic' field)
            nonalcoholic = params.get("nonalcoholic")
            if nonalcoholic is not None:
                # Convert query param to boolean (e.g., "true" -> True)
                queryset = queryset.filter(alcoholic=False)

            # Handle 'name' filter
            name = params.get("name")
            if name:
                queryset = queryset.filter(name__icontains=name.strip())

            # Handle other ingredient filters (e.g., ?ingredient1=lemon&ingredient2=lime)
            for key in params:
                if key.startswith("ingredient"):
                    ingredient = params.get(key).strip()
                    queryset = queryset.filter(ingredients__icontains=ingredient)
        # 🔥 Reapply ordering after all filters to ensure pagination stability
        return queryset.order_by("id")


# API View to handle photo upload
class PhotoUploadView(APIView):
    permission_classes = []
    classifier = RockPaperScissorsClassifier('my_model3.keras')

    def post(self, request, *args, **kwargs):
        serializer = PhotoUploadSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the uploaded image from memory
            uploaded_file = serializer.validated_data['photo']

            # Create a file-like object from the uploaded file
            image_stream = uploaded_file.open()

            # Make prediction directly from memory
            prediction = self.classifier.predict(image_stream)

            # Close the file stream
            image_stream.close()

            return Response({
                'prediction': prediction['class'],
                'confidence': prediction['confidence'],
                'message': 'Success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e),
                'message': 'Prediction failed'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
