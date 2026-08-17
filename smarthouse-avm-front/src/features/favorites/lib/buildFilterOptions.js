const SQUARE_FEET_PER_SQUARE_METER = 10.7639;

function sqftToM2(sqft) {
    return Math.round(Number(sqft || 0) / SQUARE_FEET_PER_SQUARE_METER);
}

function buildQualityPresets(properties) {
    const presets = [
        { value: "functional", label: "Funcional", min_quality: 4, max_quality: 5 },
        { value: "good", label: "Buena", min_quality: 6, max_quality: 6 },
        { value: "very_good", label: "Muy buena", min_quality: 7, max_quality: 7 },
        { value: "excellent", label: "Excelente", min_quality: 8, max_quality: 8 },
        { value: "premium", label: "Premium", min_quality: 9, max_quality: 10 },
        { value: "very_good_or_better", label: "Muy buena o superior", min_quality: 7, max_quality: null },
    ];

    return presets.map((preset) => ({
        ...preset,
        count: properties.filter(
            (p) =>
                p.overall_qual >= preset.min_quality &&
                (preset.max_quality == null || p.overall_qual <= preset.max_quality)
        ).length,
    }));
}

function buildAreaPresets(properties) {
    const presets = [
        { value: "small", label: "Hasta 80 m²", min_area: null, max_area: 80 },
        { value: "medium", label: "80–120 m²", min_area: 80, max_area: 120 },
        { value: "large", label: "120–180 m²", min_area: 120, max_area: 180 },
        { value: "very_large", label: "Más de 180 m²", min_area: 180, max_area: null },
    ];

    return presets.map((preset) => ({
        ...preset,
        count: properties.filter((p) => {
            const areaM2 = sqftToM2(p.gr_liv_area);
            if (preset.min_area != null && areaM2 < preset.min_area) return false;
            if (preset.max_area != null && areaM2 > preset.max_area) return false;
            return true;
        }).length,
    }));
}

function buildYearPresets(properties) {
    const presets = [
        { value: "historic", label: "Antes de 1950", year_built_min: null, year_built_max: 1949 },
        { value: "classic", label: "1950–1979", year_built_min: 1950, year_built_max: 1979 },
        { value: "modernized", label: "1980–1999", year_built_min: 1980, year_built_max: 1999 },
        { value: "modern", label: "2000 o posterior", year_built_min: 2000, year_built_max: null },
    ];

    return presets.map((preset) => ({
        ...preset,
        count: properties.filter((p) => {
            if (preset.year_built_min != null && p.year_built < preset.year_built_min) return false;
            if (preset.year_built_max != null && p.year_built > preset.year_built_max) return false;
            return true;
        }).length,
    }));
}

export function buildFilterOptions(properties) {
    const neighborhoods = [...new Set(properties.map((p) => p.neighborhood).filter(Boolean))].sort();
    const msZonings = [...new Set(properties.map((p) => p.ms_zoning).filter(Boolean))].sort();
    const garageCars = [...new Set(properties.map((p) => p.garage_cars))].sort((a, b) => a - b);
    const bedrooms = [...new Set(properties.map((p) => p.bedroom_abv_gr))].sort((a, b) => a - b);
    const fullBaths = [...new Set(properties.map((p) => p.full_bath))].sort((a, b) => a - b);

    const areas = properties.map((p) => sqftToM2(p.gr_liv_area));
    const years = properties.map((p) => p.year_built);

    return {
        categorical_options: {
            neighborhoods,
            ms_zonings: msZonings,
            garage_cars: garageCars,
            bedrooms,
            full_baths: fullBaths,
        },
        constraints: {
            area: {
                min: areas.length ? Math.min(...areas) : null,
                max: areas.length ? Math.max(...areas) : null,
                unit: "m2",
            },
            year_built: {
                min: years.length ? Math.min(...years) : null,
                max: years.length ? Math.max(...years) : null,
            },
        },
        presets: {
            quality: buildQualityPresets(properties),
            area: buildAreaPresets(properties),
            year_built: buildYearPresets(properties),
        },
    };
}