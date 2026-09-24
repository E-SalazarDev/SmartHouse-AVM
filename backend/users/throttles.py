from rest_framework.throttling import SimpleRateThrottle, UserRateThrottle


class PasswordResetThrottle(SimpleRateThrottle):
    """
    Limita por IP los endpoints públicos de recuperación de contraseña
    (solicitar código, verificar código y confirmar).
    """

    scope = "password_reset"
    rate = "20/hour"

    def get_cache_key(self, request, view):
        return self.cache_format % {
            "scope": self.scope,
            "ident": self.get_ident(request),
        }


class PasswordChangeThrottle(UserRateThrottle):
    """Limita los intentos de cambio de contraseña por usuario autenticado."""

    scope = "password_change"
    rate = "10/hour"