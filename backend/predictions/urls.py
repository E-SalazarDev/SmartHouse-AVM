from django.urls import path
from .views import (HousePricePredictionView, PredictionHistoryView,)


urlpatterns = [
    path("predict/", HousePricePredictionView.as_view(), name="predict-house-price"),
    path("history/",  PredictionHistoryView.as_view(), name="prediction-history"),
]
