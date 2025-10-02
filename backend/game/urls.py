from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScoreViewSet

# Using DefaultRouter to automatically create URL routes for the ScoreViewSet
router = DefaultRouter()
router.register(r'scores', ScoreViewSet, basename = 'score')
urlpatterns = [
    path('', include(router.urls)),
]