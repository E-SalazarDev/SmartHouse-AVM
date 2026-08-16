import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ROWS, bestIndex } from "../../lib/comparisonRows";

export default function ComparisonTable({ properties }) {
    return (
        <div className="relative mt-6 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70">
            <div className="overflow-x-auto">
                <div
                    className="grid min-w-140"
                    style={{
                        gridTemplateColumns: `160px repeat(${properties.length}, 1fr)`,
                    }}
                >
                    <div className="sticky left-0 bg-white border-b border-slate-100" />
                    {properties.map((p) => (
                        <div
                            key={p.id}
                            className="border-b border-slate-100 px-4 py-3.5 text-sm font-bold text-slate-950 truncate"
                        >
                            {p.title}
                        </div>
                    ))}

                    {ROWS.map((row, rowIdx) => {
                        const winner = bestIndex(properties, row);
                        const isLastRow = rowIdx === ROWS.length - 1;
                        const isEvenRow = rowIdx % 2 === 1;

                        return (
                            <Fragment key={row.key}>
                                <div
                                    className={`sticky left-0 flex items-center gap-2 px-4 py-3.5 text-xs font-bold text-slate-500 ${
                                        isEvenRow ? "bg-slate-50/60" : "bg-white"
                                    } ${!isLastRow ? "border-b border-slate-100" : ""}`}
                                >
                                    <row.icon
                                        size={14}
                                        className="text-violet-600 shrink-0"
                                        strokeWidth={2.5}
                                    />
                                    {row.label}
                                </div>
                                {properties.map((p, i) => (
                                    <motion.div
                                        key={`${row.key}-${p.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: rowIdx * 0.03 }}
                                        className={`flex items-center px-4 py-3.5 text-sm ${
                                            isEvenRow ? "bg-slate-50/60" : "bg-white"
                                        } ${!isLastRow ? "border-b border-slate-100" : ""}`}
                                    >
                                        {i === winner ? (
                                            <span className="inline-flex items-center gap-1 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-600">
                                                <Check size={12} strokeWidth={2.5} />
                                                {row.format(p[row.key])}
                                            </span>
                                        ) : (
                                            <span className="text-slate-600">
                                                {row.format(p[row.key])}
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}