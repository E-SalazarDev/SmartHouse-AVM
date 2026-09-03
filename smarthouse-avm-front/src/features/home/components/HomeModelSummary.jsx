import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import Card from "../../../components/ui/Card";
import { useCountUp } from "../../../hooks/useCountUp";

export default function HomeModelSummary() {
    const precision = useCountUp(94.2, 1200, 1);
    const propiedades = useCountUp(38, 1200, 0);
    const variables = useCountUp(79, 1200, 0);

    return (
        <Card className="rounded-4xl border border-white/70 bg-white/80 p-0 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 p-6 md:p-7 items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Modelo AVM
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-950">
                        Datos técnicos listos para predicción
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 max-w-xl">
                        El sistema utiliza variables de construcción, ubicación,
                        calidad, área, antigüedad y comparables para alimentar el
                        modelo de valuación.
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div ref={precision.ref}>
                            <p className="text-2xl font-bold text-slate-950">
                                {precision.value}%
                            </p>
                            <p className="text-xs text-slate-500">
                                precisión
                            </p>
                        </div>

                        <div ref={propiedades.ref}>
                            <p className="text-2xl font-bold text-slate-950">
                                {propiedades.value}K+
                            </p>
                            <p className="text-xs text-slate-500">
                                propiedades
                            </p>
                        </div>

                        <div ref={variables.ref}>
                            <p className="text-2xl font-bold text-slate-950">
                                {variables.value}
                            </p>
                            <p className="text-xs text-slate-500">
                                variables IA
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-8 py-6 w-full md:w-56">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                        <motion.span
                            className="absolute inset-0 rounded-full bg-indigo-400/20"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                            <GitBranch className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-900">
                            Versionado con MLflow
                        </p>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            Cada entrenamiento queda registrado en el Model Registry
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}