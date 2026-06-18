from django.urls import path

from .views import (
    PropertyListView,
    PropertyDetailView,
    PropertyPredictionView
)


urlpatterns = [
    path("",PropertyListView.as_view(), name="property-list"),
    path("<int:property_id>/", PropertyDetailView.as_view(), name="property-detail"),
    path("<int:property_id>/predict/", PropertyPredictionView.as_view(), name="property-predict")
]