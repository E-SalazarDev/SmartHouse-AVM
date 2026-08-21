import { useNavigate } from "react-router-dom";
import { Scale, ArrowRight } from "lucide-react";

export default function ComparisonEmptyState() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[45vh] flex-col items-center justify-center text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 mb-5">
                <Scale size={24} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
                No hay propiedades para comparar
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                Selecciona entre 2 y 3 propiedades desde Explorar o desde el
                detalle de una propiedad para verlas comparadas aquí.
            </p>
            <button
                type="button"
                onClick={() => navigate("/explorar")}
                className="mt-6 rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
            >
                Explorar propiedades
                <ArrowRight size={14} />
            </button>
        </div>
    );
}