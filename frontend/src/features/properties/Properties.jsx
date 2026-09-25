import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import Grid from "../../components/ui/Grid";
import PropertyCard from "./components/PropertyCard";
import PropertyCardSkeleton from "./components/PropertyCardSkeleton";
import FloatingPagination from "./components/FloatingPagination";
import PropertyExploreHeader from "./components/PropertyExploreHeader";

import {
    getProperties,
    getPropertyFilterOptions,
} from "./api/propertiesApi";


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


export default function Properties() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState(
        initialFilters
    );


    function handleFilterChange(name, value) {
        setPage(1);

        setFilters((previousFilters) => ({
            ...previousFilters,
            [name]: value,
        }));
    }


    function handleMultipleFilterChanges(changes) {
        setPage(1);

        setFilters((previousFilters) => ({
            ...previousFilters,
            ...changes,
        }));
    }


    function handleClearFilters() {
        setPage(1);

        setFilters({
            ...initialFilters,
        });
    }


    const hasInvalidAreaRange =
        filters.min_area !== "" &&
        filters.max_area !== "" &&
        Number(filters.min_area) >
            Number(filters.max_area);


    const hasInvalidYearRange =
        filters.year_built_min !== "" &&
        filters.year_built_max !== "" &&
        Number(filters.year_built_min) >
            Number(filters.year_built_max);


    const hasInvalidQualityRange =
        filters.min_quality !== "" &&
        filters.max_quality !== "" &&
        Number(filters.min_quality) >
            Number(filters.max_quality);


    const hasInvalidFilters =
        hasInvalidAreaRange ||
        hasInvalidYearRange ||
        hasInvalidQualityRange;


    const {
        data: filterOptions,
        isLoading: isLoadingFilterOptions,
        isError: isFilterOptionsError,
        refetch: refetchFilterOptions,
    } = useQuery({
        queryKey: [
            "property-filter-options",
        ],
        queryFn: getPropertyFilterOptions,
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });


    const {
        data: dataProperties,
        isLoading,
        isFetching,
        isError,
        refetch: refetchProperties,
    } = useQuery({
        queryKey: [
            "properties",
            page,
            filters,
        ],
        queryFn: () =>
            getProperties(
                page,
                filters
            ),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        enabled: !hasInvalidFilters,
    });


    useEffect(() => {
        if (hasInvalidFilters) {
            return;
        }

        const totalPages =
            dataProperties?.total_pages ?? 1;

        if (page >= totalPages) {
            return;
        }

        const nextPage = page + 1;

        queryClient.prefetchQuery({
            queryKey: [
                "properties",
                nextPage,
                filters,
            ],
            queryFn: () =>
                getProperties(
                    nextPage,
                    filters
                ),
            staleTime: 1000 * 60 * 5,
        });
    }, [
        page,
        filters,
        dataProperties?.total_pages,
        queryClient,
        hasInvalidFilters,
    ]);


    function openPropertyDetail(propertyId) {
        navigate(
            `/explorar/${propertyId}`
        );
    }


    function handleRetry() {
        refetchFilterOptions();

        if (!hasInvalidFilters) {
            refetchProperties();
        }
    }


    if (
        isLoading ||
        isLoadingFilterOptions
    ) {
        return (
            <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
                <PropertyExploreHeader
                    totalProperties={0}
                    filters={filters}
                    filterOptions={
                        filterOptions
                    }
                    onFilterChange={
                        handleFilterChange
                    }
                    onMultipleFilterChanges={
                        handleMultipleFilterChanges
                    }
                    onClearFilters={
                        handleClearFilters
                    }
                />

                <Grid className="grid-cols-1 items-stretch gap-10 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({
                        length: 8,
                    }).map(
                        (_, index) => (
                            <PropertyCardSkeleton
                                key={index}
                            />
                        )
                    )}
                </Grid>
            </div>
        );
    }


    if (
        isError ||
        isFilterOptionsError
    ) {
        return (
            <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
                <PropertyExploreHeader
                    totalProperties={0}
                    filters={filters}
                    filterOptions={
                        filterOptions
                    }
                    onFilterChange={
                        handleFilterChange
                    }
                    onMultipleFilterChanges={
                        handleMultipleFilterChanges
                    }
                    onClearFilters={
                        handleClearFilters
                    }
                />

                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                        <AlertTriangle
                            className="h-6 w-6 text-red-500"
                            strokeWidth={2}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-slate-900">
                            No se pudieron cargar
                            las propiedades
                        </p>

                        <p className="text-sm text-slate-500">
                            Revisa tu conexión e
                            intenta de nuevo.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        onClick={handleRetry}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-600"
                    >
                        <RefreshCw
                            className="h-3.5 w-3.5"
                            strokeWidth={2.5}
                        />

                        Reintentar
                    </motion.button>
                </div>
            </div>
        );
    }


    return (
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
            <PropertyExploreHeader
                totalProperties={
                    dataProperties?.count ?? 0
                }
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={
                    handleFilterChange
                }
                onMultipleFilterChanges={
                    handleMultipleFilterChanges
                }
                onClearFilters={
                    handleClearFilters
                }
            />

            {hasInvalidFilters && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-800">
                        Corrige los rangos para
                        actualizar los resultados.
                    </p>

                    {hasInvalidQualityRange && (
                        <p className="mt-1 text-xs text-amber-700">
                            La calidad máxima no
                            puede ser menor que la
                            calidad mínima.
                        </p>
                    )}

                    {hasInvalidAreaRange && (
                        <p className="mt-1 text-xs text-amber-700">
                            El área máxima no puede
                            ser menor que el área
                            mínima.
                        </p>
                    )}

                    {hasInvalidYearRange && (
                        <p className="mt-1 text-xs text-amber-700">
                            El año máximo no puede
                            ser menor que el año
                            mínimo.
                        </p>
                    )}
                </div>
            )}

            {isFetching &&
                !hasInvalidFilters && (
                    <p className="text-xs text-slate-500">
                        Actualizando resultados...
                    </p>
                )}

            {dataProperties?.results?.length >
            0 ? (
                <Grid className="grid-cols-1 items-stretch gap-10 sm:grid-cols-3 lg:grid-cols-4">
                    {dataProperties.results.map(
                        (property) => (
                            <PropertyCard
                                key={
                                    property.id
                                }
                                property={
                                    property
                                }
                                onClick={() =>
                                    openPropertyDetail(
                                        property.id
                                    )
                                }
                            />
                        )
                    )}
                </Grid>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                    <p className="text-sm font-semibold text-slate-900">
                        No encontramos propiedades
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Prueba modificando o
                        limpiando los filtros.
                    </p>
                </div>
            )}

            {!hasInvalidFilters && (
                <FloatingPagination
                    page={
                        dataProperties
                            ?.current_page ??
                        page
                    }
                    totalPages={
                        dataProperties
                            ?.total_pages ?? 1
                    }
                    disabledPrevious={
                        !dataProperties?.previous ||
                        isFetching
                    }
                    disabledNext={
                        !dataProperties?.next ||
                        isFetching
                    }
                    onClickPrevious={() =>
                        setPage(
                            (
                                previousPage
                            ) =>
                                Math.max(
                                    previousPage -
                                        1,
                                    1
                                )
                        )
                    }
                    onClickNext={() =>
                        setPage(
                            (
                                currentPage
                            ) =>
                                Math.min(
                                    currentPage +
                                        1,
                                    dataProperties
                                        ?.total_pages ??
                                        1
                                )
                        )
                    }
                />
            )}
        </div>
    );
}