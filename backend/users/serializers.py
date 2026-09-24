from django.contrib.auth import (
    authenticate,
    get_user_model,
)
from django.contrib.auth.password_validation import (
    validate_password,
)
from django.contrib.auth.validators import (
    UnicodeUsernameValidator,
)

from rest_framework import serializers

from rest_framework_simplejwt.exceptions import (
    AuthenticationFailed,
)
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
)

from .services import get_password_errors


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Convierte un usuario de Django en una respuesta JSON segura.

    """

    role = serializers.SerializerMethodField()

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "is_staff",
            "is_superuser",
        )

        read_only_fields = fields

    def get_role(self, user):
        if user.is_superuser:
            return "superadmin"

        if user.is_staff:
            return "admin"

        return "user"


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    Valida y crea un usuario nuevo.
    """

    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    password_confirm = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password_confirm",
        )

        read_only_fields = (
            "id",
        )

        extra_kwargs = {
            "username": {
                "required": True,
                "allow_blank": False,
            },
            "email": {
                "required": True,
                "allow_blank": False,
            },
            "first_name": {
                "required": True,
                "allow_blank": False,
            },
            "last_name": {
                "required": True,
                "allow_blank": False,
            },
        }

    def validate_username(self, value):
        normalized_username = value.strip()

        if not normalized_username:
            raise serializers.ValidationError(
                "El nombre de usuario es obligatorio."
            )

        username_exists = User.objects.filter(
            username__iexact=normalized_username,
        ).exists()

        if username_exists:
            raise serializers.ValidationError(
                "Ya existe un usuario con este nombre."
            )

        return normalized_username

    def validate_email(self, value):
        normalized_email = value.strip().lower()

        if not normalized_email:
            raise serializers.ValidationError(
                "El correo electrónico es obligatorio."
            )

        email_exists = User.objects.filter(
            email__iexact=normalized_email,
        ).exists()

        if email_exists:
            raise serializers.ValidationError(
                "Ya existe un usuario con este correo electrónico."
            )

        return normalized_email

    def validate(self, attributes):
        password = attributes.get("password")
        password_confirm = attributes.get(
            "password_confirm"
        )

        if password != password_confirm:
            raise serializers.ValidationError(
                {
                    "password_confirm": (
                        "Las contraseñas no coinciden."
                    ),
                }
            )

        temporary_user = User(
            username=attributes.get("username"),
            email=attributes.get("email"),
            first_name=attributes.get("first_name"),
            last_name=attributes.get("last_name"),
        )

        validate_password(
            password,
            user=temporary_user,
        )

        return attributes

    def create(self, validated_data):
        validated_data.pop(
            "password_confirm"
        )

        password = validated_data.pop(
            "password"
        )

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        return user


class UpdateProfileSerializer(serializers.ModelSerializer):
    """
    Actualiza nombre, apellido y nombre de usuario del usuario autenticado.

    El correo no se edita aquí: cambiarlo requiere verificar el nuevo
    correo antes de aplicarlo.
    """

    username = serializers.CharField(
        max_length=150,
        required=False,
        allow_blank=False,
        validators=[UnicodeUsernameValidator()],
    )

    first_name = serializers.CharField(
        max_length=150,
        required=False,
        allow_blank=False,
    )

    last_name = serializers.CharField(
        max_length=150,
        required=False,
        allow_blank=False,
    )

    class Meta:
        model = User

        fields = (
            "username",
            "first_name",
            "last_name",
        )

    def validate_username(self, value):
        username_exists = (
            User.objects.filter(
                username__iexact=value,
            )
            .exclude(
                pk=self.instance.pk,
            )
            .exists()
        )

        if username_exists:
            raise serializers.ValidationError(
                "Ya existe un usuario con este nombre."
            )

        return value


class ChangePasswordSerializer(serializers.Serializer):
    """
    Valida el cambio de contraseña de un usuario autenticado.
    """

    current_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    new_password_confirm = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate_current_password(self, value):
        user = self.context["request"].user

        if not user.check_password(value):
            raise serializers.ValidationError(
                "La contraseña actual es incorrecta."
            )

        return value

    def validate(self, attributes):
        user = self.context["request"].user

        if (
            attributes["new_password"]
            != attributes["new_password_confirm"]
        ):
            raise serializers.ValidationError(
                {
                    "new_password_confirm": (
                        "Las contraseñas no coinciden."
                    ),
                }
            )

        if (
            attributes["new_password"]
            == attributes["current_password"]
        ):
            raise serializers.ValidationError(
                {
                    "new_password": (
                        "La nueva contraseña debe ser "
                        "diferente a la actual."
                    ),
                }
            )

        errors = get_password_errors(
            attributes["new_password"],
            user=user,
        )

        if errors:
            raise serializers.ValidationError(
                {
                    "new_password": errors,
                }
            )

        return attributes


class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Correo al que se enviará el código de recuperación.
    """

    email = serializers.EmailField()


class PasswordResetVerifySerializer(serializers.Serializer):
    """
    Correo y código de 6 dígitos recibido por correo.
    """

    email = serializers.EmailField()

    code = serializers.RegexField(
        regex=r"^\d{6}$",
        error_messages={
            "invalid": "El código debe tener 6 dígitos.",
        },
    )


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Correo, código y nueva contraseña.

    La fortaleza de la contraseña se valida en la vista, después de
    comprobar el código, para no quemar el código por una contraseña débil.
    """

    email = serializers.EmailField()

    code = serializers.RegexField(
        regex=r"^\d{6}$",
        error_messages={
            "invalid": "El código debe tener 6 dígitos.",
        },
    )

    new_password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    new_password_confirm = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )

    def validate(self, attributes):
        if (
            attributes["new_password"]
            != attributes["new_password_confirm"]
        ):
            raise serializers.ValidationError(
                {
                    "new_password_confirm": (
                        "Las contraseñas no coinciden."
                    ),
                }
            )

        return attributes


class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):
    """
    Permite iniciar sesión mediante email y contraseña.
    """

    username_field = "email"

    def validate(self, attributes):
        email = attributes.get(
            "email",
            "",
        ).strip().lower()

        password = attributes.get(
            "password",
            "",
        )

        if not email or not password:
            raise AuthenticationFailed(
                "Debes ingresar tu correo electrónico y contraseña.",
                code="missing_credentials",
            )

        try:
            user_by_email = User.objects.get(
                email__iexact=email,
            )

        except User.DoesNotExist:
            raise AuthenticationFailed(
                "El correo o la contraseña son incorrectos.",
                code="invalid_credentials",
            )

        authenticated_user = authenticate(
            request=self.context.get("request"),
            username=user_by_email.username,
            password=password,
        )

        if authenticated_user is None:
            raise AuthenticationFailed(
                "El correo o la contraseña son incorrectos.",
                code="invalid_credentials",
            )

        if not authenticated_user.is_active:
            raise AuthenticationFailed(
                "Esta cuenta se encuentra desactivada.",
                code="inactive_user",
            )

        self.user = authenticated_user

        refresh_token = self.get_token(
            authenticated_user
        )

        return {
            "refresh": str(refresh_token),
            "access": str(
                refresh_token.access_token
            ),
            "user": UserSerializer(
                authenticated_user
            ).data,
        }