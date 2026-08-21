const SQFT_PER_M2 = 10.7639;

function sqftToM2(sqft) {
    return Number(sqft || 0) / SQFT_PER_M2;
}

export function computeAverages(properties) {
    if (properties.length === 0) {
        return { avgArea: 0, avgQuality: 0, avgYear: 0, avgBedrooms: 0, avgGarage: 0 };
    }

    const totals = properties.reduce(
        (acc, p) => {
            acc.area += sqftToM2(p.gr_liv_area);
            acc.quality += p.overall_qual || 0;
            acc.year += p.year_built || 0;
            acc.bedrooms += p.bedroom_abv_gr || 0;
            acc.garage += p.garage_cars || 0;
            return acc;
        },
        { area: 0, quality: 0, year: 0, bedrooms: 0, garage: 0 }
    );

    const count = properties.length;

    return {
        avgArea: Math.round(totals.area / count),
        avgQuality: Number((totals.quality / count).toFixed(1)),
        avgYear: Math.round(totals.year / count),
        avgBedrooms: Number((totals.bedrooms / count).toFixed(1)),
        avgGarage: Number((totals.garage / count).toFixed(1)),
    };
}

export function computeQualityDistribution(properties) {
    const buckets = [
        { label: "1-2", min: 1, max: 2 },
        { label: "3-4", min: 3, max: 4 },
        { label: "5-6", min: 5, max: 6 },
        { label: "7-8", min: 7, max: 8 },
        { label: "9-10", min: 9, max: 10 },
    ];

    return buckets.map((bucket) => ({
        label: bucket.label,
        count: properties.filter(
            (p) => p.overall_qual >= bucket.min && p.overall_qual <= bucket.max
        ).length,
    }));
}

export function computeNeighborhoodDistribution(properties) {
    const counts = {};

    properties.forEach((p) => {
        if (!p.neighborhood) return;
        counts[p.neighborhood] = (counts[p.neighborhood] || 0) + 1;
    });

    return Object.entries(counts)
        .map(([neighborhood, count]) => ({ neighborhood, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
}