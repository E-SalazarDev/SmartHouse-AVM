from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Convierte un usuario de Django en una respuesta JSON segura.

    No incluye la contraseña.
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
    Valida y crea un nuevo usuario.
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

        username_exists = User.objects.filter(
            username__iexact=normalized_username
        ).exists()

        if username_exists:
            raise serializers.ValidationError(
                "Ya existe un usuario con este nombre."
            )

        return normalized_username

    def validate_email(self, value):
        normalized_email = value.strip().lower()

        email_exists = User.objects.filter(
            email__iexact=normalized_email
        ).exists()

        if email_exists:
            raise serializers.ValidationError(
                "Ya existe un usuario con este correo electrónico."
            )

        return normalized_email

    def validate(self, attributes):
        password = attributes.get("password")
        password_confirm = attributes.get("password_confirm")

        if password != password_confirm:
            raise serializers.ValidationError(
                {
                    "password_confirm": (
                        "Las contraseñas no coinciden."
                    )
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
        validated_data.pop("password_confirm")

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Personaliza la respuesta del login.

    Además de access y refresh, devuelve los datos del usuario.
    """

    def validate(self, attributes):
        token_data = super().validate(attributes)

        token_data["user"] = UserSerializer(
            self.user
        ).data

        return token_data