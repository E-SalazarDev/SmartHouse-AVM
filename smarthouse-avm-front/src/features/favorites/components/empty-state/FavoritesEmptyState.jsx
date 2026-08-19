import { useNavigate } from "react-router-dom";

export default function FavoritesEmptyState() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4">
            <svg
                width="120"
                height="100"
                viewBox="0 0 120 100"
                fill="none"
                className="mb-6 text-slate-300"
            >
                <rect
                    x="10"
                    y="10"
                    width="100"
                    height="80"
                    rx="12"
                    strokeDasharray="6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M45 55 L60 40 L75 55 L75 70 L45 70 Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                />
                <path
                    d="M60 22c-3-4-9-4-11 0-2 4 0 8 11 15 11-7 13-11 11-15-2-4-8-4-11 0Z"
                    className="text-violet-300"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                />
            </svg>

            <h3 className="text-lg font-medium text-slate-900">
                Aún no tienes favoritos
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
                Guarda las propiedades que te interesen para compararlas o
                revisarlas después.
            </p>

            <button
                type="button"
                onClick={() => navigate("/explorar")}
                className="mt-6 rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md transition-shadow"
            >
                Explorar propiedades
            </button>
        </div>
    );
}