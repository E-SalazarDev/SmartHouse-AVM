import { motion } from "framer-motion";
import {
    BarChart3,
    Ruler,
    Sparkles,
    Calendar,
    BedDouble,
    Car,
    AlertTriangle,
    MapPin,
    TrendingUp,
} from "lucide-react";
import usePropertyTrends from "../../features/trends/hooks/usePropertyTrends";
import {
    computeAverages,
    computeQualityDistribution,
    computeNeighborhoodDistribution,
} from "../../features/trends/lib/computeTrendStats";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

// --- TARJETA DE ESTADÍSTICA (SIN CAMBIOS) ---
function StatCard({ icon: Icon, label, value, unit }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_4px_20px_-14px_rgba(15,23,42,0.15)] transition-shadow hover:shadow-[0_16px_36px_-16px_rgba(124,58,255,0.3)]"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25 mb-3">
                <Icon size={17} />
            </div>
            <p className="text-2xl font-bold text-slate-950">
                {value}
                {unit && <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{label}</p>
        </motion.div>
    );
}

// --- GRÁFICO DE BARRAS VERTICALES (Adaptado a fondo oscuro) ---
function VerticalBarChart({ data, max, total }) {
    return (
        <div className="relative flex h-48 items-end justify-between gap-2 pt-6">
            {/* Líneas de guía horizontales */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full border-t border-dashed border-white/10" />
                ))}
            </div>

            {data.map((item, index) => {
                const percent = max > 0 ? (item.count / max) * 100 : 0;
                const percentOfTotal = total > 0 ? (item.count / total) * 100 : 0;
                const barHeight = item.count > 0 ? Math.max(percent, 5) : 0;

                return (
                    <div key={item.label || item.neighborhood} className="relative flex flex-1 flex-col items-center justify-end h-full z-10">
                        
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 + 0.3 }}
                            className="mb-1 text-xs font-bold text-white/90"
                        >
                            {item.count}
                        </motion.span>

                        <div className="relative w-full max-w-[40px] flex-1 flex items-end justify-center">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: `${barHeight}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                                className={`relative w-full rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-400 shadow-[0_0_15px_-3px_rgba(124,58,255,0.5)]`}
                            >
                                <div className="absolute top-0 inset-x-0 h-2 bg-white/40 rounded-t-md" />
                                
                                {barHeight > 20 ? (
                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/90">
                                        {percentOfTotal.toFixed(0)}%
                                    </span>
                                ) : (
                                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/50">
                                        {percentOfTotal.toFixed(0)}%
                                    </span>
                                )}
                            </motion.div>
                        </div>

                        <div className="mt-2 flex h-8 w-full items-center justify-center">
                            <span className="text-[10px] font-semibold text-white/60 text-center leading-tight">
                                {item.label || item.neighborhood}
                            </span>
                        </div>
                    </div>
                );
            })}
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
    const totalProperties = properties.length;

    const topNeighborhood = neighborhoodDistribution[0];
    const topQualityBucket = qualityDistribution.reduce(
        (best, bucket) => (bucket.count > best.count ? bucket : best),
        qualityDistribution[0] ?? { label: "—", count: 0 }
    );

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

            {/* Panel de hallazgos */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-7">
                <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />

                <div className="relative flex items-center gap-2.5 mb-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                        <TrendingUp size={16} />
                    </div>
                    <p className="text-sm font-bold text-white">Hallazgos del catálogo</p>
                </div>

                <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-2 text-violet-300">
                            <MapPin size={13} />
                            <p className="text-[11px] font-bold uppercase tracking-wide">
                                Zona con más propiedades
                            </p>
                        </div>
                        <p className="text-lg font-bold text-white">
                            {topNeighborhood?.neighborhood ?? "—"}
                        </p>
                        <p className="mt-0.5 text-xs text-white/40">
                            {topNeighborhood?.count ?? 0} propiedades registradas
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 mb-2 text-violet-300">
                            <Sparkles size={13} />
                            <p className="text-[11px] font-bold uppercase tracking-wide">
                                Nivel de calidad más común
                            </p>
                        </div>
                        <p className="text-lg font-bold text-white">
                            {topQualityBucket.label}/10
                        </p>
                        <p className="mt-0.5 text-xs text-white/40">
                            {topQualityBucket.count} propiedades en este rango
                        </p>
                    </div>
                </div>
            </div>

            {/* Estadísticas promedio */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.06 }}
                className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
            >
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
            </motion.div>

            {/* Distribuciones */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                
                {/* Distribución por Calidad */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.06 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b1a] p-6 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />
                    
                    <div className="relative">
                        {/* TÍTULOS RESTAURADOS */}
                        <motion.p variants={fadeUp} className="text-sm font-bold text-white mb-1">
                            Distribución por calidad
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-xs text-white/40 mb-6">
                            Cantidad de propiedades según su puntuación (1 al 10)
                        </motion.p>
                        
                        <VerticalBarChart 
                            data={qualityDistribution.map(b => ({ label: b.label, count: b.count }))} 
                            max={maxQualityCount} 
                            total={totalProperties} 
                        />
                    </div>
                </motion.div>

                {/* Propiedades por Zona */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.06 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b1a] p-6 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-2xl" />

                    <div className="relative">
                        {/* TÍTULOS RESTAURADOS */}
                        <motion.p variants={fadeUp} className="text-sm font-bold text-white mb-1">
                            Propiedades por zona
                        </motion.p>
                        <motion.p variants={fadeUp} className="text-xs text-white/40 mb-6">
                            Cantidad de propiedades registradas en cada vecindario
                        </motion.p>

                        <VerticalBarChart 
                            data={neighborhoodDistribution.map(n => ({ label: n.neighborhood, count: n.count }))} 
                            max={maxNeighborhoodCount} 
                            total={totalProperties} 
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}