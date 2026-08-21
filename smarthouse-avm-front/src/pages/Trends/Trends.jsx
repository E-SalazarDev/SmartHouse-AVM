import { BarChart3, Ruler, Sparkles, Calendar, BedDouble, Car, AlertTriangle } from "lucide-react";
import usePropertyTrends from "../../features/trends/hooks/usePropertyTrends";
import {
    computeAverages,
    computeQualityDistribution,
    computeNeighborhoodDistribution,
} from "../../features/trends/lib/computeTrendStats";

function StatCard({ icon: Icon, label, value, unit }) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 mb-3">
                <Icon size={16} />
            </div>
            <p className="text-2xl font-bold text-slate-950">
                {value}
                {unit && <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{label}</p>
        </div>
    );
}

function BarRow({ label, count, max }) {
    const percent = max > 0 ? Math.max((count / max) * 100, count > 0 ? 4 : 0) : 0;

    return (
        <div className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-xs font-semibold text-slate-500">{label}</span>
            <div className="flex-1 h-6 rounded-full bg-slate-50 overflow-hidden">
                <div
                    className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-bold text-slate-700">{count}</span>
        </div>
    );
}

export default function Trends() {
    const { properties, stats, isLoading, isError } = usePropertyTrends();

    const averages = computeAverages(properties);
    const qualityDistribution = computeQualityDistribution(properties);
    const neighborhoodDistribution = computeNeighborhoodDistribution(properties);

    const maxQualityCount = Math.max(...qualityDistribution.map((b) => b.count), 1);
    const maxNeighborhoodCount = Math.max(...neighborhoodDistribution.map((n) => n.count), 1);

    if (isLoading) {
        return (
            <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
                <p className="text-sm text-slate-500">Cargando análisis del catálogo...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <p className="text-sm font-semibold text-slate-900">
                        No se pudo cargar el análisis del mercado
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-600/70">
                    Análisis del mercado
                </span>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-950">
                    Tendencias
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Estadísticas calculadas sobre las {properties.length} propiedades activas del catálogo.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                <StatCard
                    icon={BarChart3}
                    label="Precio promedio estimado"
                    value={
                        stats?.average_predicted_price
                            ? new Intl.NumberFormat("es-MX", {
                                  style: "currency",
                                  currency: "USD",
                                  maximumFractionDigits: 0,
                              }).format(stats.average_predicted_price)
                            : "—"
                    }
                />
                <StatCard icon={Ruler} label="Área promedio" value={averages.avgArea} unit="m²" />
                <StatCard icon={Sparkles} label="Calidad promedio" value={averages.avgQuality} unit="/10" />
                <StatCard icon={Calendar} label="Año promedio" value={averages.avgYear} />
                <StatCard icon={BedDouble} label="Habitaciones prom." value={averages.avgBedrooms} />
                <StatCard icon={Car} label="Garaje promedio" value={averages.avgGarage} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-5">
                    <p className="text-sm font-bold text-slate-950 mb-4">
                        Distribución por calidad
                    </p>
                    <div className="flex flex-col gap-3">
                        {qualityDistribution.map((bucket) => (
                            <BarRow
                                key={bucket.label}
                                label={bucket.label}
                                count={bucket.count}
                                max={maxQualityCount}
                            />
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5">
                    <p className="text-sm font-bold text-slate-950 mb-4">
                        Propiedades por zona
                    </p>
                    <div className="flex flex-col gap-3">
                        {neighborhoodDistribution.map((item) => (
                            <BarRow
                                key={item.neighborhood}
                                label={item.neighborhood}
                                count={item.count}
                                max={maxNeighborhoodCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}