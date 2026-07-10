from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Favorite
from .serializers import FavoriteSerializer


class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Favorite.objects
            .filter(user=self.request.user)
            .select_related("property")
            .order_by("-created_at")
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class FavoriteDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(
            user=self.request.user
        )

    def destroy(self, request, *args, **kwargs):
        favorite = self.get_object()
        favorite.delete()

        return Response(
            {
                "message": "Favorite removed successfully"
            },
            status=status.HTTP_200_OK
        )