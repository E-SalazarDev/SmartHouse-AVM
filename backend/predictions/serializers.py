from rest_framework import serializers
from .models import PredictionRequest

class PredictionRequestSerializer(serializers.ModelSerializer):
    
    created_at = serializers.DateTimeField(format="%d/%m/%Y")
    
    class Meta:
        
        model = PredictionRequest
        fields = "__all__"