import img from "../../assets/house.png";
import PageTitle from "../../components/ui/PageTitle";
import Card from "../../components/ui/Card";
import Grid from "../../components/ui/Grid";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AiValuationCard from "../../components/ui/AiValuationCard";
import AiNeuralHouseCard from "../../components/ui/AiNeuralHouseCard";

export default function Home() {
    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-[#f5f5f5] p-4 md:p-6 shadow-xl flex flex-col gap-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01 }}
                className="relative min-h-96 rounded-[1.75rem] overflow-hidden shadow-[0_20px_45px_-12px_rgba(15,23,42,0.35)]"
            >
                <img
                    src={img}
                    alt="Propiedad analizada por IA"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/25 via-transparent to-transparent" />
            </motion.div>

            <Grid className="grid-cols-1 md:grid-cols-3 items-stretch gap-4">
                <div className="md:col-span-2 grid grid-rows-2 gap-4">
                    <Card className="min-h-36 border border-slate-300 rounded-2xl shadow-2xl">
                        <PageTitle
                            variant="gradient"
                            size="lg"
                            title="Valuación inmobiliaria con la precisión de la IA"
                            subtitle="SmartHouse AVM analiza características, ubicación y comparables 
                            reales del mercado para estimar con precisión el valor de cualquier 
                            vivienda — en segundos, sin necesidad de visitarla."
                        />
                    </Card>

                    {/* Card del CTA: ícono + contenido + botón, sin espacio muerto */}
                    <Card className="min-h-36 rounded-2xl p-0 overflow-hidden border border-slate-200 shadow-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center gap-6 p-6 h-full">
                            {/* Ícono visual */}
                            <div className="hidden sm:flex h-14 w-14 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
                                <Sparkles className="w-7 h-7 text-white" />
                            </div>

                            {/* Contenido central */}
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-700 text-sm md:text-base font-medium">
                                    Calcula el valor real de cualquier propiedad en segundos.
                                </p>

                                <div className="flex items-center gap-6 pt-1 border-t border-slate-100">
                                    <div className="flex flex-col pt-3">
                                        <span className="text-lg font-bold text-slate-900">
                                            94.2%
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            precisión
                                        </span>
                                    </div>

                                    <div className="w-px h-8 bg-slate-200" />

                                    <div className="flex flex-col pt-3">
                                        <span className="text-lg font-bold text-slate-900">
                                            38K+
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            propiedades
                                        </span>
                                    </div>

                                    <div className="w-px h-8 bg-slate-200" />

                                    <div className="flex flex-col pt-3">
                                        <span className="text-lg font-bold text-slate-900">
                                            &lt;2s
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            respuesta
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón */}
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                                className="px-8 py-3.5 text-white font-semibold rounded-xl text-sm bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30 whitespace-nowrap w-full sm:w-auto"
                            >
                                Empezar valuación
                            </motion.button>
                        </div>
                    </Card>
                </div>

                <AiValuationCard />
                {/* <AiNeuralHouseCard /> */}
            </Grid>

            <Grid className="grid-cols-1">
                <Card className="min-h-20"></Card>
                <Card className="min-h-20">fila 2</Card>
                <Card className="min-h-20">fila 3</Card>
            </Grid>

            <PageTitle
                variant="gradient"
                size="sm"
                title="Resultado de la valuación"
            />

            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                <Card padded={false} className="overflow-hidden">
                    <div className="h-56 sm:h-64 md:h-72 overflow-hidden">
                        <img
                            src={img}
                            alt="Casa"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="p-4 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-semibold text-lg">
                                Casa Moderna
                            </h3>

                            <p className="text-slate-500 text-sm">
                                Vista previa de la propiedad
                            </p>
                        </div>

                        <button className="shrink-0 w-10 h-10 rounded-full bg-brand-blue hover:opacity-90 transition text-white">
                            →
                        </button>
                    </div>
                </Card>
            </Grid>
        </div>
    );
}