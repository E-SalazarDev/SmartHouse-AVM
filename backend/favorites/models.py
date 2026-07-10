from django.conf import settings
from django.db import models

from properties.models import Property


class Favorite(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="favorites"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "property"],
                name="unique_user_property_favorite"
            )
        ]

        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.property.title}"