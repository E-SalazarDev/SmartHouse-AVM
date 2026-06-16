from django.urls import path
from .views import (HousePricePredictionView, PredictionHistoryView, PredictionDetailView)


urlpatterns = [
    path("predict/", HousePricePredictionView.as_view(), name="predict-house-price"),
    path("history/",  PredictionHistoryView.as_view(), name="prediction-history"),
    path("history/<int:prediction_id>/",PredictionDetailView.as_view(), name="prediction-detail"
    ),
]
