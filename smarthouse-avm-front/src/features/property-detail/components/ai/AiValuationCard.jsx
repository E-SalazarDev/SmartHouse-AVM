import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    BrainCircuit, AlertCircle, ArrowRight,
    RotateCcw, TrendingUp, Sparkles, Zap, CheckCircle2
} from "lucide-react";

/* ── Ecualizador de Estado Sincronizado ────────────────────────────────────────── */
function Wave({ active }) {
    const heights = [12, 20, 26, 18, 14, 22, 12];
    return (
        <div className="flex items-end gap-1 h-7 px-1">
            {heights.map((h, i) => (
                <motion.span 
                    key={i}
                    animate={active
                        ? { scaleY: [0.3, 1, 0.45, 0.9, 0.3], opacity: [0.5, 1, 0.6, 1, 0.5] }
                        : { scaleY: 0.3, opacity: 0.2 }
                    }
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                    style={{ height: h, transformOrigin: "bottom" }}
                    className="w-1 rounded-full bg-indigo-400"
                />
            ))}
        </div>
    );
}

export default function AiValuationCard({ predictPrice, compact = false }) {
    const [state, setState] = useState("idle");
    const [result, setResult] = useState(null);

    async function handlePredict() {
        setState("loading");
        try {
            const data = await predictPrice();
            setResult(data);
            setState("done");
        } catch {
            setState("error");
        }
    }

    const isActive = state === "idle" || state === "loading";

    return (
        <div className={`relative overflow-hidden rounded-2xl
            bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918]
            border border-white/10
            shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]
            transition-all duration-300
            ${compact ? "p-4" : "p-5"}`}
        >
            {/* Resplandores de fondo (Glows) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-1/2 h-44 w-60 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
                <div className="absolute -right-8 top-0 h-28 w-44 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            <div className="relative flex items-center justify-between gap-4 md:gap-6">

                {/* ── SECCIÓN IZQUIERDA: Identidad de Marca ── */}
                <div className="flex items-center gap-3.5 shrink-0">
                    <motion.div
                        animate={isActive ? {
                            boxShadow: [
                                "0 0 0px 0px rgba(99,102,241,0)",
                                "0 0 14px 3px rgba(99,102,241,0.3)",
                                "0 0 0px 0px rgba(99,102,241,0)",
                            ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                            bg-linear-to-br from-indigo-500/30 to-violet-700/20
                            border border-indigo-500/30 text-indigo-300"
                    >
                        <BrainCircuit className="h-5 w-5" />
                    </motion.div>

                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-300/75">
                                SmartHouse AVM
                            </span>
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-500/15
                                px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-indigo-300 border border-indigo-400/20">
                                <Zap className="h-2 w-2 text-indigo-400" />ML
                            </span>
                        </div>
                        <p className="mt-0.5 text-base font-bold tracking-tight text-white">
                            Valuación con IA
                        </p>
                    </div>
                </div>

                {/* ── Divisor ── */}
                <div className="h-10 w-px shrink-0 bg-white/10" />

                {/* ── SECCIÓN CENTRAL: Panel de Estado Unificado (Única animación de carga aquí) ── */}
                <div className="flex min-w-0 flex-1 items-center justify-center">
                    <AnimatePresence mode="wait">
                        {state === "idle" && (
                            <motion.div key="idle"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                <Wave active={false} />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        Modelo listo
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {state === "loading" && (
                            <motion.div key="loading"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                {/* El ecualizador actúa como el único indicador de carga */}
                                <Wave active={true} />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 animate-pulse">
                                        Analizando datos...
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {state === "done" && result && (
                            <motion.div key="done"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl"
                            >
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400/80">
                                        Estimación de valor
                                    </p>
                                    <p className="text-lg font-black tracking-tight text-white leading-none mt-0.5">
                                        {formatCurrency(result.predicted_price)}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {state === "error" && (
                            <motion.div key="error"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-2.5 bg-red-500/5 border border-red-500/25 px-3 py-1.5 rounded-xl"
                            >
                                <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-400" />
                                <div>
                                    <p className="text-[9px] font-extrabold uppercase tracking-wider text-red-400">Error</p>
                                    <p className="text-[10px] text-red-300/70 leading-none mt-0.5">Fallo de conexión</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Divisor ── */}
                <div className="h-10 w-px shrink-0 bg-white/10" />

                {/* ── SECCIÓN DERECHA: Botón de Acción (Sin Spinners) ── */}
                <div className="flex shrink-0 items-center">
                    <motion.button
                        onClick={handlePredict}
                        disabled={state === "loading"}
                        whileHover={state !== "loading" ? { scale: 1.02, y: -0.5 } : {}}
                        whileTap={state !== "loading" ? { scale: 0.98 } : {}}
                        className={`relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold
                            transition-all duration-250 border select-none
                            ${state === "done"
                                ? "bg-indigo-500/10 text-indigo-300 border-indigo-400/30 hover:bg-indigo-500/25"
                                : state === "error"
                                ? "bg-red-500/15 text-red-300 border-red-400/30 hover:bg-red-500/25"
                                : "bg-white text-slate-950 border-white shadow-[0_4px_16px_rgba(99,102,241,0.25)] hover:bg-slate-100 disabled:bg-white/40 disabled:text-slate-950/50"
                            }`}
                    >
                        <span className="flex items-center gap-1.5">
                            {state === "loading" ? (
                                "Calculando..."
                            ) : state === "done" ? (
                                <><RotateCcw size={14} />Recalcular</>
                            ) : state === "error" ? (
                                <><RotateCcw size={14} />Reintentar</>
                            ) : (
                                <>
                                    <Sparkles size={14} className="text-indigo-600" />
                                    Calcular precio
                                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>

            </div>
        </div>
    );
}

function formatCurrency(value) {
    if (value == null) return "—";
    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
}