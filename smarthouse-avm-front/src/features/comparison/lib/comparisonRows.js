import {
    MapPin,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Calendar,
    Sparkles,
    Wallet,
    Layers,
} from "lucide-react";

export const ROWS = [
    { key: "neighborhood", label: "Barrio", icon: MapPin, format: (v) => v },
    { key: "area", label: "Área habitable", icon: Ruler, format: (v) => `${v} m²`, higherIsBetter: true },
    { key: "beds", label: "Habitaciones", icon: BedDouble, format: (v) => v, higherIsBetter: true },
    { key: "baths", label: "Baños", icon: Bath, format: (v) => v, higherIsBetter: true },
    { key: "garage", label: "Garaje", icon: Car, format: (v) => v, higherIsBetter: true },
    { key: "year", label: "Año", icon: Calendar, format: (v) => v, higherIsBetter: true },
    { key: "quality", label: "Calidad", icon: Sparkles, format: (v) => `${v}/10`, higherIsBetter: true },
    {
        key: "aiValuation",
        label: "Valuación IA",
        icon: Wallet,
        format: (v) => `$${v.toLocaleString()}`,
        higherIsBetter: true,
    },
    { key: "condition", label: "Estado", icon: Layers, format: (v) => v },
];

export function bestIndex(properties, row) {
    if (!row.higherIsBetter) return -1;
    let best = 0;
    properties.forEach((p, i) => {
        if (p[row.key] > properties[best][row.key]) best = i;
    });
    const allEqual = properties.every((p) => p[row.key] === properties[0][row.key]);
    return allEqual ? -1 : best;
}