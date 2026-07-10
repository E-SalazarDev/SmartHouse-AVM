from rest_framework import serializers

from properties.models import Property
from properties.serializers import PropertyListSerializer

from .models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.filter(is_active=True),
        source="property",
        write_only=True,
    )

    property = PropertyListSerializer(
        read_only=True
    )

    class Meta:
        model = Favorite

        fields = (
            "id",
            "property_id",
            "property",
            "created_at",
        )

        read_only_fields = (
            "id",
            "property",
            "created_at",
        )

    def validate(self, attributes):
        request = self.context.get("request")
        property_obj = attributes.get("property")

        if request and request.user.is_authenticated:
            favorite_exists = Favorite.objects.filter(
                user=request.user,
                property=property_obj,
            ).exists()

            if favorite_exists:
                raise serializers.ValidationError(
                    {
                        "property_id": (
                            "This property is already in your favorites."
                        )
                    }
                )

        return attributes