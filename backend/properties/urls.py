from django.urls import path

from .views import (
    PropertyListView,
    PropertyDetailView,
    PropertyPredictionView,
    PropertyPredictionsHistoryView,
    PropertyStatsView
)


urlpatterns = [
    path("",PropertyListView.as_view(), name="property-list"),
    path("stats/", PropertyStatsView.as_view(), name="property-stats"),
    path("<int:property_id>/", PropertyDetailView.as_view(), name="property-detail"),
    path("<int:property_id>/predict/", PropertyPredictionView.as_view(), name="property-predict"),
    path("<int:property_id>/predictions/", PropertyPredictionsHistoryView.as_view(), name="property-predictions-history"),
]