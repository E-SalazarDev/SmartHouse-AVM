from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Avg, Min, Max

from predictions.models import PredictionRequest
from predictions.ml_model import predict_house_price
from .filters import apply_property_filters
from predictions.serializers import PredictionHistorySerializer

from .models import Property
from .pagination import PropertyPagination
from .serializers import (
    PropertyListSerializer,
    PropertyDetailSerializer,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
)

SQUARE_FEET_PER_SQUARE_METER = 10.7639


def square_feet_to_square_meters(value):
    if value is None:
        return None

    return round(
        value / SQUARE_FEET_PER_SQUARE_METER
    )


def build_quality_presets(properties):
    presets = [
        {
            "value": "functional",
            "label": "Funcional",
            "min_quality": 4,
            "max_quality": 5,
        },
        {
            "value": "good",
            "label": "Buena",
            "min_quality": 6,
            "max_quality": 6,
        },
        {
            "value": "very_good",
            "label": "Muy buena",
            "min_quality": 7,
            "max_quality": 7,
        },
        {
            "value": "excellent",
            "label": "Excelente",
            "min_quality": 8,
            "max_quality": 8,
        },
        {
            "value": "premium",
            "label": "Premium",
            "min_quality": 9,
            "max_quality": 10,
        },
        {
            "value": "very_good_or_better",
            "label": "Muy buena o superior",
            "min_quality": 7,
            "max_quality": None,
        },
    ]

    result = []

    for preset in presets:
        filtered_properties = properties.filter(
            overall_qual__gte=(
                preset["min_quality"]
            )
        )

        if preset["max_quality"] is not None:
            filtered_properties = (
                filtered_properties.filter(
                    overall_qual__lte=(
                        preset["max_quality"]
                    )
                )
            )

        result.append(
            {
                **preset,
                "count": filtered_properties.count(),
            }
        )

    return result


def build_area_presets(properties):
    presets = [
        {
            "value": "small",
            "label": "Hasta 80 m²",
            "min_area": None,
            "max_area": 80,
        },
        {
            "value": "medium",
            "label": "80–120 m²",
            "min_area": 80,
            "max_area": 120,
        },
        {
            "value": "large",
            "label": "120–180 m²",
            "min_area": 120,
            "max_area": 180,
        },
        {
            "value": "very_large",
            "label": "Más de 180 m²",
            "min_area": 180,
            "max_area": None,
        },
    ]

    result = []

    for preset in presets:
        filtered_properties = properties

        if preset["min_area"] is not None:
            minimum_square_feet = round(
                preset["min_area"]
                * SQUARE_FEET_PER_SQUARE_METER
            )

            filtered_properties = (
                filtered_properties.filter(
                    gr_liv_area__gte=(
                        minimum_square_feet
                    )
                )
            )

        if preset["max_area"] is not None:
            maximum_square_feet = round(
                preset["max_area"]
                * SQUARE_FEET_PER_SQUARE_METER
            )

            filtered_properties = (
                filtered_properties.filter(
                    gr_liv_area__lte=(
                        maximum_square_feet
                    )
                )
            )

        result.append(
            {
                **preset,
                "count": filtered_properties.count(),
            }
        )

    return result


def build_year_presets(properties):
    presets = [
        {
            "value": "historic",
            "label": "Antes de 1950",
            "year_built_min": None,
            "year_built_max": 1949,
        },
        {
            "value": "classic",
            "label": "1950–1979",
            "year_built_min": 1950,
            "year_built_max": 1979,
        },
        {
            "value": "modernized",
            "label": "1980–1999",
            "year_built_min": 1980,
            "year_built_max": 1999,
        },
        {
            "value": "modern",
            "label": "2000 o posterior",
            "year_built_min": 2000,
            "year_built_max": None,
        },
    ]

    result = []

    for preset in presets:
        filtered_properties = properties

        if preset["year_built_min"] is not None:
            filtered_properties = (
                filtered_properties.filter(
                    year_built__gte=(
                        preset[
                            "year_built_min"
                        ]
                    )
                )
            )

        if preset["year_built_max"] is not None:
            filtered_properties = (
                filtered_properties.filter(
                    year_built__lte=(
                        preset[
                            "year_built_max"
                        ]
                    )
                )
            )

        result.append(
            {
                **preset,
                "count": filtered_properties.count(),
            }
        )

    return result
class PropertyListView(APIView):
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        
        return [IsAdminUser()]

    # GET /api/properties/
    # Obtiene propiedades activas con paginación.
    def get(self, request):

        properties = Property.objects.filter(
            is_active=True
        )

        properties = apply_property_filters(
            queryset=properties,
            query_params=request.query_params
        )

        properties = properties.order_by("-created_at")

        paginator = PropertyPagination()

        paginated_properties = paginator.paginate_queryset(
            properties,
            request
        )

        serializer = PropertyListSerializer(
            paginated_properties,
            many=True
        )

        return paginator.get_paginated_response(
            serializer.data
        )
    # POST /api/properties/
    # Crea una nueva propiedad desde el JSON enviado.
    def post(self, request):

        serializer = PropertyDetailSerializer(
            data=request.data
        )

        if serializer.is_valid():
            property_obj = serializer.save()

            response_serializer = PropertyDetailSerializer(
                property_obj
            )

            return Response(
                response_serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class PropertyDetailView(APIView):
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        
        return [IsAdminUser()]

    # GET /api/properties/<property_id>/
    # Obtiene el detalle completo de una propiedad.
    def get(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            serializer = PropertyDetailSerializer(
                property_obj
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

    # PUT /api/properties/<property_id>/
    # Actualiza completamente una propiedad existente.
    def put(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            serializer = PropertyDetailSerializer(
                property_obj,
                data=request.data
            )

            if serializer.is_valid():
                serializer.save()

                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK
                )

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

    # DELETE /api/properties/<property_id>/
    # Desactiva una propiedad usando soft delete.
    def delete(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            property_obj.is_active = False
            property_obj.save()

            return Response(
                {
                    "message": "Property deleted successfully"
                },
                status=status.HTTP_200_OK
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )


class PropertyPredictionView(APIView):
    
    permission_classes = [AllowAny]

    # POST /api/properties/<property_id>/predict/
    # Predice el precio de una propiedad guardada usando model_input_data.
    def post(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            if not property_obj.model_input_data:
                return Response(
                    {
                        "error": "This property does not have model input data."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            predicted_price = predict_house_price(
                property_obj.model_input_data
            )

            prediction = PredictionRequest.objects.create(
                user=(
                    request.user
                    if request.user.is_authenticated
                    else None
                ),
                property=property_obj,
                input_data=property_obj.model_input_data,
                predicted_price=predicted_price
            )
            
            

            return Response(
                {
                    "property_id": property_obj.id,
                    "prediction_id": prediction.id,
                    "predicted_price": round(predicted_price, 2)
                },
                status=status.HTTP_201_CREATED
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )


class PropertyPredictionsHistoryView(APIView):
    
    permission_classes = [IsAuthenticated]

    # GET /api/properties/<property_id>/predictions/
    # Obtiene el historial de predicciones de una propiedad.
    def get(self, request, property_id):

        try:
            property_obj = Property.objects.get(
                id=property_id,
                is_active=True
            )

            if request.user.is_staff:
                predictions = property_obj.predictions.all()
            else:
                predictions = property_obj.predictions.filter(
                    user=request.user
                )
            
            predictions = predictions.order_by(
                "-created_at"
            )    

            serializer = PredictionHistorySerializer(
                predictions,
                many=True
            )

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        except Property.DoesNotExist:
            return Response(
                {
                    "error": "Property not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )


class PropertyStatsView(APIView):
    
    permission_classes = [AllowAny]

    # GET /api/properties/stats/
    # Obtiene estadísticas generales para el dashboard.
    def get(self, request):

        total_properties = Property.objects.count()

        active_properties = Property.objects.filter(
            is_active=True
        ).count()

        total_predictions = PredictionRequest.objects.count()

        average_predicted_price = PredictionRequest.objects.aggregate(
            average_price=Avg("predicted_price")
        )["average_price"]

        return Response(
            {
                "total_properties": total_properties,
                "active_properties": active_properties,
                "total_predictions": total_predictions,
                "average_predicted_price": round(
                    average_predicted_price or 0,
                    2
                )
            },
            status=status.HTTP_200_OK
        )
        
class PropertyFilterOptionsView(APIView):
    """
    GET /api/properties/filter-options/

    Devuelve opciones categóricas, restricciones y presets
    """

    permission_classes = [AllowAny]

    def get(self, request):
        properties = Property.objects.filter(
            is_active=True
        )

        neighborhoods = (
            properties
            .exclude(neighborhood="")
            .values_list(
                "neighborhood",
                flat=True,
            )
            .distinct()
            .order_by("neighborhood")
        )

        ms_zonings = (
            properties
            .exclude(ms_zoning="")
            .values_list(
                "ms_zoning",
                flat=True,
            )
            .distinct()
            .order_by("ms_zoning")
        )

        garage_cars = (
            properties
            .values_list(
                "garage_cars",
                flat=True,
            )
            .distinct()
            .order_by("garage_cars")
        )

        bedrooms = (
            properties
            .values_list(
                "bedroom_abv_gr",
                flat=True,
            )
            .distinct()
            .order_by("bedroom_abv_gr")
        )

        full_baths = (
            properties
            .values_list(
                "full_bath",
                flat=True,
            )
            .distinct()
            .order_by("full_bath")
        )

        qualities = (
            properties
            .values_list(
                "overall_qual",
                flat=True,
            )
            .distinct()
            .order_by("overall_qual")
        )

        constraints = properties.aggregate(
            area_min=Min("gr_liv_area"),
            area_max=Max("gr_liv_area"),
            year_built_min=Min("year_built"),
            year_built_max=Max("year_built"),
            quality_min=Min("overall_qual"),
            quality_max=Max("overall_qual"),
        )

        return Response(
            {
                "categorical_options": {
                    "neighborhoods": list(
                        neighborhoods
                    ),
                    "ms_zonings": list(
                        ms_zonings
                    ),
                    "garage_cars": list(
                        garage_cars
                    ),
                    "bedrooms": list(
                        bedrooms
                    ),
                    "full_baths": list(
                        full_baths
                    ),
                    "qualities": list(
                        qualities
                    ),
                },
                "constraints": {
                    "area": {
                        "min": (
                            square_feet_to_square_meters(
                                constraints["area_min"]
                            )
                        ),
                        "max": (
                            square_feet_to_square_meters(
                                constraints["area_max"]
                            )
                        ),
                        "unit": "m2",
                    },
                    "year_built": {
                        "min": constraints[
                            "year_built_min"
                        ],
                        "max": constraints[
                            "year_built_max"
                        ],
                    },
                    "quality": {
                        "min": constraints[
                            "quality_min"
                        ],
                        "max": constraints[
                            "quality_max"
                        ],
                    },
                },
                "presets": {
                    "quality": (
                        build_quality_presets(
                            properties
                        )
                    ),
                    "area": (
                        build_area_presets(
                            properties
                        )
                    ),
                    "year_built": (
                        build_year_presets(
                            properties
                        )
                    ),
                },
            },
            status=status.HTTP_200_OK,
        )