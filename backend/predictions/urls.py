from django.urls import path

from .views import HousePricePredictionView


urlpatterns = [
    path("predict/", HousePricePredictionView.as_view(), name="predict-house-price"),
]
