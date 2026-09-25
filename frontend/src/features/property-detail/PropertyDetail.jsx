import AiValuationCard from "./components/ai/AiValuationCard";
import PropertyDescription from "./components/description/PropertyDescription";
import PropertyFeaturesCarousel from "./components/carousel/PropertyFeaturesCarousel";

import { useQuery } from "@tanstack/react-query";
import { getPropertyById, postPredictPropertyPrice } from "./api/propertyDetailApi";
import { useParams } from "react-router-dom";
import { resolveImageUrl } from "../../utils/media";

import { MapPin, Star, Calendar, Layers } from "lucide-react";

function qualityLabel(score) {
    if (score >= 9) return "Premium";
    if (score >= 7) return "Muy buena";
    if (score >= 5) return "Buena";
    if (score >= 3) return "Regular";
    return "Básica";
}

export default function PropertyDetail() {
    const { propertyId } = useParams();

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["properties", propertyId],
        queryFn: () => getPropertyById(propertyId),
    });

    if (isLoading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500">
                Cargando propiedad...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-600">
                Ocurrió un error: {error.toString()}
            </div>
        );
    }

    const imageUrl = resolveImageUrl(data.cover_image_url);

    const imageBadges = [
        {
            icon: Star,
            label: "Calidad",
            value: `${qualityLabel(data.overall_qual)} · ${data.overall_qual}/10`,
        },
        {
            icon: Calendar,
            label: "Año",
            value: data.year_built,
        },
        {
            icon: Layers,
            label: "Zona",
            value: data.ms_zoning,
        },
    ];

    return (
        <section className="w-full rounded-4xl border border-slate-200 bg-linear-to-br from-[#f6f7fb] via-white to-violet-50/60 p-4 shadow-xl md:p-6">
          <div className="grid items-stretch grid-cols-1 gap-4 xl:grid-cols-[51.5%_1fr] xl:gap-5">

                {/* ─── Columna izquierda: imagen + AI card ─── */}
                <div className="grid h-full grid-rows-[1fr_auto] gap-4">

                    {/* Imagen */}
                    <div className="overflow-hidden rounded-[1.8rem] border border-white bg-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt={data.title}
                               className="h-72 w-full object-cover lg:h-102.5 xl:h-112.5"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-violet-200">
                                    SmartHouse Property
                                </p>

                                <h2 className="mt-1.5 text-3xl font-bold leading-tight text-white">
                                    {data.title}
                                </h2>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg">
                                        <MapPin className="h-4 w-4 text-violet-600" />
                                        {data.neighborhood}
                                    </span>

                                    {imageBadges.map(({ icon: Icon, label, value }) => (
                                        <span
                                            key={label}
                                            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md"
                                        >
                                            <Icon className="h-4 w-4 text-violet-200" />
                                            <span className="text-white/70">{label}:</span>
                                            <span>{value}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <AiValuationCard
                        predictPrice={() => postPredictPropertyPrice(data.id)}
                    />
                </div>

                {/* ─── Columna derecha: descripción + carrusel ─── */}
                <div className="grid h-full grid-rows-[auto_1fr] rounded-[1.8rem] border border-white bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                    <PropertyDescription description={data.description} />

                    <PropertyFeaturesCarousel data={data} />
                </div>
            </div>
        </section>
    );
}