import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ComparisonHeader from "./components/header/ComparisonHeader";
import ComparisonCard from "./components/cards/ComparisonCard";
import AddSlot from "./components/cards/AddSlot";
import ComparisonTable from "./components/table/ComparisonTable";
import AIRecommendation from "./components/ai/AIRecommendation";
import ComparisonEmptyState from "./components/empty-state/ComparisonEmptyState";
import { MOCK_PROPERTIES } from "./lib/mockProperties";

export default function Comparison({}) {
    const [properties, setProperties] = useState(MOCK_PROPERTIES);

    function handleRemove(id) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
    }

    function handleClear() {
        setProperties([]);
    }

    const count = properties.length;
    const slotsToFill = Math.max(0, 3 - count);

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <ComparisonHeader count={count} onClear={handleClear} />

            {count === 0 ? (
                <ComparisonEmptyState />
            ) : (
                <>
                    <div
                        className={`grid gap-4 ${
                            count + slotsToFill === 3
                                ? "grid-cols-1 sm:grid-cols-3"
                                : "grid-cols-1 sm:grid-cols-2"
                        }`}
                    >
                        <AnimatePresence>
                            {properties.map((p) => (
                                <ComparisonCard
                                    key={p.id}
                                    property={p}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </AnimatePresence>
                        {Array.from({ length: slotsToFill }).map((_, i) => (
                            <AddSlot key={`slot-${i}`} />
                        ))}
                    </div>

                    {count === 1 ? (
                        <div className="mt-2 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
                            <p className="text-sm text-slate-500">
                                Agrega al menos una propiedad más para ver la
                                comparación completa.
                            </p>
                        </div>
                    ) : (
                        <>
                            <ComparisonTable properties={properties} />
                            <AIRecommendation properties={properties} />
                        </>
                    )}
                </>
            )}
        </div>
    );
}