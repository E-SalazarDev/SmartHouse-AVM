from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from predictions.models import PredictionRequest
from predictions.ml_model import predict_house_price

from .models import Property
from .serializers import (
    PropertyListSerializer,
    PropertyDetailSerializer,
)


class PropertyListView(APIView):

    def get(self, request):

        properties = Property.objects.filter(
            is_active=True
        ).order_by("-created_at")

        serializer = PropertyListSerializer(
            properties,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class PropertyDetailView(APIView):

    def get(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            serializer = PropertyDetailSerializer(
                property_obj
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
class PropertyPredictionView(APIView):

    def post(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            if not property_obj.model_input_data:
                return Response(
                    {
                        "error": "This property does not have model input data."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            predicted_price = predict_house_price(
                property_obj.model_input_data
            )

            prediction = PredictionRequest.objects.create(
                property=property_obj,
                input_data=property_obj.model_input_data,
                predicted_price=predicted_price
            )

            return Response(
                {
                    "property_id": property_obj.id,
                    "prediction_id": prediction.id,
                    "predicted_price": round(predicted_price, 2)
                },
                status=status.HTTP_201_CREATED
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )