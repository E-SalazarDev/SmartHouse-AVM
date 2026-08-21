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
    ArrowRight,
    Info,
    Database,
    Cpu,
} from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

const flowSteps = [
    { icon: Home, label: "Propiedad", desc: "Datos de la vivienda" },
    { icon: Settings2, label: "Procesamiento", desc: "Limpieza y transformación" },
    { icon: Brain, label: "Modelo de IA", desc: "Random Forest entrenado" },
    { icon: Wallet, label: "Valor estimado", desc: "Predicción de precio" },
];

const features = [
    { icon: Home, label: "Propiedad", desc: "Tipo y zona" },
    { icon: Ruler, label: "Superficie", desc: "Área habitable" },
    { icon: Sparkles, label: "Calidad", desc: "Escala 1 – 10" },
    { icon: Calendar, label: "Antigüedad", desc: "Año de construcción" },
    { icon: Car, label: "Garaje", desc: "Capacidad" },
    { icon: Bath, label: "Baños", desc: "Completos" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

function FlowStep({ icon: Icon, label, desc, index }) {
    return (
        <motion.div variants={fadeUp} className="relative flex flex-col items-center text-center">
            <motion.div
                animate={{
                    boxShadow: [
                        "0 0 0px 0px rgba(99,102,241,0)",
                        "0 0 16px 3px rgba(99,102,241,0.35)",
                        "0 0 0px 0px rgba(99,102,241,0)",
                    ],
                }}
                transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.6,
                }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-linear-to-br from-indigo-500/30 to-violet-700/20 text-indigo-300"
            >
                <Icon size={22} />
            </motion.div>
            <p className="mt-3 text-sm font-bold text-white">{label}</p>
            <p className="mt-0.5 text-xs text-white/40">{desc}</p>
        </motion.div>
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

            {/* Flujo general */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.12 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-8"
            >
                <div className="pointer-events-none absolute -left-16 top-1/2 h-44 w-60 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 top-0 h-28 w-44 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

                <motion.p
                    variants={fadeUp}
                    className="relative mb-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300/75"
                >
                    Flujo del modelo
                </motion.p>

                <div className="relative">
                    {/* Track continuo — una sola línea, un solo pulso de extremo a extremo */}
                    <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px md:block">
                        <div className="absolute inset-0 bg-white/10" />
                        <motion.div
                            className="absolute inset-y-0 w-24 rounded-full bg-linear-to-r from-transparent via-indigo-400 to-transparent"
                            animate={{ left: ["-10%", "100%"] }}
                            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="relative grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
                        {flowSteps.map((step, index) => (
                            <FlowStep key={step.label} {...step} index={index} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Características principales */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.08 }}
                className="rounded-2xl border border-slate-100 bg-white p-5 md:p-6"
            >
                <motion.div variants={fadeUp} className="flex items-center gap-2.5 mb-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <Cpu size={15} />
                    </div>
                    <p className="text-sm font-bold text-slate-950">
                        ¿Qué factores analiza SmartHouse?
                    </p>
                </motion.div>
                <motion.p variants={fadeUp} className="mb-5 pl-10.5 text-xs text-slate-400">
                    El modelo utiliza más de 79 variables en total — aquí se muestran las más representativas.
                </motion.p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.label}
                                variants={fadeUp}
                                whileHover={{ y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-colors hover:border-violet-200 hover:bg-violet-50/50"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm mb-3">
                                    <Icon size={16} />
                                </div>
                                <p className="text-sm font-bold text-slate-950">{feature.label}</p>
                                <p className="mt-0.5 text-xs text-slate-500">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
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

                <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                                <Database size={15} />
                            </div>
                            <p className="text-sm font-bold text-white">
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

                    <div className="flex flex-row items-center gap-2 md:flex-col md:items-stretch">
                        {["Datos históricos", "Entrenamiento", "Modelo entrenado"].map(
                            (label, index, arr) => (
                                <div key={label} className="flex items-center gap-2 md:flex-col">
                                    {index === arr.length - 1 ? (
                                        <motion.span
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0px 0px rgba(124,58,255,0)",
                                                    "0 0 12px 3px rgba(124,58,255,0.35)",
                                                    "0 0 0px 0px rgba(124,58,255,0)",
                                                ],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="whitespace-nowrap rounded-full border border-violet-400/30 bg-violet-500/15 px-3.5 py-1.5 text-xs font-bold text-violet-200"
                                        >
                                            {label}
                                        </motion.span>
                                    ) : (
                                        <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/60">
                                            {label}
                                        </span>
                                    )}
                                    {index < arr.length - 1 && (
                                        <ArrowRight className="h-3 w-3 text-white/20 md:rotate-90" />
                                    )}
                                </div>
                            )
                        )}
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