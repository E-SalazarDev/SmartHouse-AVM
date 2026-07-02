import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export default function AiValuationCard({ predictPrice }) {
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);

  async function handlePredict() {
    setState("loading");
    try {
      const data = await predictPrice();
      setResult(data);
      setState("done");
    } catch (error) {
      console.log(error);
      setState("error");
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5">
      {/* Header: identidad del motor */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25">
          <span className="text-sm font-bold text-white">AI</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">
            SmartHouse AVM
          </span>
          <span className="text-xs text-slate-500">
            Motor de valuación automatizado
          </span>
        </div>
      </div>

      {/* Zona de resultado */}
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3.5"
          >
            <span className="text-sm text-slate-500">
              Precio estimado pendiente
            </span>
          </motion.div>
        )}

        {state === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5"
          >
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-sm text-slate-500">Analizando propiedad…</span>
              <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-linear-to-r from-indigo-500 to-purple-500"
                  animate={{ x: ["-20%", "260%"] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {state === "done" && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="flex flex-col gap-0.5 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 px-4 py-3.5"
          >
            <span className="text-xs font-medium text-indigo-600">
              Precio estimado por IA
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {formatCurrency(result.predicted_price)}
            </span>
          </motion.div>
        )}

        {state === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3.5"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" strokeWidth={2} />
            <span className="text-sm text-red-600">
              No se pudo calcular el precio. Intenta de nuevo.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de acción */}
      <motion.button
        onClick={handlePredict}
        disabled={state === "loading"}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
      >
        <Sparkles size={15} />
        {state === "done"
          ? "Volver a calcular"
          : state === "error"
          ? "Reintentar"
          : "Calcular precio con IA"}
        {state === "idle" && <ArrowRight size={14} className="opacity-60" />}
      </motion.button>
    </div>
  );
}

function formatCurrency(value) {
  if (value == null) return "—";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}