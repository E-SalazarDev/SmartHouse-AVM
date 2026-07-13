from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)

from .models import PredictionRequest
from .ml_model import predict_house_price
from .serializers import (
    PredictionHistorySerializer,
    PredictionDetailSerializer,
)


class HousePricePredictionView(APIView):
    """
    Endpoint técnico.

    Recibe directamente todas las características del modelo.
    Solo un administrador debe utilizarlo.
    """

    permission_classes = [IsAdminUser]

    def post(self, request):

        try:
            input_data = request.data

            predicted_price = predict_house_price(
                input_data
            )

            prediction = PredictionRequest.objects.create(
                user=request.user,
                input_data=input_data,
                predicted_price=predicted_price,
            )

            return Response(
                {
                    "prediction_id": prediction.id,
                    "predicted_price": round(
                        predicted_price,
                        2
                    ),
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as error:
            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class PredictionHistoryView(APIView):
    """
    Usuario normal:
    Ve solamente sus valuaciones.

    Administrador:
    Puede ver todas las valuaciones.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.is_staff:
            predictions = PredictionRequest.objects.all()
        else:
            predictions = PredictionRequest.objects.filter(
                user=request.user
            )

        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        model_name = request.query_params.get("model_name")

        if min_price:
            predictions = predictions.filter(
                predicted_price__gte=min_price
            )

        if max_price:
            predictions = predictions.filter(
                predicted_price__lte=max_price
            )

        if model_name:
            predictions = predictions.filter(
                model_name=model_name
            )

        predictions = predictions.order_by(
            "-created_at"
        )

        serializer = PredictionHistorySerializer(
            predictions,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class PredictionDetailView(APIView):
    """
    Usuario normal:
    Solo puede abrir una predicción propia.

    Administrador:
    Puede abrir cualquier predicción.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, prediction_id):

        try:
            if request.user.is_staff:
                prediction = PredictionRequest.objects.get(
                    id=prediction_id
                )
            else:
                prediction = PredictionRequest.objects.get(
                    id=prediction_id,
                    user=request.user,
                )

            serializer = PredictionDetailSerializer(
                prediction
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except PredictionRequest.DoesNotExist:
            return Response(
                {
                    "error": "Prediction not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )