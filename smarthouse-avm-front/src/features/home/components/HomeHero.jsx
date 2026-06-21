import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import img from "../../../assets/house.png";

export default function HomeHero() {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white p-2 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)]"
        >
            <div className="relative h-[62vh] min-h-130 max-h-180 overflow-hidden rounded-[1.85rem]">
                <img
                    src={img}
                    alt="Propiedad analizada por IA"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/45 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10 md:px-14">
                    <motion.span
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                        <span className="text-xs font-semibold text-white/90 tracking-wide uppercase">
                            Automated Valuation Model
                        </span>
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32, duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] max-w-3xl"
                    >
                        Valuación inmobiliaria impulsada por{" "}
                        <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-cyan-200 bg-clip-text text-transparent">
                            inteligencia artificial
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44, duration: 0.6 }}
                        className="mt-5 text-sm sm:text-base text-white/75 max-w-xl leading-relaxed"
                    >
                        Analiza propiedades, ubicación, características técnicas y
                        comparables del mercado para estimar valores de vivienda con
                        una experiencia rápida, visual y profesional.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.56, duration: 0.6 }}
                        className="mt-8 flex flex-col sm:flex-row gap-3"
                    >
                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-xl transition hover:scale-[1.02]">
                            Empezar valuación
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
                            Explorar propiedades
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="absolute bottom-6 right-6 hidden md:block rounded-3xl border border-white/20 bg-white/15 p-5 backdrop-blur-xl shadow-2xl"
                >
                    <p className="text-xs font-medium text-white/60">
                        Estimación preliminar
                    </p>

                    <h3 className="mt-1 text-3xl font-bold text-white">
                        $3.84M
                    </h3>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-cyan-200" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-white">
                                Confianza alta
                            </p>
                            <p className="text-xs text-white/60">
                                Basado en 79 variables
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}