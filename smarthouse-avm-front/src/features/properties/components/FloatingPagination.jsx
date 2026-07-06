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
                className="pointer-events-auto inline-flex items-center gap-3
                    rounded-2xl
                    border border-white/30
                    bg-slate-900/75
                    px-3 py-2.5
                    shadow-[0_8px_32px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]
                    backdrop-blur-xl"
            >
                {/* Prev */}
                <motion.button
                    disabled={disabledPrevious}
                    type="button"
                    onClick={onClickPrevious}
                    whileHover={!disabledPrevious ? { scale: 1.06 } : {}}
                    whileTap={!disabledPrevious ? { scale: 0.93 } : {}}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl
                        bg-linear-to-br from-violet-500 to-fuchsia-500 text-white
                        ring-1 ring-white/15
                        transition-colors duration-150
                        hover:bg-white/20 hover:text-white
                        disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <ChevronLeft className="h-4.5 w-4.5" />
                </motion.button>

                {/* Dots */}
                <div className="flex items-center gap-1.25 px-1">
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const dotPage = index + 1;
                        const active = dotPage === page;
                        const visited = dotPage < page;
                        return (
                            <motion.span
                                key={dotPage}
                                layout
                                animate={{
                                    width: active ? 26 : 7,
                                    opacity: active ? 1 : visited ? 0.75 : 0.3,
                                }}
                                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                                className={`block h-1.75 rounded-full ${
                                    active
                                        ? "bg-linear-to-r from-violet-400 to-fuchsia-400"
                                        : visited
                                        ? "bg-violet-400"
                                        : "bg-white"
                                }`}
                                style={{ minWidth: active ? 26 : 7 }}
                            />
                        );
                    })}
                </div>

                {/* Divider */}
                <div className="h-5 w-px bg-white/15" />

                {/* Counter — fondo propio  */}
                <div className="flex items-center gap-0.75 rounded-lg bg-white/10 px-3 py-1 ring-1 ring-white/10">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={page}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.13 }}
                            className="text-[13px] font-black tabular-nums text-white"
                        >
                            {page}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-[13px] font-medium text-white/40">/</span>
                    <span className="text-[13px] font-medium tabular-nums text-white/60">
                        {totalPages}
                    </span>
                </div>

                {/* Next */}
                <motion.button
                    disabled={disabledNext}
                    type="button"
                    onClick={onClickNext}
                    whileHover={!disabledNext ? { scale: 1.06 } : {}}
                    whileTap={!disabledNext ? { scale: 0.93 } : {}}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl
                        bg-linear-to-br from-violet-500 to-fuchsia-500 text-white
                        shadow-[0_4px_14px_rgba(139,92,246,0.45)]
                        ring-1 ring-white/15
                        transition-all duration-150
                        hover:shadow-[0_4px_20px_rgba(139,92,246,0.65)]
                        disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
                >
                    <ChevronRight className="h-4.5 w-4.5" />
                </motion.button>
            </motion.div>
        </div>
    );
}