import secrets
from datetime import timedelta
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.mail import EmailMultiAlternatives
from django.template import Context, Engine
from django.utils import timezone

from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from .models import PasswordResetCode

User = get_user_model()

APP_NAME = "SmartHouse AVM"

# Las plantillas del correo viven en users/emails/ (junto a este archivo).
# Se cargan con un motor propio, así no dependen de una carpeta "templates".
EMAILS_DIR = Path(__file__).resolve().parent / "emails"

_email_engine = Engine(
    dirs=[str(EMAILS_DIR)],
    debug=settings.DEBUG,
)

CODE_TTL = timedelta(minutes=10)
RESEND_COOLDOWN = timedelta(seconds=60)
MAX_ATTEMPTS = 5


def get_password_errors(password, user=None):
    """Corre los AUTH_PASSWORD_VALIDATORS y devuelve la lista de mensajes."""
    try:
        validate_password(password, user=user)
    except DjangoValidationError as error:
        return list(error.messages)

    return []


def get_active_user_by_email(email):
    """Devuelve el usuario activo con ese correo (sin distinguir mayúsculas)."""
    return (
        User.objects.filter(email__iexact=email.strip(), is_active=True)
        .order_by("id")
        .first()
    )


def issue_reset_code(user):
    """
    Genera un código nuevo e invalida los anteriores.

    Devuelve el código en texto plano para enviarlo por correo, o None
    si se pidió otro hace menos de RESEND_COOLDOWN.
    """
    now = timezone.now()

    last = (
        PasswordResetCode.objects.filter(user=user)
        .order_by("-created_at")
        .first()
    )

    if last and now - last.created_at < RESEND_COOLDOWN:
        return None

    PasswordResetCode.objects.filter(
        user=user,
        used_at__isnull=True,
    ).update(used_at=now)

    code = f"{secrets.randbelow(10**6):06d}"

    PasswordResetCode.objects.create(
        user=user,
        code_hash=make_password(code),
        expires_at=now + CODE_TTL,
    )

    return code


def check_reset_code(user, code):
    """
    Valida el código vigente del usuario SIN consumirlo.

    Cada intento fallido suma al contador; al llegar a MAX_ATTEMPTS el
    código queda inutilizable y hay que pedir uno nuevo.
    Devuelve la entrada (PasswordResetCode) si es válido, o None.
    Debe llamarse dentro de transaction.atomic().
    """
    entry = (
        PasswordResetCode.objects.select_for_update()
        .filter(
            user=user,
            used_at__isnull=True,
            expires_at__gt=timezone.now(),
        )
        .order_by("-created_at")
        .first()
    )

    if entry is None or entry.attempts >= MAX_ATTEMPTS:
        return None

    if not check_password(code, entry.code_hash):
        entry.attempts += 1
        entry.save(update_fields=["attempts"])
        return None

    return entry


def consume_reset_code(entry):
    entry.used_at = timezone.now()
    entry.save(update_fields=["used_at"])


def render_email_template(name, context):
    """Renderiza una plantilla de users/emails/ (por ejemplo "password_reset_code.html")."""
    template = _email_engine.get_template(name)
    return template.render(Context(context))


def send_reset_code_email(user, code):
    """
    Envía el código en un correo con versión HTML (diseño de marca) y
    versión de texto plano como respaldo.
    """
    context = {
        "name": user.first_name or user.username,
        "code": code,
        "minutes": int(CODE_TTL.total_seconds() // 60),
        "app_name": APP_NAME,
    }

    message = EmailMultiAlternatives(
        subject=f"{code} es tu código de recuperación de {APP_NAME}",
        body=render_email_template("password_reset_code.txt", context),
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email],
    )
    message.attach_alternative(
        render_email_template("password_reset_code.html", context),
        "text/html",
    )
    message.send(fail_silently=False)


def revoke_all_refresh_tokens(user):
    """Cierra todas las sesiones del usuario (blacklist de sus refresh tokens)."""
    for token in OutstandingToken.objects.filter(user=user):
        BlacklistedToken.objects.get_or_create(token=token)