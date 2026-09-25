import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Heart, Info } from "lucide-react";

import Grid from "../../components/ui/Grid";
import PropertyCard from "../../features/properties/components/PropertyCard";
import PropertyCardSkeleton from "../../features/properties/components/PropertyCardSkeleton";
import PropertyExploreHeader from "../../features/properties/components/PropertyExploreHeader";
import FavoritesEmptyState from "./components/empty-state/FavoritesEmptyState";
import useFavorites from "../../features/favorites/hooks/useFavorites";
import { buildFilterOptions } from "../../features/favorites/lib/buildFilterOptions";
import { filterFavorites } from "../../features/favorites/lib/filterFavorites";

const MANY_FAVORITES_THRESHOLD = 40;

const initialFilters = {
    search: "",
    neighborhood: "",
    ms_zoning: "",

    quality_preset: "",
    min_quality: "",
    max_quality: "",

    area_preset: "",
    min_area: "",
    max_area: "",

    year_preset: "",
    year_built_min: "",
    year_built_max: "",

    garage_cars: "",
    min_garage_cars: "",
    min_bedrooms: "",
    min_full_bath: "",
};

export default function Favorites() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initialFilters);
    const { favorites, isLoading, isError } = useFavorites();

    const properties = favorites.map((f) => f.property);
    const filterOptions = buildFilterOptions(properties);
    const filtered = filterFavorites(properties, filters);

    function handleFilterChange(name, value) {
        setFilters((previous) => ({ ...previous, [name]: value }));
    }

    function handleMultipleFilterChanges(changes) {
        setFilters((previous) => ({ ...previous, ...changes }));
    }

    function handleClearFilters() {
        setFilters({ ...initialFilters });
    }

    function openPropertyDetail(propertyId) {
        navigate(`/explorar/${propertyId}`);
    }

    return (
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
            <PropertyExploreHeader
                title="Favoritos"
                subtitle="Las propiedades que has guardado para revisar o comparar"
                icon={Heart}
                totalProperties={properties.length}
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                onMultipleFilterChanges={handleMultipleFilterChanges}
                onClearFilters={handleClearFilters}
            />

            {!isLoading &&
                !isError &&
                properties.length >= MANY_FAVORITES_THRESHOLD && (
                    <div className="flex items-center gap-2.5 rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-3">
                        <Info className="h-4 w-4 shrink-0 text-violet-500" />
                        <p className="text-sm text-violet-700">
                            Tienes {properties.length} propiedades guardadas — usa los filtros arriba para encontrar más rápido lo que buscas.
                        </p>
                    </div>
                )}

            {isLoading ? (
                <Grid className="grid-cols-1 items-stretch gap-10 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <PropertyCardSkeleton key={index} />
                    ))}
                </Grid>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                        <AlertTriangle className="h-6 w-6 text-red-500" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                        No se pudieron cargar tus favoritos
                    </p>
                </div>
            ) : properties.length === 0 ? (
                <FavoritesEmptyState />
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <p className="text-sm font-semibold text-slate-900">
                        No encontramos propiedades
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Prueba modificando o limpiando los filtros.
                    </p>
                </div>
            ) : (
                <Grid className="grid-cols-1 items-stretch gap-10 sm:grid-cols-3 lg:grid-cols-4">
                    <AnimatePresence>
                        {filtered.map((property) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                            >
                                <PropertyCard
                                    property={property}
                                    onClick={() => openPropertyDetail(property.id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Grid>
            )}
        </div>
    );
}