import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AddSlot() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate("/explorar")}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 aspect-video sm:aspect-auto sm:h-full min-h-35 transition hover:border-violet-300 hover:bg-violet-50/40 hover:text-violet-500"
        >
            <Plus size={18} />
            <span className="text-xs font-medium text-center px-4">
                Agrega otra propiedad para comparar
            </span>
        </button>
    );
}