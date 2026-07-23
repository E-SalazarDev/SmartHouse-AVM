import { motion } from "framer-motion";
import {
    Heart,
    MapPin,
    Calendar,
    Ruler,
    BedDouble,
    Bath,
    Car,
    Sparkles,
    Scale,
    ArrowRight,
} from "lucide-react";
import StatBox from "./StatBox";

export default function FavoriteCard({ property, onRemove, onCompareToggle, isComparing }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    {property.badge}
                </span>

                <motion.button
                    type="button"
                    onClick={() => onRemove(property.id)}
                    whileTap={{ scale: 0.85 }}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                    aria-label="Quitar de favoritos"
                >
                    <Heart size={15} className="fill-fuchsia-600 text-fuchsia-600" />
                </motion.button>

                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
                    <Calendar size={12} />
                    {property.year}
                </span>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={12} />
                    {property.neighborhood}
                </div>
                <h3 className="mt-1 text-sm font-semibold text-slate-900 truncate">
                    {property.title}
                </h3>

                <div className="mt-3 grid grid-cols-4 gap-1.5">
                    <StatBox icon={Ruler} value={`${property.area}m²`} label="Área" />
                    <StatBox icon={BedDouble} value={property.beds} label="Hab." />
                    <StatBox icon={Bath} value={property.baths} label="Baños" />
                    <StatBox icon={Car} value={property.garage} label="Garaje" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                        <Sparkles size={12} />
                        {property.condition}
                    </span>
                    <span className="text-xs text-slate-400">
                        Calidad {property.quality}/10
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                    >
                        Ver propiedad
                        <ArrowRight size={14} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onCompareToggle(property.id)}
                        title="Agregar a comparar"
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            isComparing
                                ? "border-violet-300 bg-violet-50 text-violet-700"
                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                    >
                        <Scale size={15} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}