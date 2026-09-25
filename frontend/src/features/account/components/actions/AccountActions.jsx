import { LogOut, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../auth/hooks/useAuth";

export default function AccountActions() {
    const navigate = useNavigate();
    const { logout, isLoggingOut } = useAuth();

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                Acciones rápidas
            </p>

            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => navigate("/explorar")}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                    <Compass size={15} className="text-violet-600" />
                    Explorar propiedades
                </button>

                <button
                    type="button"
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2.5 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                >
                    <LogOut size={15} />
                    {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                </button>
            </div>
        </div>
    );
}