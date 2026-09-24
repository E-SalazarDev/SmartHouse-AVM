import logging

from django.db import transaction

from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    ChangePasswordSerializer,
    CustomTokenObtainPairSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    PasswordResetVerifySerializer,
    UpdateProfileSerializer,
    UserRegisterSerializer,
    UserSerializer,
)
from .services import (
    check_reset_code,
    consume_reset_code,
    get_active_user_by_email,
    get_password_errors,
    issue_reset_code,
    revoke_all_refresh_tokens,
    send_reset_code_email,
)
from .throttles import PasswordChangeThrottle, PasswordResetThrottle

logger = logging.getLogger(__name__)

INVALID_CODE_MESSAGE = "El código es inválido, expiró o ya fue usado."


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
    GET   /api/auth/me/  Devuelve los datos del usuario autenticado.
    PATCH /api/auth/me/  Actualiza nombre, apellido y/o nombre de usuario.
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

    def patch(self, request):
        serializer = UpdateProfileSerializer(
            request.user,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = serializer.save()

        return Response(
            UserSerializer(user).data,
            status=status.HTTP_200_OK,
        )


class ChangePasswordView(APIView):
    """
    POST /api/auth/change-password/

    Cambia la contraseña del usuario autenticado. Cierra todas sus demás
    sesiones y devuelve un par de tokens nuevo para la sesión actual.
    """

    permission_classes = [IsAuthenticated]
    throttle_classes = [PasswordChangeThrottle]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = request.user

        with transaction.atomic():
            user.set_password(serializer.validated_data["new_password"])
            user.save(update_fields=["password"])
            revoke_all_refresh_tokens(user)

        refresh_token = RefreshToken.for_user(user)

        return Response(
            {
                "message": "Contraseña actualizada correctamente.",
                "access": str(refresh_token.access_token),
                "refresh": str(refresh_token),
            },
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


class PasswordResetRequestView(APIView):
    """
    POST /api/auth/password-reset/request/

    Envía un código de 6 dígitos al correo registrado. Siempre responde
    igual exista o no la cuenta, para no revelar qué correos están
    registrados.
    """

    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [PasswordResetThrottle]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = get_active_user_by_email(
            serializer.validated_data["email"],
        )

        if user is not None:
            code = issue_reset_code(user)

            if code is not None:
                try:
                    send_reset_code_email(user, code)
                except Exception:
                    logger.exception(
                        "No se pudo enviar el código de recuperación."
                    )

        return Response(
            {
                "message": (
                    "Si el correo está registrado, recibirás un código "
                    "de recuperación en unos minutos."
                ),
            },
            status=status.HTTP_200_OK,
        )


class PasswordResetVerifyView(APIView):
    """
    POST /api/auth/password-reset/verify/

    Comprueba que el código sea válido sin consumirlo, para que el front
    pueda pasar al paso de "nueva contraseña".
    """

    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [PasswordResetThrottle]

    def post(self, request):
        serializer = PasswordResetVerifySerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = get_active_user_by_email(
            serializer.validated_data["email"],
        )

        with transaction.atomic():
            entry = (
                check_reset_code(user, serializer.validated_data["code"])
                if user is not None
                else None
            )

        if entry is None:
            return Response(
                {"code": INVALID_CODE_MESSAGE},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"valid": True},
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(APIView):
    """
    POST /api/auth/password-reset/confirm/

    Recibe correo + código + nueva contraseña. Si todo es válido cambia la
    contraseña, consume el código y cierra todas las sesiones del usuario.
    """

    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [PasswordResetThrottle]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        data = serializer.validated_data

        user = get_active_user_by_email(data["email"])

        with transaction.atomic():
            entry = (
                check_reset_code(user, data["code"])
                if user is not None
                else None
            )

            if entry is None:
                return Response(
                    {"code": INVALID_CODE_MESSAGE},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            errors = get_password_errors(data["new_password"], user=user)

            if errors:
                return Response(
                    {"new_password": errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.set_password(data["new_password"])
            user.save(update_fields=["password"])

            consume_reset_code(entry)
            revoke_all_refresh_tokens(user)

        return Response(
            {"message": "Contraseña restablecida correctamente."},
            status=status.HTTP_200_OK,
        )