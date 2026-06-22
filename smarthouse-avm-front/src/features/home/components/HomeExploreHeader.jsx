import { Building2 } from "lucide-react";
import Card from "../../../components/ui/Card";
import PageTitle from "../../../components/ui/PageTitle";
import { homeFilters } from "../constants/homeFilters";

export default function HomeExploreHeader() {
    return (
        <Card className="rounded-4xl border border-white/70 bg-white/80 p-0 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl overflow-hidden">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between p-6">
                <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-slate-950 items-center justify-center shadow-lg shadow-slate-500/20 shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <PageTitle
                                variant="default"
                                size="md"
                                title="Explora propiedades registradas"
                            />

                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-xs font-bold text-indigo-600 border border-indigo-100">
                                24 propiedades
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                            Inmuebles disponibles para análisis, comparación y valuación
                            mediante inteligencia artificial.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                    <button className="shrink-0 px-4 py-2 rounded-full text-xs font-bold bg-slate-950 text-white shadow-sm">
                        Todas
                    </button>

                    {homeFilters.map((filter) => (
                        <FilterButton
                            key={filter.label}
                            icon={filter.icon}
                            label={filter.label}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
}

function FilterButton({ icon: Icon, label }) {
    return (
        <button className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
            <Icon className="w-3.5 h-3.5" />
            {label}
        </button>
    );
}