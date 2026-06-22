import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Check, Loader2 } from "lucide-react";

export default function AIButton() {
  const [state, setState] = useState("idle"); // idle | loading | success

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("success"), 1800);
    setTimeout(() => setState("idle"), 3500);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative w-full overflow-hidden rounded-2xl bg-white text-black font-semibold py-4 flex items-center justify-center gap-2"
    >
      {/* Shine sweep en hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 relative z-10"
          >
            <Sparkles size={16} />
            Calcular precio con IA
          </motion.span>
        )}

        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 relative z-10"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={16} />
            </motion.span>
            Analizando…
          </motion.span>
        )}

        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex items-center gap-2 relative z-10"
          >
            <Check size={16} />
            Listo
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}