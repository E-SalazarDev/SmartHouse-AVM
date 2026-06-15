from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import PredictionRequest
from .ml_model import predict_house_price
from .serializers import PredictionRequestSerializer

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
            
            
class PredictionHistoryView(APIView):
    def get(self, request):
        
        predictions = PredictionRequest.objects.all().order_by("-created_at")
        
        serializers = PredictionRequestSerializer(
            predictions,
            many=True
        )
        
        return Response(
            serializers.data,
            status= status.HTTP_200_OK
        )