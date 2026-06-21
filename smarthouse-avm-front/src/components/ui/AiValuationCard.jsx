import { motion } from "framer-motion";
import { Home, MapPin, TrendingUp, Hammer, BarChart3, Sparkles } from "lucide-react";

export default function AiValuationCard() {
    const factors = [
        { label: "Ubicación", icon: MapPin, x: "-left-2", y: "top-24" },
        { label: "Mercado", icon: TrendingUp, x: "-right-2", y: "top-24" },
        { label: "Calidad", icon: Hammer, x: "-left-2", y: "bottom-36" },
        { label: "Comparables", icon: BarChart3, x: "-right-2", y: "bottom-36" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.01 }}
            className="relative min-h-96 rounded-[1.75rem] overflow-hidden border border-slate-200 
            bg-white shadow-[0_20px_45px_-12px_rgba(15,23,42,0.25)] p-6"
        >
            <div className="relative h-full min-h-80 flex flex-col justify-between">
                
                <div className="relative flex-1 flex items-center justify-center">
                    <motion.div
                        animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative z-10 h-24 w-24 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-500 
                        flex items-center justify-center shadow-xl shadow-indigo-500/30"
                    >
                        <Home className="w-12 h-12 text-white" />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                        className="absolute h-44 w-44 rounded-full border border-dashed border-indigo-300"
                    />

                    {factors.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                className={`absolute ${item.x} ${item.y} flex items-center gap-2 rounded-2xl 
                                border border-slate-200 bg-white/90 px-3 py-2 shadow-lg backdrop-blur`}
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

                <div className="border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-semibold text-slate-700">
                                IA analizando...
                            </span>
                        </div>
                        <span className="text-xs text-slate-400">94%</span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                            animate={{ width: ["20%", "94%", "20%"] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500"
                        />
                    </div>

                    <div className="mt-5">
                        <p className="text-xs text-slate-500 font-medium">
                            Valor estimado
                        </p>
                        <h3 className="text-3xl font-bold text-slate-900">
                            $3,845,000
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            MXN · estimación preliminar
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}