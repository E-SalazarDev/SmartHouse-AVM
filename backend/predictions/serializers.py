from rest_framework import serializers

from .models import PredictionRequest


class PredictionHistorySerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M"
    )

    class Meta:
        model = PredictionRequest

        fields = (
            "id",
            "created_at",
            "predicted_price",
            "model_name",
            "model_version",
        )


class PredictionDetailSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(
        format="%d/%m/%Y %H:%M"
    )

    class Meta:
        model = PredictionRequest

        fields = (
            "id",
            "created_at",
            "input_data",
            "predicted_price",
            "model_name",
            "model_version",
        )