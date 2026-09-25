import { SlidersHorizontal } from "lucide-react";
import PageTitle from "../../../components/ui/PageTitle";

export default function SectionHeader({ }) {

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <PageTitle
                eyebrow="Catálogo"
                title="Propiedades registradas"
                subtitle="Explora el inventario disponible para análisis y valuación con IA."
                size="sm"
            />

            <button
                type="button"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-900 sm:self-auto"
            >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                Filtros
            </button>
        </div>
    );
}