import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ROWS, bestIndex } from "../../lib/comparisonRows";

export default function ComparisonTable({ properties }) {
    return (
        <div className="relative mt-6 rounded-2xl border border-slate-100 bg-white overflow-hidden">
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
                            className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 truncate"
                        >
                            {p.title}
                        </div>
                    ))}

                    {ROWS.map((row, rowIdx) => {
                        const winner = bestIndex(properties, row);
                        return (
                            <>
                                <div
                                    key={`${row.key}-label`}
                                    className={`sticky left-0 bg-white flex items-center gap-2 px-4 py-3.5 text-xs font-medium text-slate-500 ${
                                        rowIdx !== ROWS.length - 1 ? "border-b border-slate-100" : ""
                                    }`}
                                >
                                    <row.icon size={13} className="text-slate-400 shrink-0" />
                                    {row.label}
                                </div>
                                {properties.map((p, i) => (
                                    <motion.div
                                        key={`${row.key}-${p.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: rowIdx * 0.03 }}
                                        className={`flex items-center gap-1.5 px-4 py-3.5 text-sm ${
                                            rowIdx !== ROWS.length - 1 ? "border-b border-slate-100" : ""
                                        } ${
                                            i === winner
                                                ? "font-semibold text-violet-700"
                                                : "text-slate-700"
                                        }`}
                                    >
                                        {i === winner && (
                                            <Check size={13} className="text-violet-500 shrink-0" />
                                        )}
                                        {row.format(p[row.key])}
                                    </motion.div>
                                ))}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}