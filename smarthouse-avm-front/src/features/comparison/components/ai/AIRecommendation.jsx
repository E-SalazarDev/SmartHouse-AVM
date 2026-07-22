import { useMemo } from "react";
import { Award, Wallet, Sparkles, Layers, TrendingUp } from "lucide-react";

export default function AIRecommendation({ properties }) {
    const bestValue = useMemo(
        () =>
            properties.reduce((best, p) =>
                p.quality / p.price > best.quality / best.price ? p : best
            ),
        [properties]
    );

    const mostModern = useMemo(
        () => properties.reduce((best, p) => (p.year > best.year ? p : best)),
        [properties]
    );

    const mostSpacious = useMemo(
        () => properties.reduce((best, p) => (p.area > best.area ? p : best)),
        [properties]
    );

    const bestInvestment = useMemo(
        () =>
            properties.reduce((best, p) =>
                p.aiValuation - p.price > best.aiValuation - best.price ? p : best
            ),
        [properties]
    );

    const items = [
        { icon: Wallet, label: "Mejor relación calidad/precio", property: bestValue },
        { icon: Sparkles, label: "Más moderna", property: mostModern },
        { icon: Layers, label: "Más espaciosa", property: mostSpacious },
        { icon: TrendingUp, label: "Mejor inversión", property: bestInvestment },
    ];

    return (
        <div className="mt-6 rounded-2xl bg-slate-950 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
                    <Award size={13} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                    SmartHouse AI Recommendation
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.map(({ icon: Icon, label, property }) => (
                    <div
                        key={label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3.5"
                    >
                        <Icon size={15} className="text-violet-300 mb-2" />
                        <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1">
                            {label}
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