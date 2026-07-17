import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Home, ClipboardCheck, ShieldCheck, Hammer, BadgePercent } from "lucide-react";
import img from "../../../assets/house.png";

export default function HomeHero() {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    // Coordenadas 
    const scanPoints = [
        {
            id: 1,
            top: "15%",
            left: "15%", // Más al centro, sobre el techo/ventanal superior izquierdo
            title: "Características principales",
            desc: "Evaluación de la distribución del espacio arquitectónico, altura y zonas comunes.",
            icon: Home,
        },
        {
            id: 2,
            top: "28%",
            left: "75%", // Al extremo derecho, sobre la recámara del segundo piso
            title: "Calidad y condición",
            desc: "Análisis técnico de acabados generales, estado de la fachada y diseño exterior.",
            icon: ClipboardCheck,
        },
        {
            id: 3,
            top: "48%",
            left: "35%", // Centrado, sobre la zona de las escaleras internas
            title: "Calidad de áreas clave",
            desc: "Inspección predictiva de los niveles de equipamiento en cocina y zonas de servicio.",
            icon: Hammer,
        },
        {
            id: 4,
            top: "72%",
            left: "10%", // Abajo a la izquierda, cerca del acceso principal
            title: "Terreno y construcción",
            desc: "Cálculo de la superficie del lote, dimensiones de frente y año de edificación.",
            icon: ShieldCheck,
        },
        {
            id: 5,
            top: "78%",
            left: "68%", // Abajo a la derecha, sobre el jardín frontal/cochera
            title: "Garaje y condiciones",
            desc: "Clasificación del tipo de cochera y variables contextuales del mercado actual.",
            icon: BadgePercent,
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950 p-1.5 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.6)]"
        >
            <div className="relative h-[65vh] min-h-130 max-h-187.5 w-full overflow-hidden rounded-[1.75rem]">
                
                <img
                    src={img}
                    alt="Propiedad analizada por IA"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Filtro original */}
                <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 items-center px-6 sm:px-10 md:px-16 lg:px-20 gap-8">
                    
                    {/* COLUMNA IZQUIERDA */}
                    <div className="col-span-1 md:col-span-7 flex flex-col items-center text-center justify-center md:items-start md:text-left h-full">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-indigo-300" />
                            <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                                Automated Valuation Model
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-2xl tracking-tight"
                        >
                            Valuación inmobiliaria impulsada por{" "}
                            <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-cyan-200 bg-clip-text text-transparent block sm:inline">
                                inteligencia artificial
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                            className="mt-4 text-sm sm:text-base text-white/75 max-w-lg leading-relaxed"
                        >
                            Analiza propiedades, ubicación, características técnicas y
                            comparables del mercado para estimar valores de vivienda con
                            una experiencia rápida, visual y profesional.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.5 }}
                            className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                        >
                            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]">
                                Empezar valuación
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </button>

                            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-[0.98]">
                                Explorar propiedades
                            </button>
                        </motion.div>
                    </div>

                    {/* COLUMNA DERECHA Puntos interactivos */}
                    <div className="hidden md:block col-span-5 relative h-full w-full">
                        {scanPoints.map((point) => {
                            const IconComponent = point.icon;
                            return (
                                <div
                                    key={point.id}
                                    className="absolute"
                                    style={{ top: point.top, left: point.left }}
                                >
                                    <div className="relative flex items-center justify-center">
                                        {/* Anillo de escaneo dinámico */}
                                        <div className="absolute h-12 w-12 rounded-full bg-cyan-400/25 animate-ping" />
                                        
                                        {/* Pin interactivo grande */}
                                        <button
                                            onMouseEnter={() => setHoveredPoint(point.id)}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-slate-950/85 text-cyan-200 shadow-xl transition-all duration-200 hover:scale-110 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-400"
                                        >
                                            <IconComponent className="h-4.5 w-4.5" />
                                        </button>

                                        {/* Tooltip con descripción corta */}
                                        <AnimatePresence>
                                            {hoveredPoint === point.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    className="absolute bottom-12 left-1/2 z-20 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-950/90 p-3.5 backdrop-blur-md shadow-2xl"
                                                >
                                                    <p className="text-xs font-bold text-white mb-1 tracking-wide">
                                                        {point.title}
                                                    </p>
                                                    <p className="text-[10px] text-white/60 leading-normal">
                                                        {point.desc}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </motion.section>
    );
}