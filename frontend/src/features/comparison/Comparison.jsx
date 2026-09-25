import { useQueries } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import ComparisonHeader from "./components/header/ComparisonHeader";
import ComparisonCard from "./components/cards/ComparisonCard";
import ComparisonCardSkeleton from "./components/cards/ComparisonCardSkeleton";
import AddSlot from "./components/cards/AddSlot";
import ComparisonTable from "./components/table/ComparisonTable";
import AIRecommendation from "./components/ai/AIRecommendation";
import ComparisonEmptyState from "./components/empty-state/ComparisonEmptyState";

import { useComparison } from "./context/ComparisonProvider";
import { getPropertyById, postPredictPropertyPrice } from "../property-detail/api/propertyDetailApi";

export default function Comparison() {
    const { selectedIds, removeFromComparison, clearComparison } = useComparison();

    const propertyQueries = useQueries({
        queries: selectedIds.map((id) => ({
            queryKey: ["properties", id],
            queryFn: () => getPropertyById(id),
        })),
    });

    const predictionQueries = useQueries({
        queries: selectedIds.map((id) => ({
            queryKey: ["property-prediction", id],
            queryFn: () => postPredictPropertyPrice(id),
            staleTime: Infinity,
        })),
    });

    const isLoading = propertyQueries.some((q) => q.isLoading) || predictionQueries.some((q) => q.isLoading);
    const isError = propertyQueries.some((q) => q.isError) || predictionQueries.some((q) => q.isError);

    const properties = propertyQueries
        .map((query, index) => {
            if (!query.data) return null;

            return {
                ...query.data,
                predicted_price: predictionQueries[index]?.data?.predicted_price ?? null,
            };
        })
        .filter(Boolean);

    function handleRemove(id) {
        removeFromComparison(id);
    }

    function handleClear() {
        clearComparison();
    }

    const count = selectedIds.length;
    const slotsToFill = Math.max(0, 3 - count);

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <ComparisonHeader count={count} onClear={handleClear} properties={properties} />

            {count === 0 ? (
                <ComparisonEmptyState />
            ) : isError ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <p className="text-sm font-semibold text-slate-900">
                        No se pudo cargar la comparación
                    </p>
                </div>
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
                            {isLoading
                                ? selectedIds.map((id) => <ComparisonCardSkeleton key={id} />)
                                : properties.map((p) => (
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

                    {!isLoading && count === 1 && (
                        <div className="mt-2 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-6 text-center">
                            <p className="text-sm text-slate-500">
                                Agrega al menos una propiedad más para ver la
                                comparación completa.
                            </p>
                        </div>
                    )}

                    {!isLoading && count >= 2 && (
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