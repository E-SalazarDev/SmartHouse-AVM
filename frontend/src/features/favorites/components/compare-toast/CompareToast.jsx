import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CompareToast({ count, onClear }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-slate-950 pl-4 pr-2 py-2 shadow-2xl shadow-black/30"
        >
            <span className="text-sm text-white">
                {count} {count === 1 ? "propiedad seleccionada" : "propiedades seleccionadas"}
            </span>
            <button
                type="button"
                className="rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-4 py-1.5 text-xs font-medium text-white"
            >
                Comparar ahora
            </button>
            <button
                type="button"
                onClick={onClear}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:text-white"
            >
                <X size={14} />
            </button>
        </motion.div>
    );
}