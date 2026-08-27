import { motion } from "framer-motion";
import {
    Home,
    Ruler,
    Sparkles,
    Calendar,
    Car,
    Bath,
    Settings2,
    Brain,
    Wallet,
    Info,
    Database,
    Cpu,
    CheckCircle2,
} from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

const FLOW_DURATION = 5;

const flowSteps = [
    { icon: Home, label: "Propiedad", desc: "Datos de la vivienda" },
    { icon: Settings2, label: "Procesamiento", desc: "Limpieza y transformación" },
    { icon: Brain, label: "Modelo de IA", desc: "Random Forest entrenado" },
    { icon: Wallet, label: "Valor estimado", desc: "Predicción de precio" },
];

const NODE_X = [60, 353, 647, 940];
const NODE_Y = 110;
const NODE_SIZE = 84;

const PARTICLE_COLORS = ["#a78bfa", "#818cf8", "#e879f9", "#34d399"];

const features = [
    { icon: Home, label: "Propiedad", desc: "Tipo y zona" },
    { icon: Ruler, label: "Superficie", desc: "Área habitable" },
    { icon: Sparkles, label: "Calidad", desc: "Escala 1 – 10" },
    { icon: Calendar, label: "Antigüedad", desc: "Año de construcción" },
    { icon: Car, label: "Garaje", desc: "Capacidad" },
    { icon: Bath, label: "Baños", desc: "Completos" },
];

const trainingSteps = [
    { icon: Database, label: "Datos históricos", desc: "Miles de registros reales de propiedades" },
    { icon: Cpu, label: "Entrenamiento", desc: "El modelo ajusta sus parámetros" },
    { icon: CheckCircle2, label: "Modelo entrenado", desc: "Listo para predecir nuevos casos" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

function FlowDiagram() {
    const pathD = `M${NODE_X[0]},${NODE_Y} L${NODE_X[3]},${NODE_Y}`;

    return (
        <svg viewBox="0 0 1000 220" className="w-full">
            <defs>
                <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Trazo base — estático, siempre detrás por orden de dibujo */}
            <path
                d={pathD}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="2.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
                fill="none"
            />

            {/* Paquete de datos viajando sobre el trazo, cambiando de color por tramo */}
            <motion.circle
                r="6"
                animate={{
                    cx: [NODE_X[0], NODE_X[3]],
                    fill: PARTICLE_COLORS,
                }}
                transition={{
                    cx: { duration: FLOW_DURATION, repeat: Infinity, ease: "linear" },
                    fill: { duration: FLOW_DURATION, repeat: Infinity, ease: "linear" },
                }}
                cy={NODE_Y}
                style={{ filter: "drop-shadow(0 0 7px rgba(165,180,252,0.9))" }}
            />

            {/* Nodos — dibujados después del trazo y el punto, relleno sólido: siempre encima */}
            {flowSteps.map((step, index) => {
                const x = NODE_X[index];
                const delay = (index / (flowSteps.length - 1)) * FLOW_DURATION;
                const Icon = step.icon;

                return (
                    <g key={step.label}>
                        <motion.rect
                            x={x - NODE_SIZE / 2}
                            y={NODE_Y - NODE_SIZE / 2}
                            width={NODE_SIZE}
                            height={NODE_SIZE}
                            rx="18"
                            fill="#181433"
                            stroke="rgba(99,102,241,0.4)"
                            strokeWidth="2"
                            animate={{
                                stroke: [
                                    "rgba(99,102,241,0.4)",
                                    "rgba(199,210,254,0.95)",
                                    "rgba(99,102,241,0.4)",
                                ],
                                filter: [
                                    "url(#nodeGlow) opacity(0)",
                                    "url(#nodeGlow) opacity(1)",
                                    "url(#nodeGlow) opacity(0)",
                                ],
                            }}
                            transition={{
                                duration: 0.7,
                                delay,
                                repeat: Infinity,
                                repeatDelay: FLOW_DURATION - 0.7,
                                ease: "easeInOut",
                            }}
                        />

                        <foreignObject
                            x={x - 16}
                            y={NODE_Y - 16}
                            width="32"
                            height="32"
                        >
                            <div className="flex h-full w-full items-center justify-center text-indigo-300">
                                <Icon size={28} />
                            </div>
                        </foreignObject>
                    </g>
                );
            })}
        </svg>
    );
}

function FeatureCard({ icon: Icon, label, desc, index }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-12px_rgba(15,23,42,0.15)] transition-shadow hover:shadow-[0_20px_44px_-20px_rgba(124,58,255,0.4)]"
        >
            <span className="absolute right-3.5 top-3 text-[11px] font-black text-slate-100 transition-colors group-hover:text-violet-100">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-110">
                <Icon size={18} />
            </div>

            <p className="text-sm font-bold text-slate-950">{label}</p>
            <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
        </motion.div>
    );
}

function TrainingStep({ icon: Icon, label, desc, isLast }) {
    return (
        <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
                <motion.div
                    animate={
                        isLast
                            ? {
                                  boxShadow: [
                                      "0 0 0px 0px rgba(124,58,255,0)",
                                      "0 0 18px 4px rgba(124,58,255,0.45)",
                                      "0 0 0px 0px rgba(124,58,255,0)",
                                  ],
                              }
                            : {}
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        isLast
                            ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                            : "border-white/10 bg-white/5 text-white/50"
                    }`}
                >
                    <Icon size={17} />
                </motion.div>
                {!isLast && <div className="mt-1 h-full w-px flex-1 bg-white/10" />}
            </div>

            <div className="pb-6">
                <p className={`text-sm font-bold ${isLast ? "text-violet-200" : "text-white"}`}>
                    {label}
                </p>
                <p className="mt-0.5 text-xs text-white/40">{desc}</p>
            </div>
        </div>
    );
}

export default function HowItWorks() {
    const estimatedValue = useCountUp(208199, 1400, 0);

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-600/70">
                    SmartHouse AVM
                </span>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-950">
                    ¿Cómo funciona nuestro sistema de valuación?
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Un <strong className="text-slate-700">AVM (Automated Valuation Model)</strong> es
                    un sistema que utiliza datos y modelos de Machine Learning para estimar
                    automáticamente el valor de una propiedad, sin necesidad de una
                    tasación manual.
                </p>
            </motion.div>

            {/* Flujo general — diagrama técnico en SVG */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-8"
            >
                <div className="pointer-events-none absolute -left-16 top-1/2 h-44 w-60 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 top-0 h-28 w-44 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

                <motion.p
                    variants={fadeUp}
                    className="relative mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300/75"
                >
                    Flujo del modelo
                </motion.p>

                <FlowDiagram />

                <div className="mt-2 grid grid-cols-2 gap-y-4 md:grid-cols-4">
                    {flowSteps.map((step) => (
                        <div key={step.label} className="text-center">
                            <p className="text-sm font-bold text-white">{step.label}</p>
                            <p className="mt-0.5 text-xs text-white/40">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Características principales */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 md:p-6"
            >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-100/60 blur-3xl" />

                <motion.div variants={fadeUp} className="relative flex items-center gap-3 mb-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
                        <Cpu size={17} />
                    </div>
                    <p className="text-base font-bold text-slate-950">
                        ¿Qué factores analiza SmartHouse?
                    </p>
                </motion.div>
                <motion.p variants={fadeUp} className="relative mb-6 pl-13 text-xs text-slate-400">
                    El modelo utiliza más de 79 variables en total — aquí se muestran las más representativas.
                </motion.p>

                <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.label} {...feature} index={index} />
                    ))}
                </div>
            </motion.div>

            {/* Modelo entrenado */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-8"
            >
                <div className="pointer-events-none absolute -right-14 bottom-0 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

                <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                                <Database size={16} />
                            </div>
                            <p className="text-base font-bold text-white">
                                Entrenamiento del modelo
                            </p>
                        </div>

                        <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
                            SmartHouse AVM utiliza un modelo Random Forest entrenado con
                            miles de registros históricos de propiedades. Durante el
                            entrenamiento, el modelo aprende la relación entre las
                            características de una vivienda (superficie, calidad,
                            ubicación, año de construcción, garaje, entre otras) y su
                            precio de venta real.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        {trainingSteps.map((step, index) => (
                            <TrainingStep
                                key={step.label}
                                {...step}
                                isLast={index === trainingSteps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Ejemplo de predicción */}
            <motion.div
                ref={estimatedValue.ref}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-7"
            >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative flex items-center gap-2 mb-4">
                    <Info size={14} className="text-amber-300" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-amber-300">
                        Ejemplo de resultado — no es una valuación real
                    </span>
                </div>

                <p className="relative text-xs font-semibold uppercase tracking-widest text-white/40">
                    Valor estimado
                </p>
                <p className="relative mt-1 text-4xl md:text-5xl font-black text-white">
                    ${estimatedValue.value.toLocaleString("es-MX")}
                </p>
                <p className="relative mt-2 max-w-xl text-sm text-white/50">
                    Así se ve el resultado que entrega el modelo al procesar las
                    características de una propiedad real. Para obtener una
                    estimación de verdad, elige cualquier propiedad del catálogo
                    en Explorar y calcula su precio con IA.
                </p>
            </motion.div>
        </div>
    );
}