# SmartHouse AVM - Backend

Backend construido con Django y Django REST Framework para gestionar propiedades inmobiliarias, ejecutar predicciones de precio usando un modelo de IA y guardar el historial de valuaciones. Incluye autenticación con JWT, favoritos por usuario y recuperación de contraseña por correo.

## Tecnologías

- Python
- Django
- Django REST Framework
- PostgreSQL (con Docker Compose) y psycopg
- SimpleJWT (autenticación con JWT)
- Scikit-Learn
- Joblib
- python-dotenv
- CORS Headers

## Módulos principales

```
backend/
├── core/          # Configuración, URLs y backend de correo para desarrollo
├── users/         # Autenticación, perfil y recuperación de contraseña
├── properties/    # Propiedades
├── predictions/   # Predicciones del modelo IA
├── favorites/     # Propiedades favoritas por usuario
├── scripts/       # Utilidades (descarga de imágenes)
├── media/         # Imágenes de casas (media/houses)
└── sent_emails/   # Correos guardados en desarrollo (no se versiona)
```

## Puesta en marcha

Requisitos: Python, Docker Desktop.

1. Crea y activa el entorno virtual e instala las dependencias:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Crea `backend/.env` con tus variables (ver [Variables de entorno](#variables-de-entorno)). El archivo no se sube a git.

3. Levanta PostgreSQL desde la raíz del proyecto:

```powershell
docker compose up -d db
```

4. Crea las tablas:

```powershell
python manage.py migrate
```

5. Descarga las imágenes de las casas y carga las propiedades demo (ver [Datos demo](#datos-demo)):

```powershell
python scripts/download_house_images.py
python manage.py seed_properties
```

6. (Opcional) Crea un superusuario y levanta el servidor:

```powershell
python manage.py createsuperuser
python manage.py runserver
```

## Variables de entorno

Todas van en `backend/.env`. Ninguna es obligatoria en desarrollo, salvo `PEXELS_API_KEY` para descargar imágenes.

| Variable | Para qué sirve | Por defecto |
|---|---|---|
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` | Credenciales de PostgreSQL | `smarthouse` |
| `POSTGRES_HOST` / `POSTGRES_PORT` | Dónde corre PostgreSQL | `localhost` / `5432` |
| `PEXELS_API_KEY` | Descargar imágenes de casas (API gratuita de Pexels) | — |
| `EMAIL_HOST` / `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` | Envío real de correos por SMTP | — |
| `DEFAULT_FROM_EMAIL` | Remitente de los correos | `SmartHouse AVM <no-reply@smarthouse.local>` |

## Apps

### users

Gestiona cuentas y sesiones. El inicio de sesión es con correo y contraseña. Funciones:

- Registrar usuarios.
- Iniciar y cerrar sesión con JWT (refresh tokens con blacklist).
- Consultar y actualizar el perfil (nombre, apellido y nombre de usuario).
- Cambiar la contraseña.
- Recuperar la contraseña con un código de 6 dígitos enviado al correo.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/register/` | Registra un usuario y devuelve sus tokens |
| POST | `/api/auth/login/` | Inicia sesión con correo y contraseña |
| POST | `/api/auth/refresh/` | Renueva el access token |
| POST | `/api/auth/verify/` | Verifica un token |
| GET | `/api/auth/me/` | Datos del usuario autenticado |
| PATCH | `/api/auth/me/` | Actualiza nombre, apellido y/o nombre de usuario |
| POST | `/api/auth/change-password/` | Cambia la contraseña y cierra las demás sesiones |
| POST | `/api/auth/logout/` | Invalida el refresh token |
| POST | `/api/auth/password-reset/request/` | Envía el código de recuperación al correo |
| POST | `/api/auth/password-reset/verify/` | Comprueba el código sin consumirlo |
| POST | `/api/auth/password-reset/confirm/` | Restablece la contraseña con el código |

El código de recuperación vence a los 10 minutos, es de un solo uso y se bloquea tras 5 intentos fallidos. Pedir otro código exige esperar 60 segundos.

### predictions

Gestiona predicciones realizadas por el modelo IA. Funciones:

- Ejecutar predicción desde JSON completo.
- Guardar predicción en base de datos.
- Consultar historial.
- Consultar detalle de predicción.
- Filtrar historial.

### properties

Gestiona propiedades registradas en el sistema. Funciones:

- Crear propiedades.
- Listar propiedades activas.
- Ver detalle de propiedad.
- Actualizar propiedad.
- Desactivar propiedad.
- Predecir precio desde una propiedad guardada.
- Consultar historial de predicciones por propiedad.
- Consultar estadísticas para dashboard.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/properties/` | Lista propiedades activas |
| POST | `/api/properties/` | Crea una propiedad |
| GET | `/api/properties/<property_id>/` | Detalle de una propiedad |
| PUT | `/api/properties/<property_id>/` | Actualiza una propiedad |
| DELETE | `/api/properties/<property_id>/` | Desactiva una propiedad |
| POST | `/api/properties/<property_id>/predict/` | Predice precio desde una propiedad |
| GET | `/api/properties/<property_id>/predictions/` | Historial de predicciones de una propiedad |
| GET | `/api/properties/stats/` | Estadísticas para dashboard |

### favorites

Permite guardar propiedades como favoritas y consultarlas por usuario (`/api/favorites/`).

## Datos demo

Las casas de ejemplo requieren dos pasos. Corre primero las imágenes y luego el seed.

**1. Imágenes.** El script descarga fotos de la API de Pexels (necesita `PEXELS_API_KEY` en `backend/.env`) y las guarda en `media/houses/`, separadas por categoría:

| Carpeta | Tipo de casa | Cantidad |
|---|---|---|
| `media/houses/low` | Casas pequeñas y sencillas | 80 |
| `media/houses/medium` | Casas familiares suburbanas | 120 |
| `media/houses/high` | Casas modernas | 120 |
| `media/houses/luxury` | Mansiones | 80 |

```powershell
python scripts/download_house_images.py
```

Si un archivo ya existe se omite, así que puedes volver a correrlo sin descargar todo otra vez. Las imágenes son archivos en disco: no dependen de la base de datos, y cambiar de base no las afecta.

**2. Propiedades.** Carga las propiedades demo en la base de datos:

```powershell
python manage.py seed_properties
```

## Correo

La recuperación de contraseña envía un correo con un código de 6 dígitos. Las plantillas están en `users/emails/`.

- **Desarrollo (por defecto):** no se envía nada. Cada correo se guarda como `.html` en `sent_emails/` y la consola imprime el asunto (que incluye el código) y la ruta del archivo para abrirlo en el navegador.
- **Envío real:** define `EMAIL_HOST_USER` y `EMAIL_HOST_PASSWORD` en `backend/.env`. Con [Resend](https://resend.com) (plan gratuito) los valores son:

```
EMAIL_HOST=smtp.resend.com
EMAIL_HOST_USER=resend
EMAIL_HOST_PASSWORD=<tu API key>
DEFAULT_FROM_EMAIL=SmartHouse AVM <onboarding@resend.dev>
```

Sin verificar un dominio propio, Resend solo entrega al correo con el que se creó la cuenta.

## Docker

`docker-compose.yml` (en la raíz del proyecto) define:

- `db`: PostgreSQL 17 con un volumen (`postgres_data`) para que los datos persistan.
- `mlflow`: servidor de MLflow, opcional. No arranca por defecto; se levanta con `docker compose --profile mlflow up -d mlflow`.

Para apagar la base sin borrar los datos: `docker compose stop db`. Para borrarlos también: `docker compose down -v`.