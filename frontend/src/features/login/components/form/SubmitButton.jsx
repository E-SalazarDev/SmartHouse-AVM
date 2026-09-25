import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({ isLoading, children }) {
    return (
        <motion.button
            whileHover={isLoading ? undefined : { scale: 1.01 }}
            whileTap={isLoading ? undefined : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 py-2.5 text-sm font-medium tracking-normal text-white shadow-sm transition-shadow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
            {isLoading && <LoaderCircle size={17} className="animate-spin" />}
            {children}
        </motion.button>
    );
}