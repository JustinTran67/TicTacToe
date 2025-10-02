from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Score
from .serializers import ScoreSerializer

# Automatically defines the CRUD operations for the Score model and creates a viewset that can be used in the URL routing.
class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all().order_by('-time')  # Orders scores by time in descending order
    serializer_class = ScoreSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Score.objects.all().order_by('-time')

    def perform_create(self, serializer):
        serializer.save() # Saves a new score instance when a POST request is made
        
    @action(detail=False, methods=['get']) # Custom action to get the top 10 scores across all users
    def top(self, request):
        top_scores = Score.objects.all().order_by('-score')[:10]
        serializer = self.get_serializer(top_scores, many=True)
        return Response(serializer.data)
