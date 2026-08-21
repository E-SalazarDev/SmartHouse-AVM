import { useMemo } from "react";
import {
    BarChart3,
    Wallet,
    Calendar,
    Ruler,
    Sparkles,
    BedDouble,
    Bath,
    Car,
    TrendingDown,
} from "lucide-react";

function pickBest(properties, key) {
    return properties.reduce((best, p) => (p[key] > best[key] ? p : best));
}

function pickLowestPrice(properties) {
    const withPrice = properties.filter((p) => p.predicted_price != null);
    if (withPrice.length === 0) return properties[0];
    return withPrice.reduce((lowest, p) =>
        p.predicted_price < lowest.predicted_price ? p : lowest
    );
}

export default function AIRecommendation({ properties }) {
    const bestValue = useMemo(
        () =>
            properties.reduce((best, p) => {
                const pScore = p.predicted_price ? p.overall_qual / p.predicted_price : 0;
                const bestScore = best.predicted_price ? best.overall_qual / best.predicted_price : 0;
                return pScore > bestScore ? p : best;
            }),
        [properties]
    );

    const newestBuilt = useMemo(() => pickBest(properties, "year_built"), [properties]);
    const mostSpacious = useMemo(() => pickBest(properties, "gr_liv_area"), [properties]);
    const highestQuality = useMemo(() => pickBest(properties, "overall_qual"), [properties]);
    const mostBedrooms = useMemo(() => pickBest(properties, "bedroom_abv_gr"), [properties]);
    const mostBathrooms = useMemo(() => pickBest(properties, "full_bath"), [properties]);
    const mostGarage = useMemo(() => pickBest(properties, "garage_cars"), [properties]);
    const lowestPrice = useMemo(() => pickLowestPrice(properties), [properties]);

    const items = [
        {
            icon: Wallet,
            label: "Mejor relación calidad/precio",
            criterion: "Mayor calidad por cada dólar de valuación",
            property: bestValue,
        },
        {
            icon: TrendingDown,
            label: "Opción más accesible",
            criterion: "Menor valuación estimada",
            property: lowestPrice,
        },
        {
            icon: Sparkles,
            label: "Mejor calidad general",
            criterion: "Calificación más alta (0-10)",
            property: highestQuality,
        },
        {
            icon: Ruler,
            label: "Mayor superficie",
            criterion: "Más metros cuadrados habitables",
            property: mostSpacious,
        },
        {
            icon: Calendar,
            label: "Construcción más reciente",
            criterion: "Año de construcción más alto",
            property: newestBuilt,
        },
        {
            icon: BedDouble,
            label: "Más habitaciones",
            criterion: "Mayor número de recámaras",
            property: mostBedrooms,
        },
        {
            icon: Bath,
            label: "Más baños",
            criterion: "Mayor número de baños completos",
            property: mostBathrooms,
        },
        {
            icon: Car,
            label: "Mayor capacidad de garaje",
            criterion: "Más espacios para auto",
            property: mostGarage,
        },
    ];

    return (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] md:p-6">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-1/2 h-44 w-60 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute -right-8 top-0 h-28 w-44 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            <div className="relative flex items-center gap-3 mb-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-linear-to-br from-indigo-500/30 to-violet-700/20 text-indigo-300">
                    <BarChart3 size={16} />
                </div>
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-300/75">
                        SmartHouse AVM
                    </p>
                    <p className="text-base font-bold tracking-tight text-white">
                        Resumen comparativo
                    </p>
                </div>
            </div>

            <p className="relative mb-5 pl-12 text-xs text-white/40">
                Cada dato viene directo de la propiedad; la valuación es la única cifra calculada por el modelo de IA.
            </p>

            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {items.map(({ icon: Icon, label, criterion, property }) => (
                    <div
                        key={label}
                        className="group rounded-xl border border-white/10 bg-white/5 p-3.5 transition hover:border-violet-400/30 hover:bg-white/[0.07]"
                    >
                        <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 transition group-hover:bg-violet-500/25">
                            <Icon size={14} />
                        </div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70 mb-0.5">
                            {label}
                        </p>
                        <p className="text-[10px] text-white/35 mb-2">
                            {criterion}
                        </p>
                        <p className="text-sm font-medium text-white truncate">
                            {property.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}