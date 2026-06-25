import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BedDouble, 
  Bath, 
  Car, 
  Ruler, 
  MapPin, 
  Flame,
  Calendar,
  ArrowRight,
  Sparkles,
  Heart,
  Share2
} from "lucide-react";

function sqftToM2(sqft) {
  return Math.round(sqft * 0.092903);
}

function qualityTone(score) {
  if (score >= 9) return { 
    color: "text-violet-500",
    bg: "bg-violet-500",
    label: "Excelente",
    badge: "bg-violet-500/90 text-white"
  };
  if (score >= 7) return { 
    color: "text-indigo-500",
    bg: "bg-indigo-500",
    label: "Muy buena",
    badge: "bg-indigo-500/90 text-white"
  };
  if (score >= 5) return { 
    color: "text-amber-500",
    bg: "bg-amber-500",
    label: "Buena",
    badge: "bg-amber-500/90 text-white"
  };
  return { 
    color: "text-slate-400",
    bg: "bg-slate-400",
    label: "Estándar",
    badge: "bg-slate-400/90 text-white"
  };
}

export default function PropertyCard({ property }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const {
    title,
    cover_image_url,
    neighborhood,
    overall_qual,
    gr_liv_area,
    garage_cars,
    full_bath,
    bedroom_abv_gr,
    fireplaces,
    year_built,
  } = property;

  const quality = qualityTone(overall_qual);
  const areaM2 = sqftToM2(gr_liv_area);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.15)] transition-shadow duration-300 overflow-hidden"
    >
      
      {/* ---- Imagen ---- */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
        )}
        <img
          src={cover_image_url}
          alt={title}
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badge calidad */}
        <div className={`${quality.badge} absolute top-3 left-3 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5`}>
          <Sparkles className="w-3 h-3" />
          <span className="text-[10px] font-bold tracking-wide">{quality.label}</span>
        </div>

        {/* Año */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-white/70" />
          <span className="text-[10px] font-medium text-white">{year_built}</span>
        </div>

        {/* Botones flotantes */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-md p-1.5 rounded-full border border-white/20 hover:bg-white/40 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`backdrop-blur-md p-1.5 rounded-full border border-white/20 transition-all ${
              isLiked ? "bg-rose-500/80" : "bg-white/20 hover:bg-white/40"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${
              isLiked ? "fill-white text-white" : "text-white"
            }`} />
          </motion.button>
        </div>

        {/* Ubicación */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <MapPin className="w-3.5 h-3.5 text-white/80" strokeWidth={2} />
          <span className="text-xs font-medium truncate">{neighborhood}</span>
        </div>
      </div>

      {/* ---- Contenido ---- */}
      <div className="p-4 space-y-3">
        
        {/* Título */}
        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-violet-600 transition-colors">
          {title}
        </h3>

        {/* ---- NUEVA SECCIÓN DE CARACTERÍSTICAS - MODERNA Y COMPACTA ---- */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
          {/* Área */}
          <div className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-violet-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-700">{areaM2}m²</span>
          </div>

          <div className="w-px h-6 bg-slate-200" />

          {/* Dormitorios */}
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-700">{bedroom_abv_gr}</span>
          </div>

          <div className="w-px h-6 bg-slate-200" />

          {/* Baños */}
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-cyan-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-700">{full_bath}</span>
          </div>

          <div className="w-px h-6 bg-slate-200" />

          {/* Garaje */}
          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-amber-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-700">{garage_cars}</span>
          </div>

          {fireplaces > 0 && (
            <>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500" strokeWidth={2} />
                <span className="text-sm font-semibold text-slate-700">{fireplaces}</span>
              </div>
            </>
          )}
        </div>

        {/* Calidad - Barra minimalista */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium text-slate-400">Calidad</span>
          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(overall_qual / 10) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`h-full rounded-full ${quality.bg}`}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-600">{overall_qual}/10</span>
        </div>

        {/* Botón CTA - Compacto y elegante */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="relative w-full overflow-hidden rounded-xl py-2.5 px-4 text-sm font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          }}
        >
          <span className="relative flex items-center justify-center gap-2 z-10">
            Explorar propiedad
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <motion.div 
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </div>
    </motion.article>
  );
}