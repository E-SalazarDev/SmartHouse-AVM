import {
    MapPin,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Calendar,
    Sparkles,
    Wallet,
} from "lucide-react";

function sqftToM2(sqft) {
    return Math.round(Number(sqft || 0) * 0.092903);
}

export const ROWS = [
    { key: "neighborhood", label: "Barrio", icon: MapPin, format: (v) => v },
    {
        key: "gr_liv_area",
        label: "Área habitable",
        icon: Ruler,
        format: (v) => `${sqftToM2(v)} m²`,
        higherIsBetter: true,
    },
    { key: "bedroom_abv_gr", label: "Habitaciones", icon: BedDouble, format: (v) => v, higherIsBetter: true },
    { key: "full_bath", label: "Baños", icon: Bath, format: (v) => v, higherIsBetter: true },
    { key: "garage_cars", label: "Garaje", icon: Car, format: (v) => v, higherIsBetter: true },
    { key: "year_built", label: "Año", icon: Calendar, format: (v) => v, higherIsBetter: true },
    { key: "overall_qual", label: "Calidad", icon: Sparkles, format: (v) => `${v}/10`, higherIsBetter: true },
    {
        key: "predicted_price",
        label: "Valuación IA",
        icon: Wallet,
        format: (v) => (v != null ? `$${Number(v).toLocaleString()}` : "—"),
        higherIsBetter: true,
    },
];

export function bestIndex(properties, row) {
    if (!row.higherIsBetter) return -1;

    const values = properties.map((p) => p[row.key]);
    if (values.some((v) => v == null)) return -1;

    let best = 0;
    properties.forEach((p, i) => {
        if (p[row.key] > properties[best][row.key]) best = i;
    });

    const allEqual = values.every((v) => v === values[0]);
    return allEqual ? -1 : best;
}