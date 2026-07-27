import { Mail } from "lucide-react";

export default function EmailField({ value, onChange, disabled }) {
    return (
        <div>
            <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-slate-600"
            >
                Correo electrónico
            </label>

            <div className="relative">
                <Mail
                    size={16}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    id="email"
                    type="email"
                    name="email"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
            </div>
        </div>
    );
}