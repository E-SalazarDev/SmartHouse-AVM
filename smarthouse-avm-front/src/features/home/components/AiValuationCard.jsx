import {
    Home,
    Brain,
    BadgeCheck,
    Database,
    MapPin,
    Maximize2,
    BedDouble,
    Bath,
    Compass,
    Warehouse,
    Hammer,
    Layers,
} from "lucide-react";

const FACTORS = [
    { key: "area",         label: "Área",         icon: Maximize2, value: "159 m²"  },
    { key: "habitaciones", label: "Habitaciones",  icon: BedDouble, value: "3 cuartos" },
    { key: "garaje",       label: "Garaje",        icon: Warehouse, value: "2 autos" },
    { key: "calidad",      label: "Calidad",       icon: Hammer,    value: "7 / 10"  },
    { key: "ubicacion",    label: "Ubicación",     icon: MapPin,    value: "Ames, IA" },
    { key: "banos",        label: "Baños",         icon: Bath,      value: "2 completos" },
];

export default function AiValuationCard() {
    return (
        <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-5.5 flex flex-col overflow-hidden">

            {/* ── HEADER ── */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.15em] text-slate-400 mb-1">
                        SmartHouse AI
                    </p>
                    <h3 className="text-[20px] font-bold text-slate-900 leading-tight">
                        Motor de<br />valuación
                    </h3>
                </div>
                <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Activo
                </span>
            </div>

            {/* ── HERO BANNER ── */}
            <div
                className="rounded-2xl p-4 flex items-center gap-4 mb-5"
                style={{ background: "linear-gradient(135deg,#6d28d9 0%,#4f46e5 100%)" }}
            >
                {/* Ícono casa */}
                <div className="w-13 h-13 rounded-full flex items-center justify-center shrink-0 border border-white/25"
                    style={{ background: "rgba(255,255,255,.15)" }}>
                    <Home className="text-white w-6 h-6" />
                </div>

                {/* Precio */}
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white/60 mb-0.5">Índice de valuación</p>
                    <p className="text-[26px] font-bold text-white leading-none">$184K</p>
                    <p className="text-[11px] text-white/50 mt-1">Precio estimado · Ames, IA</p>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-2 shrink-0">
                    {[
                        { val: "38K", lbl: "registros" },
                        { val: "79",  lbl: "variables"  },
                    ].map(({ val, lbl }) => (
                        <div
                            key={lbl}
                            className="rounded-[10px] px-3 py-1.5 text-right border border-white/20"
                            style={{ background: "rgba(255,255,255,.15)" }}
                        >
                            <p className="text-[14px] font-bold text-white leading-none">{val}</p>
                            <p className="text-[10px] text-white/50 mt-0.5">{lbl}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── SECTION LABEL ── */}
            <div className="flex items-center gap-3 mb-3">
                <p className="text-[11px] font-bold uppercase tracking-[.13em] text-slate-400 whitespace-nowrap">
                    Variables clave
                </p>
                <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* ── FACTORS GRID ── */}
            <div className="flex-1 grid grid-cols-2 gap-2">
                {FACTORS.map(({ key, label, icon: Icon, value }) => (
                    <div
                        key={key}
                        className="rounded-2xl flex flex-col gap-2 p-3"
                        style={{
                            background: "#f8f9fc",
                            border: "1.5px solid #e2e5f0",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-7.5 h-7.5 rounded-[9px] bg-violet-100 flex items-center justify-center shrink-0">
                                <Icon className="w-3.75 h-3.75 text-violet-600" />
                            </div>
                            <span className="text-[12px] font-medium text-slate-500 leading-tight">{label}</span>
                        </div>
                        <p className="text-[17px] font-bold text-slate-900 leading-none pl-0.5">{value}</p>
                    </div>
                ))}
            </div>

            {/* ── FOOTER ── */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9.5 h-9.5 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                    <Brain className="w-4.5 h-4.5 text-indigo-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-slate-900 leading-tight truncate">
                        Random Forest Regressor
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Scikit-learn · MLflow</p>
                </div>
              
            </div>
        </div>
    );
}