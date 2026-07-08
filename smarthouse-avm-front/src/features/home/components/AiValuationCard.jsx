import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Maximize2,
    BedDouble,
    Bath,
    Warehouse,
    LayoutGrid,
    Flame,
    ArrowRight,
} from "lucide-react";

/*  Características principales  */
const FACTORS = [
    { key: "area", label: "Área habitable", icon: Maximize2, value: "159 m²" },
    { key: "habitaciones", label: "Habitaciones", icon: BedDouble, value: "3 hab." },
    { key: "banos", label: "Baños", icon: Bath, value: "2 completos" },
    { key: "garaje", label: "Garaje", icon: Warehouse, value: "2 autos" },
    { key: "cuartos", label: "Total cuartos", icon: LayoutGrid, value: "8" },
    { key: "chimeneas", label: "Chimeneas", icon: Flame, value: "Ninguna" },
];

/*  Calidad y condición  */
const QUALITY_BARS = [
    { key: "calidad_general", label: "Calidad general", value: "Regular", score: 4, max: 10 },
    { key: "condicion_general", label: "Condición general", value: "Buena", score: 5, max: 10 },
];

/* Rango de confianza de la predicción */
const RANGE = { min: 172, max: 196, estimate: 184, confidence: 94.2 };

/* Contador ligero para el precio */
function useCountUpLocal(target, duration = 1100) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = null;
        let raf;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return value;
}

const ACCENT = "#7c5cff";

export default function AiValuationCard() {
    const price = useCountUpLocal(RANGE.estimate, 1100);
    const rangePct = ((RANGE.estimate - RANGE.min) / (RANGE.max - RANGE.min)) * 100;

    return (
        <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-6 flex flex-col overflow-hidden">

            {/* ── HEADER ── */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-slate-400 mb-1.5">
                        SmartHouse AI
                    </p>
                    <h3 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">
                        Motor de valuación
                    </h3>
                </div>
                <span className="font-mono text-[11px] text-slate-400 border border-slate-200 rounded-full px-3 py-1.5 tracking-wide shrink-0">
                    RF · v2.3
                </span>
            </div>

            {/*  HERO */}
            <div className="relative rounded-2xl px-5 py-5 mb-6 overflow-hidden" style={{ background: "#0b0b12" }}>
                {/* halo de color con respiración lenta y continua */}
                <motion.div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, #c026d3 0%, transparent 70%)", filter: "blur(10px)" }}
                    animate={{ opacity: [0.25, 0.45, 0.25] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative flex items-end justify-between mb-4">
                    <div>
                        <p className="text-[11px] uppercase tracking-[.18em] text-white/40 mb-1.5">
                            Índice de valuación
                        </p>
                        <p
                            className="font-mono font-semibold leading-none tabular-nums bg-clip-text text-transparent"
                            style={{
                                fontSize: "38px",
                                backgroundImage: "linear-gradient(90deg, #ffffff 0%, #e9d5ff 100%)",
                            }}
                        >
                            ${price}K
                        </p>
                        <p className="text-[12px] text-white/40 mt-2">Ames, IA · predicción del modelo</p>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-[13px] text-white/70 tabular-nums leading-none">
                            94.2<span className="text-white/40">%</span>
                        </p>
                        <p className="text-[9px] uppercase tracking-[.12em] text-white/30 mt-1">confianza</p>
                    </div>
                </div>

                {/* rango integrado */}
                <div className="relative">
                    <div className="relative h-1.5 w-full rounded-full bg-white/10">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ width: "100%", background: "linear-gradient(90deg, #7c5cff, #c026d3)", opacity: 0.35 }}
                        />
                        <motion.div
                            className="absolute top-1/2 w-3 h-3 rounded-full"
                            style={{ background: "#e9d5ff", marginTop: "-6px", boxShadow: "0 0 0 3px rgba(224,204,255,0.15)" }}
                            initial={{ left: "0%" }}
                            animate={{ left: `${rangePct}%` }}
                            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                        >
                            <motion.span
                                className="absolute inset-0 rounded-full"
                                style={{ background: "#e9d5ff" }}
                                animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                        <span className="font-mono text-[11px] text-white/45">${RANGE.min}K</span>
                        <span className="font-mono text-[11px] text-white/45">${RANGE.max}K</span>
                    </div>
                </div>
            </div>

            {/*  CARACTERÍSTICAS PRINCIPALES   */}
            <div className="flex items-center gap-3 mb-3 mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-slate-400 whitespace-nowrap">
                    Características principales
                </p>
                <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2">
                {FACTORS.map(({ key, label, icon: Icon, value }, i) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/70 transition-all duration-200"
                    >
                        <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shrink-0">
                            <Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] text-slate-400 leading-none mb-1 uppercase tracking-wider">
                                {label}
                            </p>
                            <p className="font-mono text-[14px] font-semibold text-slate-800 leading-none truncate">
                                {value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/*  CALIDAD Y CONDICIÓN MODERNIZADA  */}
            <div className="flex items-center gap-3 mt-9 mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-slate-400 whitespace-nowrap">
                    Calidad y condición
                </p>
                <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {QUALITY_BARS.map(({ key, label, value, score, max }, i) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="p-3 rounded-xl bg-slate-50/50 border border-slate-100/60"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-medium text-slate-600">{label}</span>
                            <span className="text-[12px] font-medium text-slate-800">
                                {value} <span className="text-slate-400 font-normal">· {score}/{max}</span>
                            </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-200/70 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: ACCENT }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / max) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>


            <div className="flex-1" />

            {/*  FOOTER   */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[13px] font-semibold text-slate-800 leading-tight">
                        Random Forest Regressor
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Scikit-learn · MLflow</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 transition-all duration-200 whitespace-nowrap"
                >
                    Ver detalles
                    <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
            </div>
        </div>
    );
}