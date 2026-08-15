import { RotateCcw } from "lucide-react";

export default function ComparisonHeader({ count, onClear }) {
    return (
        <div className="flex items-start justify-between gap-4">
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
                <button
                    type="button"
                    onClick={onClear}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors shrink-0"
                >
                    <RotateCcw size={12} />
                    Limpiar comparación
                </button>
            )}
        </div>
    );
}