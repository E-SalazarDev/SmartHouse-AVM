from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import predict_house_price


class HousePricePredictionView(APIView):
    def post(self, request):
        try:
            predicted_price = predict_house_price(request.data)
            
            return Response({
                "predicted_price": round(predicted_price, 2)
            },status= status.HTTP_200_OK)
            
        except  Exception as error:
            return Response({
                "error": str(error)
            }, status= status.HTTP_400_BAD_REQUEST)    