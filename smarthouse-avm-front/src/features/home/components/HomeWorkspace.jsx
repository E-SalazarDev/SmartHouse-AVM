import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Card from "../../../components/ui/Card";
import { homeActions } from "../constants/homeActions";

export default function HomeWorkspace() {
    return (
        <Card className="relative overflow-hidden rounded-4xl border border-white/70 bg-white/80 p-0 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative p-6 md:p-7">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Workspace
                        </p>

                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-950">
                            ¿Qué quieres hacer hoy?
                        </h2>

                        <p className="mt-2 text-sm text-slate-500 max-w-xl">
                            Accede rápido a las acciones principales de SmartHouse AVM
                            sin perderte entre menús o tablas.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-xs text-slate-500">
                            Última valuación
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                            Casa Moderna · $3.84M
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {homeActions.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.title}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.08 }}
                                whileHover={{ y: -4, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="group text-left rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.4)] transition"
                            >
                                <div
                                    className={`mb-5 h-12 w-12 rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-950">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <ArrowRight className="w-4 h-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500" />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}