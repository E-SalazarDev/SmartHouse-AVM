import { useMemo } from "react";
import { RotateCcw, TrendingUp } from "lucide-react";

export default function ComparisonHeader({ count, onClear, properties = [] }) {
    const averageValuation = useMemo(() => {
        const withPrice = properties.filter((p) => p.predicted_price != null);
        if (withPrice.length === 0) return null;

        const total = withPrice.reduce((sum, p) => sum + Number(p.predicted_price), 0);
        return total / withPrice.length;
    }, [properties]);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-600/70">
                    Decide con datos
                </span>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-950">
                    Comparador
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    {count === 0
                        ? "Aún no has agregado propiedades"
                        : `Comparando ${count} de 3 propiedades`}
                </p>
            </div>

            {count > 0 && (
                <div className="flex items-center gap-3">
                    {averageValuation != null && (
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">
                                    Valuación promedio
                                </p>
                                <p className="text-sm font-bold text-slate-900">
                                    {new Intl.NumberFormat("es-MX", {
                                        style: "currency",
                                        currency: "USD",
                                        maximumFractionDigits: 0,
                                    }).format(averageValuation)}
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={onClear}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 shrink-0"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Limpiar comparación
                    </button>
                </div>
            )}
        </div>
    );
}