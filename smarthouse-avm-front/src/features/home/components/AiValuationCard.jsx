import { motion } from "framer-motion";
import {
    Home,
    MapPin,
    TrendingUp,
    Hammer,
    BarChart3,
    Database,
    Brain,
    BadgeCheck,
} from "lucide-react";

export default function AiValuationCard() {
    const factors = [
        {
            label: "Calidad",
            icon: Hammer,
            className: "left-0 top-14",
            path: "M180 145 C140 135, 125 110, 92 84",
        },
        {
            label: "Comparables",
            icon: BarChart3,
            className: "right-0 top-14",
            path: "M220 145 C260 135, 275 110, 308 84",
        },
        {
            label: "Ubicación",
            icon: MapPin,
            className: "left-0 bottom-24",
            path: "M180 205 C140 215, 125 245, 92 275",
        },
        {
            label: "Mercado",
            icon: TrendingUp,
            className: "right-0 bottom-24",
            path: "M220 205 C260 215, 275 245, 308 275",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="relative min-h-96 rounded-4xl overflow-hidden border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] p-6"
        >
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative h-full min-h-80 flex flex-col justify-between">
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

                <div className="relative flex-1 flex items-center justify-center py-8">
                    <svg
                        className="absolute z-0 h-90 w-90"
                        viewBox="0 0 400 360"
                        fill="none"
                    >
                        <defs>
                            <linearGradient id="neuralLine" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                                <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.65" />
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>

                        {factors.map((item, index) => (
                            <motion.path
                                key={item.label}
                                d={item.path}
                                stroke="url(#neuralLine)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                    delay: 0.35 + index * 0.18,
                                    duration: 1.4,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 3.5,
                                }}
                            />
                        ))}

                        {factors.map((item, index) => (
                            <motion.circle
                                key={`${item.label}-pulse`}
                                r="4"
                                fill="#8b5cf6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    delay: 1 + index * 0.3,
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                }}
                            >
                                <animateMotion dur="3s" repeatCount="indefinite" path={item.path} />
                            </motion.circle>
                        ))}
                    </svg>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                        className="absolute z-0 h-52 w-52 rounded-full border border-dashed border-indigo-300/70"
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
                        className="absolute z-0 h-60 w-60 rounded-full opacity-60 blur-[1px]"
                    />

                    <div className="absolute z-0 h-56 w-56 rounded-full bg-white" />

                    <motion.div
                        animate={{ y: [0, -7, 0], rotate: [-1.2, 1.2, -1.2] }}
                        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
                        className="relative z-20 h-28 w-28 rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-[0_24px_50px_-16px_rgba(99,102,241,0.75)]"
                    >
                        <Home className="w-14 h-14 text-white" />
                    </motion.div>

                    {factors.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.label}
                                initial={{
                                    opacity: 0,
                                    scale: 0.65,
                                    y: 42,
                                    filter: "blur(6px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    delay: 0.55 + index * 0.18,
                                    duration: 0.9,
                                    type: "spring",
                                    stiffness: 90,
                                    damping: 14,
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className={`absolute z-30 ${item.className} flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.55)] backdrop-blur`}
                            >
                                <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-indigo-600" />
                                </div>

                                <span className="text-xs font-semibold text-slate-700">
                                    {item.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="rounded-3xl border border-slate-200/80 bg-slate-950 text-white p-4 shadow-inner">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-4 h-4 text-indigo-300" />
                        <p className="text-sm font-semibold">
                            Modelo predictivo
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <p className="text-lg font-bold">94.2%</p>
                            <p className="text-[11px] text-slate-400">
                                precisión
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-bold">79</p>
                            <p className="text-[11px] text-slate-400">
                                variables
                            </p>
                        </div>

                        <div>
                            <p className="text-lg font-bold">38K</p>
                            <p className="text-[11px] text-slate-400">
                                registros
                            </p>
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