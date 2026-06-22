import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Brain, Database, BadgeCheck } from "lucide-react";
import {
    factors,
    tentaclePositions,
    tentaclePaths,
    tentacleChipClass,
} from "../constants/factorsData";

const ROTATE_EVERY_MS = 9000;

// Elige 6 factores al azar (para el círculo) de un set de 8, y devuelve también
// los 2 restantes (para el grid de abajo). Mezcla con Fisher-Yates para que la
// selección sea uniforme.
function pickRandomSplit(all, countInCircle) {
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return {
        inCircle: shuffled.slice(0, countInCircle),
        rest: shuffled.slice(countInCircle),
    };
}

// Para cada rotación elige también, por posición, una variante de curva al azar
// entre las 3 disponibles, así el tentáculo "se mueve" distinto cada vez.
function pickPathVariants(positions) {
    const out = {};
    positions.forEach((pos) => {
        const variants = tentaclePaths[pos];
        out[pos] = variants[Math.floor(Math.random() * variants.length)];
    });
    return out;
}

function TentacleChip({ item, position, pathVariant }) {
    const Icon = item.icon;
    const isLeft = position.startsWith("left");
    const isRight = position.startsWith("right");
    const reverse = isRight;

    return (
        <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 110, damping: 16 }}
            whileHover={{ scale: 1.05 }}
            className={`${tentacleChipClass[position]} z-30 flex items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white/95 px-2 py-1.5 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.55)] backdrop-blur max-w-[88px] ${
                reverse ? "flex-row-reverse" : ""
            }`}
        >
            <div className="h-6 w-6 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                <Icon className="w-3 h-3 text-indigo-600" />
            </div>
            <span className="text-[10px] font-semibold text-slate-700 truncate">
                {item.label}
            </span>
        </motion.div>
    );
}

function RestFactorCard({ item }) {
    const Icon = item.icon;
    return (
        <motion.div
            key={item.key}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.4)]"
        >
            <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 truncate">{item.value}</p>
            </div>
        </motion.div>
    );
}

export default function AiValuationCard() {
    const [split, setSplit] = useState(() => pickRandomSplit(factors, 6));
    const [pathVariants, setPathVariants] = useState(() => pickPathVariants(tentaclePositions));
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSplit(pickRandomSplit(factors, 6));
            setPathVariants(pickPathVariants(tentaclePositions));
        }, ROTATE_EVERY_MS);
        return () => clearInterval(intervalRef.current);
    }, []);

    // Asigna cada factor elegido a una posición fija (top, bottom, left_high...)
    const assigned = useMemo(() => {
        const map = {};
        tentaclePositions.forEach((pos, i) => {
            map[pos] = split.inCircle[i];
        });
        return map;
    }, [split]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="relative rounded-4xl overflow-hidden border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] p-6"
        >
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            SmartHouse AI
                        </p>
                        <h3 className="text-lg font-bold text-slate-950">
                            Motor de valuación
                        </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Activo
                    </span>
                </div>

                {/* Núcleo con tentáculos curvos */}
                <div className="relative mx-auto h-[460px] w-[164px]">
                    <svg
                        className="absolute z-0 h-full w-full"
                        viewBox="0 0 164 460"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <defs>
                            <linearGradient id="neuralLine" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                                <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>

                        <AnimatePresence mode="popLayout">
                            {tentaclePositions.map((pos, index) => (
                                <motion.path
                                    key={`${pos}-${pathVariants[pos]}`}
                                    d={pathVariants[pos]}
                                    stroke="url(#neuralLine)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        delay: 0.1 + index * 0.12,
                                        duration: 1.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </AnimatePresence>

                        {tentaclePositions.map((pos, index) => (
                            <motion.circle
                                key={`${pos}-pulse-${pathVariants[pos]}`}
                                r="4"
                                fill="#8b5cf6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    delay: 1 + index * 0.3,
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 2.4,
                                }}
                            >
                                <animateMotion
                                    dur="3.2s"
                                    repeatCount="indefinite"
                                    path={pathVariants[pos]}
                                />
                            </motion.circle>
                        ))}
                    </svg>

                    {/* Centro: aro punteado + halo + bola morada, anclados al medio del núcleo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="absolute h-24 w-24 rounded-full border border-dashed border-indigo-300/70"
                        />

                        <motion.div
                            animate={{
                                rotate: 360,
                                background: [
                                    "conic-gradient(from 0deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                    "conic-gradient(from 180deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                    "conic-gradient(from 360deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                ],
                            }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 5.5, ease: "linear" },
                                background: { repeat: Infinity, duration: 5.5, ease: "linear" },
                            }}
                            className="absolute h-28 w-28 rounded-full opacity-60 blur-[1px]"
                        />

                        <div className="absolute h-20 w-20 rounded-full bg-white" />

                        <motion.div
                            animate={{ y: [0, -6, 0], rotate: [-1.2, 1.2, -1.2] }}
                            transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
                            className="relative z-20 h-14 w-14 rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-[0_24px_50px_-16px_rgba(99,102,241,0.75)]"
                        >
                            <Home className="w-7 h-7 text-white" />
                        </motion.div>
                    </div>

                    {/* Los 6 chips flotantes en sus posiciones fijas, contenido rotando */}
                    <AnimatePresence mode="wait">
                        {tentaclePositions.map((pos) => (
                            <TentacleChip
                                key={`${pos}-${assigned[pos]?.key}`}
                                item={assigned[pos]}
                                position={pos}
                                pathVariant={pathVariants[pos]}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Grid 2 columnas: los factores que NO están en el círculo esta ronda */}
                <div className="grid grid-cols-2 gap-3">
                    <AnimatePresence mode="popLayout">
                        {split.rest.map((item) => (
                            <RestFactorCard key={item.key} item={item} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Panel modelo predictivo */}
                <div className="rounded-3xl border border-slate-200/80 bg-slate-950 text-white p-4 shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-4 h-4 text-indigo-300" />
                        <p className="text-sm font-semibold">Modelo predictivo</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <p className="text-lg font-bold">94.2%</p>
                            <p className="text-[11px] text-slate-400">precisión</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">79</p>
                            <p className="text-[11px] text-slate-400">variables</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">38K</p>
                            <p className="text-[11px] text-slate-400">registros</p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-300" />
                            <span className="text-xs text-slate-300">
                                Random Forest Regressor
                            </span>
                        </div>
                        <BadgeCheck className="w-4 h-4 text-emerald-300" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}