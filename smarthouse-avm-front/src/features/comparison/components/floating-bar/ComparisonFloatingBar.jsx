import { AnimatePresence, motion } from "framer-motion";
import { Scale, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useComparison } from "../../context/ComparisonProvider";

export default function ComparisonFloatingBar() {
    const navigate = useNavigate();
    const { selectedIds, clearComparison, maxItems } = useComparison();

    const count = selectedIds.length;
    const canCompare = count >= 2;

    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 340, damping: 24 }}
                    className="fixed bottom-15 right-20 z-60 flex items-center gap-2"
                >
                    <button
                        type="button"
                        onClick={clearComparison}
                        aria-label="Limpiar selección"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-md transition hover:text-slate-700"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <motion.button
                        type="button"
                        onClick={() => canCompare && navigate("/comparador")}
                        whileHover={canCompare ? { scale: 1.03 } : {}}
                        whileTap={canCompare ? { scale: 0.97 } : {}}
                        disabled={!canCompare}
                        className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(124,58,255,0.55)] transition ${
                            canCompare
                                ? "bg-linear-to-r from-violet-600 to-fuchsia-600 hover:shadow-[0_16px_36px_-8px_rgba(124,58,255,0.65)]"
                                : "cursor-not-allowed bg-linear-to-r from-violet-600/50 to-fuchsia-600/50"
                        }`}
                    >
                        <Scale className="h-4 w-4" />

                        <AnimatePresence mode="wait">
                            <motion.span
                                key={count}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.12 }}
                            >
                                {count}/{maxItems}
                            </motion.span>
                        </AnimatePresence>

                        {canCompare && (
                            <>
                                <span className="h-4 w-px bg-white/30" />
                                Comparar
                                <ArrowRight className="h-3.5 w-3.5" />
                            </>
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}