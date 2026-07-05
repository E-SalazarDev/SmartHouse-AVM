from django.db.models import Q


EXACT_FILTERS = {
    "neighborhood": "neighborhood",
    "ms_zoning": "ms_zoning",
    "garage_cars": "garage_cars",
    "bedrooms": "bedroom_abv_gr",
    "full_bath": "full_bath",
}


RANGE_FILTERS = {
    "min_quality": "overall_qual__gte",
    "max_quality": "overall_qual__lte",
    "min_area": "gr_liv_area__gte",
    "max_area": "gr_liv_area__lte",
    "year_built_min": "year_built__gte",
    "year_built_max": "year_built__lte",
}


def apply_property_filters(queryset, query_params):
    search = query_params.get("search")

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) |
            Q(neighborhood__icontains=search) |
            Q(address__icontains=search)
        )

    exact_filters = {}

    for param_name, model_field in EXACT_FILTERS.items():
        value = query_params.get(param_name)

        if value:
            exact_filters[model_field] = value

    range_filters = {}

    for param_name, model_lookup in RANGE_FILTERS.items():
        value = query_params.get(param_name)

        if value:
            range_filters[model_lookup] = value

    return queryset.filter(
        **exact_filters,
        **range_filters
    )