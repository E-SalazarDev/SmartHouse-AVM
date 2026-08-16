import { useMemo } from "react";
import { BarChart3, Wallet, Calendar, Ruler, Sparkles } from "lucide-react";

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

    const newestBuilt = useMemo(
        () => properties.reduce((best, p) => (p.year_built > best.year_built ? p : best)),
        [properties]
    );

    const mostSpacious = useMemo(
        () => properties.reduce((best, p) => (p.gr_liv_area > best.gr_liv_area ? p : best)),
        [properties]
    );

    const highestQuality = useMemo(
        () => properties.reduce((best, p) => (p.overall_qual > best.overall_qual ? p : best)),
        [properties]
    );

    const items = [
        {
            icon: Wallet,
            label: "Mejor relación calidad/precio",
            criterion: "Mayor calidad por cada dólar de valuación",
            property: bestValue,
        },
        {
            icon: Calendar,
            label: "Construcción más reciente",
            criterion: "Año de construcción más alto",
            property: newestBuilt,
        },
        {
            icon: Ruler,
            label: "Mayor superficie",
            criterion: "Más metros cuadrados habitables",
            property: mostSpacious,
        },
        {
            icon: Sparkles,
            label: "Mejor calidad general",
            criterion: "Calificación más alta (0-10)",
            property: highestQuality,
        },
    ];

    return (
        <div className="mt-6 rounded-2xl bg-slate-950 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-1">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
                    <BarChart3 size={13} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                    Resumen comparativo
                </span>
            </div>

            <p className="mb-4 pl-9 text-xs text-white/40">
                Cada dato viene directo de la propiedad; la valuación es la única cifra calculada por el modelo de IA.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.map(({ icon: Icon, label, criterion, property }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3.5"
                    >
                        <Icon size={15} className="text-violet-300 mb-2" />
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