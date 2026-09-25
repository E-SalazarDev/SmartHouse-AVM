const SQUARE_FEET_PER_SQUARE_METER = 10.7639;

function sqftToM2(sqft) {
    return Math.round(Number(sqft || 0) / SQUARE_FEET_PER_SQUARE_METER);
}

export function filterFavorites(properties, filters) {
    return properties.filter((p) => {
        if (filters.search) {
            const term = filters.search.toLowerCase();
            const matches =
                p.title?.toLowerCase().includes(term) ||
                p.neighborhood?.toLowerCase().includes(term) ||
                p.ms_zoning?.toLowerCase().includes(term);
            if (!matches) return false;
        }

        if (filters.neighborhood && p.neighborhood !== filters.neighborhood) return false;
        if (filters.ms_zoning && p.ms_zoning !== filters.ms_zoning) return false;

        if (filters.min_quality !== "" && p.overall_qual < Number(filters.min_quality)) return false;
        if (filters.max_quality !== "" && p.overall_qual > Number(filters.max_quality)) return false;

        if (filters.min_area !== "" || filters.max_area !== "") {
            const areaM2 = sqftToM2(p.gr_liv_area);
            if (filters.min_area !== "" && areaM2 < Number(filters.min_area)) return false;
            if (filters.max_area !== "" && areaM2 > Number(filters.max_area)) return false;
        }

        if (filters.year_built_min !== "" && p.year_built < Number(filters.year_built_min)) return false;
        if (filters.year_built_max !== "" && p.year_built > Number(filters.year_built_max)) return false;

        if (filters.min_bedrooms !== "" && p.bedroom_abv_gr < Number(filters.min_bedrooms)) return false;
        if (filters.min_full_bath !== "" && p.full_bath < Number(filters.min_full_bath)) return false;
        if (filters.garage_cars !== "" && p.garage_cars !== Number(filters.garage_cars)) return false;

        return true;
    });
}