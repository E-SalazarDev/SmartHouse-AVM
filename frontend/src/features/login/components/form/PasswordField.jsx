import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordField({
    value,
    onChange,
    disabled,
    showPassword,
    onToggleShowPassword,
}) {
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-slate-600"
                >
                    Contraseña
                </label>

                <Link
                    to="/recuperar-password"
                    className="text-xs font-medium text-violet-600 hover:text-violet-700"
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <div className="relative">
                <Lock
                    size={16}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                    type="button"
                    onClick={onToggleShowPassword}
                    disabled={disabled}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
}