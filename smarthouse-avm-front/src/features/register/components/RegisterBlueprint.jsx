import { Home, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function RegisterBlueprint() {
    return (
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-10 lg:flex lg:flex-col lg:justify-between">
            {/* Grid de fondo estilo plano arquitectónico */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Resplandor de fondo */}
            <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Home size={17} strokeWidth={1.8} className="text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-white">
                    SmartHouse AI
                </span>
            </div>

            {/* Texto principal */}
            <div className="relative z-10 mt-16">
                <span className="inline-block text-xs font-semibold tracking-[0.25em] text-violet-300/80 uppercase">
                    Automated Valuation Model
                </span>

                <h2 className="mt-4 font-serif text-3xl font-normal leading-tight text-white">
                    Únete y empieza a valuar propiedades con precisión.
                </h2>

                <p className="mt-4 max-w-sm text-sm text-slate-400">
                    Crea tu cuenta para registrar propiedades, comparar
                    resultados y guardar el historial de tus análisis.
                </p>

                {/* Lista de beneficios */}
                <ul className="mt-8 space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                            <Sparkles size={14} className="text-violet-300" />
                        </span>
                        Estimaciones basadas en modelos entrenados
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                            <TrendingUp size={14} className="text-fuchsia-300" />
                        </span>
                        Compara contra miles de propiedades similares
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-300">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                            <ShieldCheck size={14} className="text-indigo-300" />
                        </span>
                        Guarda e historial cada análisis que realices
                    </li>
                </ul>
            </div>

            {/* Tarjeta de vista previa de valuación */}
            <div className="relative z-10 mt-16 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                        Última valuación
                    </span>
                    <span className="text-[11px] text-slate-500">Casa Moderna</span>
                </div>

                <p className="mt-2 font-serif text-4xl font-normal text-white">
                    $184K
                </p>

                <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 w-fit">
                    <TrendingUp size={12} className="text-violet-300" />
                    <span className="text-[11px] text-slate-300">
                        Comparando contra 38,000+ propiedades
                    </span>
                </div>
            </div>
        </section>
    );
}