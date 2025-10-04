from rest_framework import serializers
from .models import Score

# Translates the Score model (model = Score) into a readable format (JSON) for the API making it usable for the frontend (React)!
class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score 
        fields = ['id', 'player', 'result', 'time']
        read_only_fields = ['id', 'time'] # 'id', 'time', and 'user' are read-only fields (cannot be modified directly via the API)