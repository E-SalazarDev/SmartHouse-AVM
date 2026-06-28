import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Grid from "../../components/ui/Grid";
import PropertyCard from "./components/PropertyCard";
import { getProperties } from "./api/propertiesApi";
import PageTitle from "../../components/ui/PageTitle";
import PropertyCardSkeleton from "./components/PropertyCardSkeleton";
import SectionHeader from "./components/SectionHeader";
import { useQuery } from "@tanstack/react-query";


export default function Properties() {
    const navigate = useNavigate();


    const {
        data: dataProperties = [],
        isLoading,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ["properties"],
        queryFn: getProperties,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    const propertyDetail = (propertyId) => {
        navigate(`/explorar/${propertyId}`);
    };


    // ---- Estado: cargando ----
    if (isLoading) {
        return (
            <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
                <SectionHeader />
                <Grid className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch gap-10">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <PropertyCardSkeleton key={i} />
                    ))}
                </Grid>
            </div>
        );
    }

    // ---- Estado: error ----
    if (isError) {
        return (
            <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
                <SectionHeader />
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white py-16 px-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                        <AlertTriangle className="w-6 h-6 text-red-500" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-slate-900">
                            No se pudieron cargar las propiedades
                        </p>
                        <p className="text-sm text-slate-500">
                            Revisa tu conexión e intenta de nuevo.
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-600 transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Reintentar
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <SectionHeader />

            <Grid className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 items-stretch gap-10">
                {dataProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onClick={()=>propertyDetail(property.id)}
                    />
                ))}
            </Grid>
        </div>
    );
}