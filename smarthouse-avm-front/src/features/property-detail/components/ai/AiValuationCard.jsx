import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
    BrainCircuit, AlertCircle, ArrowRight,
    RotateCcw, TrendingUp, ShieldCheck, Sparkles, Zap,
} from "lucide-react";

/* ── Waveform ─────────────────────────────────────────────── */
function Wave({ active }) {
    const heights = [10, 16, 22, 18, 12, 20, 14];
    return (
        <div className="flex items-end gap-0.75">
            {heights.map((h, i) => (
                <motion.span key={i}
                    animate={active
                        ? { scaleY: [0.3, 1, 0.45, 0.9, 0.3], opacity: [0.4, 1, 0.5, 1, 0.4] }
                        : { scaleY: 0.3, opacity: 0.25 }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    style={{ height: h, transformOrigin: "bottom" }}
                    className="w-0.75 rounded-full bg-indigo-400"
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
            bg-linear-to-br from-[#1c1a3a] via-[#16152e] to-[#12112a]
            border border-white/10
            shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.07)]
            ${compact ? "p-4" : "p-5"}`}
        >
            {/* Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-1/2 h-48 w-64 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
                <div className="absolute -right-8 top-0 h-32 w-48 rounded-full bg-violet-600/10 blur-2xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent" />
            </div>

            <div className="relative flex items-center gap-4">

                {/* ── Icon ── */}
                <motion.div
                    animate={isActive ? {
                        boxShadow: [
                            "0 0 0px 0px rgba(99,102,241,0)",
                            "0 0 16px 4px rgba(99,102,241,0.4)",
                            "0 0 0px 0px rgba(99,102,241,0)",
                        ]
                    } : {}}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                        bg-linear-to-br from-indigo-500/50 to-violet-700/40
                        ring-1 ring-indigo-400/30 text-indigo-100"
                >
                    <BrainCircuit className="h-5 w-5" />
                </motion.div>

                {/* ── Brand ── */}
                <div className="shrink-0">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase tracking-[0.26em] text-indigo-400/80">
                            SmartHouse AVM
                        </span>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-indigo-500/25
                            px-1.5 py-px text-[8px] font-black uppercase text-indigo-300 ring-1 ring-indigo-400/30">
                            <Zap className="h-2 w-2" />ML
                        </span>
                    </div>
                    <p className="mt-0.5 text-base font-black leading-tight tracking-tight text-white">
                        Valuación con IA
                    </p>
                   
                </div>

                {/* ── Divider ── */}
                <div className="h-10 w-px shrink-0 bg-white/8" />

                {/* ── Status panel — flex-1 para ocupar todo el espacio ── */}
                <div className="flex min-w-0 flex-1 items-center">
                    <AnimatePresence mode="wait">
                        {state === "idle" && (
                            <motion.div key="idle"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex w-full items-center gap-8"
                            >
                                <Wave active={true} />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                                        Modelo listo
                                    </p>
                                    
                                </div>
                            </motion.div>
                        )}

                        {state === "loading" && (
                            <motion.div key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex w-full items-center gap-3"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                                    className="h-5 w-5 shrink-0 rounded-full border-2 border-indigo-400/30 border-t-indigo-400"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-400">
                                        Procesando
                                    </p>
                                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-indigo-500/20">
                                        <motion.div
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                                            className="h-full w-1/2 rounded-full bg-linear-to-r from-transparent via-indigo-400 to-transparent"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {state === "done" && result && (
                            <motion.div key="done"
                                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                className="flex w-full items-center gap-3"
                            >
                                <TrendingUp className="h-5 w-5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                                        Precio estimado
                                    </p>
                                    <p className="mt-0.5 text-xl font-black tracking-tight text-white">
                                        {formatCurrency(result.predicted_price)}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {state === "error" && (
                            <motion.div key="error"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex w-full items-center gap-2"
                            >
                                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-400">Error</p>
                                    <p className="text-xs text-red-300/70">Revisa el backend</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Divider ── */}
                <div className="h-10 w-px shrink-0 bg-white/8" />

                {/* ── Actions ── */}
                <div className="flex shrink-0 items-center gap-2">
                   
                    <motion.button
                        onClick={handlePredict}
                        disabled={state === "loading"}
                        whileHover={state !== "loading" ? { scale: 1.04, y: -1 } : {}}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={`group relative inline-flex items-center gap-2 overflow-hidden
                            rounded-xl px-5 py-2.5 text-sm font-black
                            transition-colors duration-150 disabled:opacity-40
                            ${state === "done"
                                ? "bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/30 hover:bg-indigo-500/30"
                                : state === "error"
                                ? "bg-red-500/20 text-red-200 ring-1 ring-red-400/30 hover:bg-red-500/30"
                                : "bg-white text-slate-900 shadow-[0_4px_18px_rgba(99,102,241,0.35)] hover:bg-indigo-50"
                            }`}
                    >
                        {state === "idle" && (
                            <motion.span
                                animate={{ x: ["-130%", "160%"] }}
                                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                                className="pointer-events-none absolute inset-y-0 w-8 rotate-12 bg-indigo-200/25 blur-sm"
                            />
                        )}
                        <span className="relative flex items-center gap-1.5">
                            {state === "loading" ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent"
                                    />
                                    Calculando…
                                </>
                            ) : state === "done" ? (
                                <><RotateCcw size={14} />Recalcular</>
                            ) : state === "error" ? (
                                <><RotateCcw size={14} />Reintentar</>
                            ) : (
                                <>
                                    <Sparkles size={14} />
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