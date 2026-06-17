from django.contrib import admin

from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "neighborhood",
        "overall_qual",
        "gr_liv_area",
        "garage_cars",
        "is_active",
        "created_at",
    )

    search_fields = (
        "title",
        "neighborhood",
        "address",
    )

    list_filter = (
        "neighborhood",
        "ms_zoning",
        "overall_qual",
        "garage_cars",
        "is_active",
        "created_at",
    )