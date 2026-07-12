from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    CustomTokenObtainPairSerializer,
    UserRegisterSerializer,
    UserSerializer,
)


class UserRegisterView(APIView):
    """
    POST /api/auth/register/

    Registra un usuario y devuelve sus tokens JWT.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = serializer.save()

        refresh_token = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Usuario registrado correctamente.",
                "access": str(refresh_token.access_token),
                "refresh": str(refresh_token),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    POST /api/auth/login/

    Valida las credenciales del usuario y devuelve:
    access token, refresh token y datos del usuario.
    """

    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


class CurrentUserView(APIView):
    """
    GET /api/auth/me/

    Devuelve los datos del usuario autenticado mediante JWT.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(
            request.user,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
    """
    POST /api/auth/logout/

    Invalida el refresh token enviado por el usuario.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {
                    "refresh": (
                        "Debes enviar el refresh token."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {
                    "message": (
                        "Sesión cerrada correctamente."
                    ),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError:
            return Response(
                {
                    "refresh": (
                        "El refresh token es inválido, "
                        "expiró o ya fue revocado."
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )