# SmartHouse AVM - Backend

Backend construido con Django y Django REST Framework para gestionar propiedades inmobiliarias, ejecutar predicciones de precio usando un modelo de IA y guardar el historial de valuaciones.

## Tecnologías

- Python
- Django
- Django REST Framework
- SQLite
- Scikit-Learn
- Joblib
- CORS Headers

## Módulos principales

```txt
backend/
├── core/
├── predictions/
└── properties/
```

## Apps

predictions: Gestiona predicciones realizadas por el modelo IA.
  Funciones:
  - Ejecutar predicción desde JSON completo
  - Guardar predicción en base de datos.
  - Consultar historial.
  - Consultar detalle de predicción.
  - Filtrar historial.

properties: Gestiona propiedades registradas en el sistema.
  Funciones:
  - Crear propiedades.
  - Listar propiedades activas.
  - Ver detalle de propiedad.
  - Actualizar propiedad.
  - Desactivar propiedad.
  - Predecir precio desde una propiedad guardada.
  - Consultar historial de predicciones por propiedad.
  - Consultar estadísticas para dashboard.

| Método | Endpoint                                     | Descripción                                |
| ------ | -------------------------------------------- | ------------------------------------------ |
| GET    | `/api/properties/`                           | Lista propiedades activas                  |
| POST   | `/api/properties/`                           | Crea una propiedad                         |
| GET    | `/api/properties/<property_id>/`             | Detalle de una propiedad                   |
| PUT    | `/api/properties/<property_id>/`             | Actualiza una propiedad                    |
| DELETE | `/api/properties/<property_id>/`             | Desactiva una propiedad                    |
| POST   | `/api/properties/<property_id>/predict/`     | Predice precio desde una propiedad         |
| GET    | `/api/properties/<property_id>/predictions/` | Historial de predicciones de una propiedad |
| GET    | `/api/properties/stats/`                     | Estadísticas para dashboard                |

## Comando seed
Carga propiedades demo: python manage.py seed_properties

