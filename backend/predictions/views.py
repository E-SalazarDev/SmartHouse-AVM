from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PredictionRequest
from .ml_model import predict_house_price


class HousePricePredictionView(APIView):

    def post(self, request):

        try:
            input_data = request.data

            predicted_price = predict_house_price(
                input_data
            )

            prediction = PredictionRequest.objects.create(
                input_data=input_data,
                predicted_price=predicted_price
            )

            return Response(
                {
                    "prediction_id": prediction.id,
                    "predicted_price": round(
                        predicted_price,
                        2
                    )
                },
                status=status.HTTP_201_CREATED
            )

        except Exception as error:
            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_400_BAD_REQUEST
            )