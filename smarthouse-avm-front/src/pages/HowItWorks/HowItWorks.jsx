import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    ArrowRight,
    Zap,
    BarChart3,
    Layers,
    ScanLine
} from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";

// --- CONFIGURACIÓN DE ANIMACIÓN ---
const FLOW_DURATION = 6; // Duración total del ciclo

const flowSteps = [
    { icon: Home, label: "Propiedad", desc: "Datos de la vivienda", detail: "INPUT", color: "text-blue-400", borderColor: "border-blue-500/40", bgColor: "bg-blue-500/10", glowColor: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]" },
    { icon: Settings2, label: "Procesamiento", desc: "Limpieza y transformación", detail: "ETL", color: "text-amber-400", borderColor: "border-amber-500/40", bgColor: "bg-amber-500/10", glowColor: "shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]" },
    { icon: Brain, label: "Modelo de IA", desc: "Random Forest entrenado", detail: "INFERENCIA", color: "text-violet-400", borderColor: "border-violet-500/40", bgColor: "bg-violet-500/10", glowColor: "shadow-[0_0_30px_-5px_rgba(124,58,255,0.4)]" },
    { icon: Wallet, label: "Valor estimado", desc: "Predicción de precio", detail: "OUTPUT", color: "text-emerald-400", borderColor: "border-emerald-500/40", bgColor: "bg-emerald-500/10", glowColor: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]" },
];

const features = [
    { icon: Home, label: "Propiedad", desc: "Tipo y zona", value: "Ubicación" },
    { icon: Ruler, label: "Superficie", desc: "Área habitable", value: "m²" },
    { icon: Sparkles, label: "Calidad", desc: "Escala 1 – 10", value: "Índice" },
    { icon: Calendar, label: "Antigüedad", desc: "Año de construcción", value: "Años" },
    { icon: Car, label: "Garaje", desc: "Capacidad", value: "Espacios" },
    { icon: Bath, label: "Baños", desc: "Completos", value: "Unidades" },
];

const trainingSteps = [
    { icon: Database, label: "Datos históricos", desc: "Miles de registros reales de propiedades" },
    { icon: Cpu, label: "Entrenamiento", desc: "El modelo ajusta sus parámetros" },
    { icon: CheckCircle2, label: "Modelo entrenado", desc: "Listo para predecir nuevos casos" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// --- COMPONENTE DE FLUJO REDISEÑADO ---
function ModernFlowDiagram() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <div ref={ref} className="relative w-full py-16">
            {/* Línea de conexión central */}
            <div className="absolute top-[40%] left-[5%] right-[5%] hidden h-[2px] -translate-y-1/2 md:block">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-amber-500/20 to-emerald-500/20" />
                
                {/* Haz de luz viajando */}
                <motion.div
                    className="absolute top-1/2 h-[2px] w-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ duration: FLOW_DURATION, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Grid de Pasos */}
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-4">
                {flowSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === flowSteps.length - 1;
                    
                    return (
                        <motion.div
                            key={step.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Contenedor del Nodo (Círculos Concéntricos) */}
                            <div className="relative z-10 flex h-32 w-32 items-center justify-center">
                                
                                {/* Anillo Exterior Punteado (Órbita) - Más grueso */}
                                <motion.div 
                                    className={`absolute inset-0 rounded-full border-2 border-dashed ${step.borderColor} opacity-60`}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Núcleo del Nodo (Círculo Interior) */}
                                <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border ${step.borderColor} ${step.bgColor} ${step.glowColor} backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white/40`}>
                                    {/* Brillo interno sutil */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    
                                    <Icon size={32} className={`${step.color} transition-all duration-500 group-hover:scale-110`} />
                                </div>

                                {/* Etiqueta de estado (INPUT, ETL, etc.) */}
                                <div className="absolute -top-3 -right-2 rounded-full border border-white/10 bg-[#0f0e22] px-3 py-1 text-[10px] font-bold tracking-wider text-white/70 shadow-lg z-30">
                                    {step.detail}
                                </div>
                            </div>

                            {/* Texto descriptivo */}
                            <div className="mt-6 space-y-2">
                                <h3 className="text-base font-bold text-white tracking-tight">{step.label}</h3>
                                <p className="text-sm text-white/40">{step.desc}</p>
                            </div>

                            {/* Indicador de conexión móvil */}
                            {!isLast && (
                                <div className="mt-6 flex flex-col items-center gap-1 text-white/20 md:hidden">
                                    <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
                                    <ArrowRight size={16} className="rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// --- TARJETA DE FACTOR ---
function FeatureCard({ icon: Icon, label, desc, value, index }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-[0_20px_40px_-15px_rgba(124,58,255,0.15)]"
        >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-violet-100/50 to-fuchsia-100/30 blur-2xl transition-opacity group-hover:opacity-100" />
            
            <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    {value}
                </span>
            </div>

            <div className="relative mt-5">
                <h4 className="text-sm font-bold text-slate-900">{label}</h4>
                <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
            </div>
            
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
        </motion.div>
    );
}

// --- TIMELINE DE ENTRENAMIENTO ---
function TrainingTimeline() {
    return (
        <div className="relative flex flex-col gap-0">
            {trainingSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === trainingSteps.length - 1;
                
                return (
                    <div key={step.label} className="relative flex gap-5">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                                    isLast
                                        ? "border-violet-500 bg-violet-500/20 text-violet-300"
                                        : "border-white/10 bg-white/5 text-white/40"
                                }`}
                            >
                                <Icon size={16} />
                                {isLast && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border border-violet-400"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </motion.div>
                            
                            {!isLast && (
                                <div className="my-1 h-full w-px flex-1 bg-gradient-to-b from-white/10 to-white/5" />
                            )}
                        </div>

                        <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                            <h4 className={`text-sm font-bold ${isLast ? "text-violet-300" : "text-white"}`}>
                                {step.label}
                            </h4>
                            <p className="mt-1 text-xs text-white/40 max-w-xs">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// --- COMPONENTE PRINCIPAL ---
export default function HowItWorks() {
    const estimatedValue = useCountUp(208199, 1400, 0);

    return (
        <div className="w-full rounded-3xl border border-slate-200 bg-[#f8f9fc] p-4 md:p-8 shadow-2xl flex flex-col gap-8">
            
            {/* --- HEADER --- */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 mb-4">
                    <Zap size={12} className="text-violet-600" />
                    <span className="text-[11px] font-bold tracking-wider uppercase text-violet-700">
                        SmartHouse AVM
                    </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
                    ¿Cómo funciona nuestro sistema de valuación?
                </h1>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                    Un <strong className="text-slate-800">AVM (Automated Valuation Model)</strong> es
                    un sistema que utiliza datos y modelos de Machine Learning para estimar
                    automáticamente el valor de una propiedad, sin necesidad de una
                    tasación manual.
                </p>
            </motion.div>

            {/* --- SECCIÓN 1: FLUJO DEL MODELO --- */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0b1a] p-6 md:p-10 shadow-2xl"
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px]" />
                <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-fuchsia-600/20 blur-[100px]" />

                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <ScanLine size={18} className="text-violet-400" />
                                Pipeline de Datos
                            </h2>
                            <p className="text-xs text-white/40 mt-1">
                                Flujo secuencial desde la captura de datos hasta la predicción final
                            </p>
                        </div>
                    </div>

                    <ModernFlowDiagram />
                </div>
            </motion.div>

            {/* --- SECCIÓN 2: FACTORES --- */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20">
                            <Layers size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-950">
                                ¿Qué factores analiza SmartHouse?
                            </h2>
                            <p className="text-xs text-slate-400">
                                El modelo utiliza más de 79 variables en total.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-100">
                        <BarChart3 size={14} className="text-violet-500" />
                        <span className="text-[11px] font-semibold text-slate-600">
                            Top 6 variables representativas
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.label} {...feature} index={index} />
                    ))}
                </div>
            </motion.div>

            {/* --- SECCIÓN 3: ENTRENAMIENTO --- */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0b1a] p-6 md:p-10 shadow-2xl"
            >
                <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-[80px]" />
                
                <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                                <Database size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-white">
                                Entrenamiento del modelo
                            </h2>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">
                            SmartHouse AVM utiliza un modelo <strong className="text-white/80">Random Forest</strong> entrenado con
                            miles de registros históricos de propiedades. Durante el
                            entrenamiento, el modelo aprende la relación entre las
                            características de una vivienda y su precio de venta real.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <p className="text-2xl font-bold text-white">79+</p>
                                <p className="text-xs text-white/40">Variables analizadas</p>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                                <p className="text-2xl font-bold text-white">10k+</p>
                                <p className="text-xs text-white/40">Registros históricos</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                        <TrainingTimeline />
                    </div>
                </div>
            </motion.div>

            {/* --- SECCIÓN 4: EJEMPLO DE PREDICCIÓN --- */}
            <motion.div
                ref={estimatedValue.ref}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] p-6 md:p-8 shadow-2xl"
            >
                <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative flex items-center gap-2 mb-6">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20">
                        <Info size={12} className="text-amber-300" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300/90">
                        Ejemplo de resultado — no es una valuación real
                    </span>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                            Valor estimado
                        </p>
                        <p className="text-5xl md:text-6xl font-black text-white tracking-tight">
                            ${estimatedValue.value.toLocaleString("es-MX")}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Así se ve el resultado que entrega el modelo al procesar las
                            características de una propiedad real. Para obtener una
                            estimación de verdad, elige cualquier propiedad del catálogo
                            en <strong className="text-white/80">Explorar</strong> y calcula su precio con IA.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}