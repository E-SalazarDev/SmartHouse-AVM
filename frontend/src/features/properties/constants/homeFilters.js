import {
    Car,
    Clock3,
    Home,
    Sparkles,
    Maximize2,
} from "lucide-react";

export const quickPropertyFilters = [
    {
        label: "Alta calidad",
        icon: Sparkles,
        filters: {
            min_quality: "7",
        },
    },
    {
        label: "Con garaje",
        icon: Car,
        filters: {
            garage_cars: "2",
        },
    },
    {
        label: "Grandes",
        icon: Maximize2,
        filters: {
            min_area: "1800",
        },
    },
    {
        label: "Recientes",
        icon: Clock3,
        filters: {
            year_built_min: "2000",
        },
    },
    {
        label: "Familiares",
        icon: Home,
        filters: {
            bedrooms: "3",
            full_bath: "2",
        },
    },
];