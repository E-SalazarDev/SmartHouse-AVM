from django.conf import settings
from django.db import models


class PasswordResetCode(models.Model):
    """
    Código de 6 dígitos para restablecer la contraseña.

    El código nunca se guarda en texto plano: solo su hash.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="password_reset_codes",
    )
    code_hash = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    attempts = models.PositiveSmallIntegerField(default=0)
    used_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "-created_at"]),
        ]

    def __str__(self):
        return f"PasswordResetCode(user={self.user_id}, created={self.created_at})"