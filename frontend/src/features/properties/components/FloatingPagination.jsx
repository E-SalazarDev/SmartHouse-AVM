import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingPagination({
    page,
    totalPages,
    disabledPrevious,
    disabledNext,
    onClickPrevious,
    onClickNext,
}) {
    return (
        <div className="pointer-events-none sticky bottom-8 z-40 flex w-full justify-center">
            <motion.div
                layout
                className="pointer-events-auto inline-flex items-center gap-5
                    rounded-2xl
                    border border-white/10
                    bg-slate-950/85
                    px-4 py-3
                    shadow-[0_20px_50px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
                    backdrop-blur-2xl transition-all duration-300"
            >
                {/* Botón Anterior */}
                <motion.button
                    disabled={disabledPrevious}
                    type="button"
                    onClick={onClickPrevious}
                    whileHover={!disabledPrevious ? { scale: 1.05, y: -1 } : {}}
                    whileTap={!disabledPrevious ? { scale: 0.95 } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl
                        bg-linear-to-br from-violet-500 to-fuchsia-500 text-white
                        shadow-lg shadow-violet-500/20
                        ring-1 ring-white/20
                        transition-all duration-150
                        disabled:cursor-not-allowed disabled:opacity-20 disabled:shadow-none disabled:bg-none disabled:border disabled:border-white/10"
                >
                    <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                </motion.button>

                {/* Contenedor de Indicadores */}
                <div className="flex items-center gap-2 px-1">
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const dotPage = index + 1;
                        const active = dotPage === page;
                        const visited = dotPage < page;
                        return (
                            <motion.span
                                key={dotPage}
                                layout
                                animate={{
                                    width: active ? 32 : 8,
                                    opacity: active ? 1 : visited ? 0.7 : 0.25,
                                }}
                                transition={{ type: "spring", stiffness: 360, damping: 26 }}
                                className={`block h-2 rounded-full ${
                                    active
                                        ? "bg-linear-to-r from-violet-400 to-fuchsia-400 shadow-sm shadow-fuchsia-500/50"
                                        : visited
                                        ? "bg-violet-400"
                                        : "bg-white"
                                }`}
                                style={{ minWidth: active ? 32 : 8 }}
                            />
                        );
                    })}
                </div>

                {/* Divisor */}
                <div className="h-6 w-px bg-white/10" />

                {/* Contador de Páginas Numérico */}
                <div className="flex items-center gap-1 rounded-xl bg-white/5 px-4 py-1.5 ring-1 ring-white/10 min-w-17.5 justify-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={page}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="text-[14px] font-black tabular-nums text-white"
                        >
                            {page}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-[14px] font-semibold text-white/30">/</span>
                    <span className="text-[14px] font-bold tabular-nums text-white/60">
                        {totalPages}
                    </span>
                </div>

                {/* Botón Siguiente  */}
                <motion.button
                    disabled={disabledNext}
                    type="button"
                    onClick={onClickNext}
                    whileHover={!disabledNext ? { scale: 1.05, y: -1 } : {}}
                    whileTap={!disabledNext ? { scale: 0.95 } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl
                        bg-linear-to-br from-violet-500 to-fuchsia-500 text-white
                        shadow-lg shadow-violet-500/20
                        ring-1 ring-white/20
                        transition-all duration-150
                        disabled:cursor-not-allowed disabled:opacity-20 disabled:shadow-none disabled:bg-none disabled:border disabled:border-white/10"
                >
                    <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                </motion.button>
            </motion.div>
        </div>
    );
}