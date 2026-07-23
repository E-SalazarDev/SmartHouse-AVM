import { Search } from "lucide-react";
import FilterSelect from "../filters/FilterSelect";
import { NEIGHBORHOODS, QUALITIES, YEARS } from "../../lib/filterOptions";

export default function FavoritesHeader({ count, loading, search, onSearchChange }) {
    return (
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-600/70">
                    Tu colección
                </span>
                <h1 className="mt-2 font-serif text-3xl md:text-4xl text-slate-900">
                    Favoritos
                </h1>
                {!loading && (
                    <p className="mt-2 text-sm text-slate-500">
                        {count} {count === 1 ? "propiedad guardada" : "propiedades guardadas"}
                    </p>
                )}
            </div>

            {!loading && count > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-56">
                        <Search
                            size={15}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Buscar en tus favoritos..."
                            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>
                    <FilterSelect label="Barrio" options={NEIGHBORHOODS} />
                    <FilterSelect label="Calidad" options={QUALITIES} />
                    <FilterSelect label="Año" options={YEARS} />
                </div>
            )}
        </div>
    );
}