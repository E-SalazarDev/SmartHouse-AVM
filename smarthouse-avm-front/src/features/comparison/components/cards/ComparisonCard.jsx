import { motion } from "framer-motion";
import { X, MapPin } from "lucide-react";

export default function ComparisonCard({ property, onRemove }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-shadow"
        >
            <div className="relative aspect-video">
                <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover"
                />
                <button
                    type="button"
                    onClick={() => onRemove(property.id)}
                    className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                    aria-label="Quitar de la comparación"
                >
                    <X size={13} className="text-slate-600" />
                </button>
            </div>
            <div className="p-3.5">
                <p className="text-sm font-semibold text-slate-900 truncate">
                    {property.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={11} />
                    {property.neighborhood}
                </p>
                <p className="mt-2 font-mono text-base font-semibold text-slate-900">
                    ${property.price.toLocaleString()}
                </p>
            </div>
        </motion.div>
    );
}