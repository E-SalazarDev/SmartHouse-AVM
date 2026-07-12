from django.db.models import Q

from rest_framework.exceptions import ValidationError


SQUARE_FEET_PER_SQUARE_METER = 10.7639


EXACT_FILTERS = {
    "neighborhood": "neighborhood",
    "ms_zoning": "ms_zoning",
    "garage_cars": "garage_cars",
}


RANGE_FILTERS = {
    "min_quality": "overall_qual__gte",
    "max_quality": "overall_qual__lte",

    "min_garage_cars": "garage_cars__gte",

    "min_bedrooms": "bedroom_abv_gr__gte",
    "max_bedrooms": "bedroom_abv_gr__lte",

    "min_full_bath": "full_bath__gte",
    "max_full_bath": "full_bath__lte",

    "year_built_min": "year_built__gte",
    "year_built_max": "year_built__lte",
}


def validate_number(value, field_name):
    try:
        return float(value)

    except (TypeError, ValueError):
        raise ValidationError(
            {
                field_name: "Debe ser un número válido."
            }
        )


def validate_range(
    minimum,
    maximum,
    minimum_field,
    maximum_field,
    error_message,
):
    if minimum is None or maximum is None:
        return

    if minimum > maximum:
        raise ValidationError(
            {
                maximum_field: error_message
            }
        )


def square_meters_to_square_feet(value):
    return round(
        value * SQUARE_FEET_PER_SQUARE_METER
    )


def apply_property_filters(queryset, query_params):
    search = query_params.get("search")

    if search:
        normalized_search = search.strip()

        if normalized_search:
            queryset = queryset.filter(
                Q(title__icontains=normalized_search)
                | Q(
                    neighborhood__icontains=(
                        normalized_search
                    )
                )
                | Q(
                    ms_zoning__icontains=(
                        normalized_search
                    )
                )
            )

    exact_filters = {}

    for param_name, model_field in EXACT_FILTERS.items():
        value = query_params.get(param_name)

        if value not in ("", None):
            exact_filters[model_field] = value

    range_filters = {}

    for param_name, model_lookup in RANGE_FILTERS.items():
        value = query_params.get(param_name)

        if value in ("", None):
            continue

        range_filters[model_lookup] = validate_number(
            value=value,
            field_name=param_name,
        )

    min_quality = query_params.get("min_quality")
    max_quality = query_params.get("max_quality")

    min_quality_number = (
        validate_number(
            min_quality,
            "min_quality",
        )
        if min_quality not in ("", None)
        else None
    )

    max_quality_number = (
        validate_number(
            max_quality,
            "max_quality",
        )
        if max_quality not in ("", None)
        else None
    )

    validate_range(
        minimum=min_quality_number,
        maximum=max_quality_number,
        minimum_field="min_quality",
        maximum_field="max_quality",
        error_message=(
            "La calidad máxima no puede ser menor "
            "que la calidad mínima."
        ),
    )

    min_year = query_params.get("year_built_min")
    max_year = query_params.get("year_built_max")

    min_year_number = (
        validate_number(
            min_year,
            "year_built_min",
        )
        if min_year not in ("", None)
        else None
    )

    max_year_number = (
        validate_number(
            max_year,
            "year_built_max",
        )
        if max_year not in ("", None)
        else None
    )

    validate_range(
        minimum=min_year_number,
        maximum=max_year_number,
        minimum_field="year_built_min",
        maximum_field="year_built_max",
        error_message=(
            "El año máximo no puede ser menor "
            "que el año mínimo."
        ),
    )

    min_area = query_params.get("min_area")
    max_area = query_params.get("max_area")

    min_area_m2 = (
        validate_number(
            min_area,
            "min_area",
        )
        if min_area not in ("", None)
        else None
    )

    max_area_m2 = (
        validate_number(
            max_area,
            "max_area",
        )
        if max_area not in ("", None)
        else None
    )

    validate_range(
        minimum=min_area_m2,
        maximum=max_area_m2,
        minimum_field="min_area",
        maximum_field="max_area",
        error_message=(
            "El área máxima no puede ser menor "
            "que el área mínima."
        ),
    )

    if min_area_m2 is not None:
        if min_area_m2 < 0:
            raise ValidationError(
                {
                    "min_area": (
                        "El área no puede ser negativa."
                    )
                }
            )

        range_filters["gr_liv_area__gte"] = (
            square_meters_to_square_feet(
                min_area_m2
            )
        )

    if max_area_m2 is not None:
        if max_area_m2 < 0:
            raise ValidationError(
                {
                    "max_area": (
                        "El área no puede ser negativa."
                    )
                }
            )

        range_filters["gr_liv_area__lte"] = (
            square_meters_to_square_feet(
                max_area_m2
            )
        )

    return queryset.filter(
        **exact_filters,
        **range_filters,
    )