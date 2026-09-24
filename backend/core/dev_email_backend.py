from datetime import datetime
from html import escape
from pathlib import Path

from django.conf import settings
from django.core.mail.backends.base import BaseEmailBackend
from django.utils.text import slugify


class HtmlFileEmailBackend(BaseEmailBackend):
    """
    Backend SOLO para desarrollo: no envía nada por internet.

    Guarda cada correo como un archivo .html dentro de DEV_EMAIL_DIR
    (por defecto backend/sent_emails/) y en la consola imprime el destinatario,
    el asunto (que incluye el código) y la ruta del archivo para abrirlo en
    el navegador y ver el correo tal cual se vería en la bandeja.
    """

    def send_messages(self, email_messages):
        directory = Path(
            getattr(settings, "DEV_EMAIL_DIR", Path(settings.BASE_DIR) / "sent_emails")
        )
        directory.mkdir(parents=True, exist_ok=True)

        sent = 0

        for message in email_messages:
            html = next(
                (
                    content
                    for content, mimetype in getattr(message, "alternatives", [])
                    if mimetype == "text/html"
                ),
                None,
            )

            if html is None:
                html = (
                    '<pre style="font-family:monospace;white-space:pre-wrap;">'
                    f"{escape(message.body)}</pre>"
                )

            stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            subject_slug = slugify(message.subject)[:60] or "correo"
            path = directory / f"{stamp}_{subject_slug}.html"
            path.write_text(html, encoding="utf-8")

            print(
                "\n[correo de desarrollo]"
                f"\n  Para:    {', '.join(message.to)}"
                f"\n  Asunto:  {message.subject}"
                f"\n  Archivo: {path.as_uri()}\n"
            )

            sent += 1

        return sent