from rest_framework import serializers

from properties.models import Property
from properties.serializers import PropertyListSerializer

from .models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
    """
    Serializer para listar y crear favoritos.

    En lectura:
    devuelve los datos resumidos de la propiedad.

    En escritura:
    recibe únicamente property_id.
    """

    property = PropertyListSerializer(
        read_only=True,
    )

    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.filter(
            is_active=True,
        ),
        source="property",
        write_only=True,
    )

    class Meta:
        model = Favorite

        fields = (
            "id",
            "property",
            "property_id",
            "created_at",
        )

        read_only_fields = (
            "id",
            "property",
            "created_at",
        )

    def validate(self, attributes):
        """
        Impide que un usuario guarde dos veces
        la misma propiedad.
        """

        request = self.context.get("request")
        property_obj = attributes.get("property")

        if request is None:
            raise serializers.ValidationError(
                {
                    "detail": (
                        "No se pudo identificar la petición."
                    )
                }
            )

        if not request.user.is_authenticated:
            raise serializers.ValidationError(
                {
                    "detail": (
                        "Debes iniciar sesión para guardar favoritos."
                    )
                }
            )

        if property_obj is None:
            raise serializers.ValidationError(
                {
                    "property_id": (
                        "Debes seleccionar una propiedad válida."
                    )
                }
            )

        favorite_exists = Favorite.objects.filter(
            user=request.user,
            property=property_obj,
        ).exists()

        if favorite_exists:
            raise serializers.ValidationError(
                {
                    "property_id": (
                        "Esta propiedad ya está guardada "
                        "en tus favoritos."
                    )
                }
            )

        return attributes