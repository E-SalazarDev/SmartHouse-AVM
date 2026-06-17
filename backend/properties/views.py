from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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