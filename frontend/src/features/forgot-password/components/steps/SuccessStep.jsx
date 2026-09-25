import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function SuccessStep() {
    return (
        <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle2 size={22} className="text-emerald-600" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-950">
                Contraseña actualizada
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                Ya puedes iniciar sesión con tu nueva contraseña. Por seguridad,
                cerramos las sesiones que tenías abiertas.
            </p>

            <Link
                to="/login"
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95"
            >
                Ir a iniciar sesión
            </Link>
        </div>
    );
}