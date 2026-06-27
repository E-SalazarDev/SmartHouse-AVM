import { User } from "lucide-react";
import { motion } from "framer-motion";

export default function HeaderAuthButton() {
    return (
        <div className="flex min-w-max items-center justify-end md:w-1/4">
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-shadow hover:shadow-md md:px-4"
            >
                <User size={16} strokeWidth={2.2} />
                <span className="hidden text-sm md:inline">Iniciar Sesión</span>
            </motion.button>
        </div>
    );
}