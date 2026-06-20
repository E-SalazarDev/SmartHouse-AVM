# SmartHouse AVM

SmartHouse AVM es una plataforma web Full Stack para estimar el valor probable de propiedades inmobiliarias utilizando Inteligencia Artificial.

El sistema permite registrar propiedades, consultar un catálogo, visualizar detalles de una vivienda, ejecutar una predicción de precio mediante un modelo de Machine Learning y guardar el historial de valuaciones realizadas.

## Objetivo del proyecto

Construir un producto funcional que combine desarrollo web, backend, Machine Learning y MLOps.

El propósito no es únicamente entrenar un modelo, sino integrar ese modelo dentro de una aplicación real utilizando Django, React, MLflow y una arquitectura preparada para escalar.

## Tecnologías utilizadas

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Python
* Django
* Django REST Framework
* SQLite en desarrollo
* CORS Headers

### Inteligencia Artificial

* Pandas
* NumPy
* Scikit-Learn
* Linear Regression
* OneHotEncoder
* ColumnTransformer
* Pipeline
* Joblib

### MLOps

* MLflow
* Model Registry
* Docker

## Estructura del proyecto

```txt
SmartHouse-AVM/
├── ai-engine/
│   ├── artifacts/
│   ├── config/
│   ├── data/
│   ├── models/
│   ├── notebooks/
│   ├── reports/
│   └── src/
│
├── backend/
│   ├── core/
│   ├── predictions/
│   ├── properties/
│   ├── db.sqlite3
│   └── manage.py
│
├── front/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Módulos principales

### AI Engine

Contiene el flujo de Machine Learning:

* Exploración de datos
* Limpieza de datos
* Entrenamiento de modelos
* Comparación de modelos
* Registro en MLflow
* Persistencia del modelo entrenado

El modelo seleccionado actualmente es una regresión lineal entrenada con el dataset Ames Housing.

El modelo se guarda en:

```txt
ai-engine/artifacts/linear_regression_model.pkl
```

### Backend Django

El backend expone APIs REST para:

* Crear propiedades
* Listar propiedades
* Consultar detalle de una propiedad
* Actualizar propiedades
* Desactivar propiedades
* Ejecutar predicciones sobre propiedades
* Guardar historial de predicciones
* Consultar estadísticas para dashboard

## Nota importante

El modelo actual fue entrenado con el dataset Ames Housing. Por lo tanto, las predicciones representan estimaciones basadas en ese conjunto de datos y no deben interpretarse como valuaciones oficiales del mercado inmobiliario mexicano.

Este proyecto tiene fines educativos, técnicos y de portafolio profesional.
