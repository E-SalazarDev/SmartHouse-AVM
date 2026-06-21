import { motion } from "framer-motion";
import {
    Home,
    MapPin,
    Ruler,
    Star,
    Car,
    BedDouble,
    Calendar,
    ChefHat,
    BrainCircuit,
} from "lucide-react";

export default function AiNeuralHouseCard() {
    const nodes = [
        { label: "Ubicación", value: "CollgCr", icon: MapPin, x: 42, y: 110 },
        { label: "Área habitable", value: "1710 ft²", icon: Ruler, x: 258, y: 110 },
        { label: "Calidad general", value: "7 / 10", icon: Star, x: 42, y: 205 },
        { label: "Garaje", value: "2 autos", icon: Car, x: 258, y: 205 },
        { label: "Habitaciones", value: "3", icon: BedDouble, x: 42, y: 300 },
        { label: "Año construido", value: "2003", icon: Calendar, x: 258, y: 300 },
        { label: "Calidad cocina", value: "Buena", icon: ChefHat, x: 150, y: 348 },
    ];

    const lines = [
        [210, 160, 100, 140],
        [210, 160, 320, 140],
        [210, 160, 100, 235],
        [210, 160, 320, 235],
        [210, 160, 100, 330],
        [210, 160, 320, 330],
        [210, 160, 210, 380],
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
            className="relative min-h-96 rounded-[1.75rem] overflow-hidden border border-slate-200 
            bg-white shadow-[0_20px_45px_-12px_rgba(15,23,42,0.25)] p-4"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%)]" />

            <div className="relative mx-auto h-[430px] max-w-[430px]">
                <div className="absolute left-1/2 top-3 z-40 -translate-x-1/2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur">
                        <BrainCircuit className="h-4 w-4 text-indigo-500" />
                        <span className="text-xs font-semibold text-slate-600">
                            Modelo AVM inteligente
                        </span>
                    </div>
                </div>

                <svg
                    className="absolute inset-0 z-0 h-full w-full"
                    viewBox="0 0 420 430"
                    fill="none"
                >
                    {lines.map(([x1, y1, x2, y2], index) => (
                        <motion.line
                            key={index}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(99,102,241,0.35)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="6 8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: [0.25, 0.8, 0.25],
                            }}
                            transition={{
                                pathLength: {
                                    delay: 0.25 + index * 0.08,
                                    duration: 0.8,
                                    ease: "easeOut",
                                },
                                opacity: {
                                    repeat: Infinity,
                                    duration: 2.8,
                                    delay: index * 0.18,
                                    ease: "easeInOut",
                                },
                            }}
                        />
                    ))}
                </svg>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                    className="absolute left-1/2 top-[105px] z-10 h-32 w-32 -translate-x-1/2 rounded-full 
                    border border-dashed border-indigo-300/70"
                />

                <motion.div
                    animate={{ y: [0, -7, 0], rotate: [-1, 1, -1] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute left-1/2 top-[118px] z-30 flex h-24 w-24 -translate-x-1/2 items-center justify-center 
                    rounded-[1.75rem] bg-linear-to-br from-indigo-500 to-purple-500 shadow-2xl shadow-indigo-500/35"
                >
                    <Home className="h-12 w-12 text-white" />
                </motion.div>

                {nodes.map((node, index) => {
                    const Icon = node.icon;

                    return (
                        <motion.div
                            key={node.label}
                            initial={{ opacity: 0, y: 10, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.45 + index * 0.1,
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                left: node.x,
                                top: node.y,
                            }}
                            className="absolute z-40"
                        >
                            <motion.div
                                animate={{ y: [0, -3, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3.6,
                                    delay: index * 0.2,
                                    ease: "easeInOut",
                                }}
                                className="w-[120px] rounded-2xl border border-slate-200 bg-white/90 px-3 py-2.5 
                                shadow-lg shadow-slate-900/10 backdrop-blur"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                                        <Icon className="h-4 w-4 text-indigo-600" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-[10px] font-semibold text-slate-500">
                                            {node.label}
                                        </p>
                                        <p className="truncate text-sm font-bold text-slate-800">
                                            {node.value}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}