import Grid from "../../components/ui/Grid";
import PageTitle from "../../components/ui/PageTitle";
import AiButton from "./components/AIButton";
import Card from "../../components/ui/Card";
import PropertyFeatures from "./components/PropertyFeatures";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById, postPredictPropertyPrice } from "./api/propertyDetailApi";
import { useParams } from "react-router-dom";
import { resolveImageUrl } from "../../utils/media";
import { MapPin, Sparkles, CalendarDays, LandPlot } from "lucide-react";

function qualityLabel(score) {
    if (score >= 9) return "Premium";
    if (score >= 7) return "Muy buena";
    if (score >= 5) return "Buena";
    return "Estándar";
}

function qualityTone(score) {
    if (score >= 9) return "text-violet-600 bg-violet-50";
    if (score >= 7) return "text-indigo-600 bg-indigo-50";
    if (score >= 5) return "text-amber-600 bg-amber-50";
    return "text-slate-600 bg-slate-50";
}

export default function PropertyDetail() {
    const { propertyId } = useParams();

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["properties", propertyId],
        queryFn: () => getPropertyById(propertyId),
    });

    if (isLoading) {
        return <h3>loading..</h3>;
    }

    if (isError) {
        return (
            <>
                <h3>
                    Oops <p>{error.toString()}</p>
                </h3>
            </>
        );
    }

    const imageUrl = resolveImageUrl(data.cover_image_url);

 
    const quickFacts = [
        {
            icon: Sparkles,
            value: qualityLabel(data.overall_qual),
            label: `Calidad ${data.overall_qual}/10`,
            tone: qualityTone(data.overall_qual),
        },
        {
            icon: CalendarDays,
            value: data.year_built,
            label: "Año de construcción",
            tone: "text-slate-600 bg-slate-50",
        },
        {
            icon: LandPlot,
            value: data.ms_zoning,
            label: "Zonificación",
            tone: "text-slate-600 bg-slate-50",
        },
        {
            icon: MapPin,
            value: data.neighborhood,
            label: "Zona",
            tone: "text-slate-600 bg-slate-50",
        },
    ];

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 md:p-6 shadow-xl flex flex-col gap-5">
            <PageTitle
                eyebrow="Catálogo"
                variant="default"
                size="md"
                title={data.title}
            />

            <Grid className="grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                {/* ---- Columna izquierda: galería ---- */}
                <div className="flex flex-col gap-4">
                    <Card padded={false} className="overflow-hidden rounded-3xl border border-slate-200">
                        <img
                            src={imageUrl}
                            alt={data.title}
                            className="h-80 w-full object-cover lg:h-96"
                        />
                    </Card>

          
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {quickFacts.map(({ icon: Icon, value, label, tone }, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3.5"
                            >
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-xl ${tone}`}
                                >
                                    <Icon className="h-4 w-4" strokeWidth={2} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="truncate text-sm font-semibold text-slate-900">
                                        {value}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ---- Card de IA ---- */}
                    <AiButton predictPrice={() => postPredictPropertyPrice(data.id)} />
                </div>

                {/* ---- Columna derecha: detalle ---- */}
                <Card className="flex flex-col gap-5 rounded-3xl border border-slate-200 p-5 lg:p-6">
                    {/* Título */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-semibold text-slate-900 leading-snug">
                                {data.title}
                            </h2>
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                                {data.neighborhood}
                            </span>
                        </div>
                    </div>

                    {/* Specs rápidas */}
                    <PropertyFeatures property={data} />

                    {/* Descripción */}
                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Descripción
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500">
                            {data.description}
                        </p>
                    </div>

                    {/* Ubicación */}
                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Ubicación
                        </h3>
                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                            <span className="text-sm text-slate-600">
                                Zona {data.neighborhood}
                            </span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 shadow-sm">
                                <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Datos técnicos (key features) */}
                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Datos técnicos
                        </h3>
                        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                            <li className="text-sm text-slate-500">
                                • Calidad de construcción: {data.overall_qual}/10
                            </li>
                            <li className="text-sm text-slate-500">
                                • Año de construcción: {data.year_built}
                            </li>
                            <li className="text-sm text-slate-500">
                                • Zonificación: {data.ms_zoning}
                            </li>
                            <li className="text-sm text-slate-500">
                                • Garage: {data.garage_cars} autos
                            </li>
                        </ul>
                    </div>
                </Card>
            </Grid>
        </div>
    );
}