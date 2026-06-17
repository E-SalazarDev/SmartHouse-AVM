from rest_framework import serializers
from  .models import Property

class PropertyListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Property

        fields = (
            "id",
            "title",
            "cover_image_url",
            "neighborhood",
            "ms_zoning",
            "overall_qual",
            "gr_liv_area",
            "garage_cars",
            "full_bath",
            "bedroom_abv_gr",
            "year_built",
            "is_active",
        )
    
class PropertyDetailSerializer(serializers.ModelSerializer):
            
    created_at = serializers.DateTimeField(format="%d/%m/%Y")
        
    update_at = serializers.DateTimeField(format="%d/%m/%Y")
        
    class Meta:
        model: Property
        fields ="__all__"

        
        