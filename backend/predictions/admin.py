from django.contrib import admin
from .models import PredictionRequest

@admin.register(PredictionRequest)
class PredictionRequestAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "predicted_price",
        "model_name",
        "model_version",
        "created_at",
    )
    
    search_fields = (
        "model_name",
        "model_version",
    )
    
    list_filter = (
        "model_name",
        "created_at",
    )