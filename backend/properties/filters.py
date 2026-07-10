from django.db.models import Q


EXACT_FILTERS = {
    "neighborhood": "neighborhood",
    "ms_zoning": "ms_zoning",
    "garage_cars": "garage_cars",
}


RANGE_FILTERS = {
    "min_quality": "overall_qual__gte",
    "max_quality": "overall_qual__lte",

    "min_area": "gr_liv_area__gte",
    "max_area": "gr_liv_area__lte",

    "min_garage_cars": "garage_cars__gte",

    "min_bedrooms": "bedroom_abv_gr__gte",
    "max_bedrooms": "bedroom_abv_gr__lte",

    "min_full_bath": "full_bath__gte",
    "max_full_bath": "full_bath__lte",

    "year_built_min": "year_built__gte",
    "year_built_max": "year_built__lte",
}


def apply_property_filters(queryset, query_params):
    search = query_params.get("search")

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) |
            Q(neighborhood__icontains=search) |
            Q(ms_zoning__icontains=search)
        )

    exact_filters = {}

    for param_name, model_field in EXACT_FILTERS.items():
        value = query_params.get(param_name)

        if value not in ("", None):
            exact_filters[model_field] = value

    range_filters = {}

    for param_name, model_lookup in RANGE_FILTERS.items():
        value = query_params.get(param_name)

        if value not in ("", None):
            range_filters[model_lookup] = value

    return queryset.filter(
        **exact_filters,
        **range_filters
    )