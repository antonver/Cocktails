from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers

from cocktails import settings
from cocktailsApi.views import CocktailsViewSet

router = routers.DefaultRouter()
router.register(r'cocktails', CocktailsViewSet)

urlpatterns = [path("", include(router.urls))
               ]

app_name = 'cocktailsApi'

if settings.DEBUG:  # Serve media files only in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
