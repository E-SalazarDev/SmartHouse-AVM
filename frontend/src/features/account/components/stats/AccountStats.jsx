import { Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFavorites from "../../../favorites/hooks/useFavorites";

export default function AccountStats() {
    const navigate = useNavigate();
    const { favorites, isLoading } = useFavorites();

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Heart size={17} />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Favoritos guardados
                    </p>
                    <p className="text-2xl font-bold text-slate-950">
                        {isLoading ? "—" : favorites.length}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => navigate("/favoritos")}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
            >
                Ver mis favoritos
                <ArrowRight size={13} />
            </button>
        </div>
    );
}