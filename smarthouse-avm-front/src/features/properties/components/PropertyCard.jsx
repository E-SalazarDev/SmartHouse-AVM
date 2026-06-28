import { useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  Calendar,
  ArrowRight,
  Heart,
  Sparkles,
} from "lucide-react";

import { resolveImageUrl } from "../../../utils/media";

function sqftToM2(sqft) {
  return Math.round(Number(sqft || 0) * 0.092903);
}

function qualityText(score) {
  if (score >= 9) return "Vivienda premium";
  if (score >= 7) return "Muy buen estado";
  if (score >= 5) return "Buen estado";
  return "Estado estándar";
}

function qualityColor(score) {
  if (score >= 9) return "text-violet-600 bg-violet-50 border-violet-100";
  if (score >= 7) return "text-indigo-600 bg-indigo-50 border-indigo-100";
  if (score >= 5) return "text-amber-600 bg-amber-50 border-amber-100";
  return "text-slate-600 bg-slate-50 border-slate-100";
}

function zoningText(zone) {
  const zones = {
    RL: "Residencial",
    RM: "Residencial media",
    FV: "Villa residencial",
    "C (all)": "Comercial",
  };

  return zones[zone] || zone || "Zona no definida";
}

export default function PropertyCard({ property, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const {
    title,
    cover_image_url,
    neighborhood,
    ms_zoning,
    overall_qual,
    gr_liv_area,
    garage_cars,
    full_bath,
    bedroom_abv_gr,
    year_built,
  } = property;

  const imageUrl = resolveImageUrl(cover_image_url);
  const areaM2 = sqftToM2(gr_liv_area);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-[0_24px_55px_-25px_rgba(15,23,42,0.45)]"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
        )}

        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={(event) => {
            event.currentTarget.src = "/placeholder-house.jpg";
            setImgLoaded(true);
          }}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-sm backdrop-blur-md">
          {zoningText(ms_zoning)}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsLiked((value) => !value);
          }}
          className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur-md transition ${
            isLiked
              ? "bg-rose-500 text-white"
              : "bg-white/20 text-white hover:bg-white/35"
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5 text-white/90">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-xs font-semibold">
                {neighborhood}
              </span>
            </div>

            <h3 className="line-clamp-1 text-lg font-black text-white">
              {title}
            </h3>
          </div>

          <div className="shrink-0 rounded-full bg-black/35 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            <Calendar className="mr-1 inline h-3.5 w-3.5 text-white/70" />
            {year_built}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="grid grid-cols-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
          <Feature icon={<Ruler />} value={`${areaM2}m²`} label="Área" />
          <Feature icon={<BedDouble />} value={bedroom_abv_gr} label="Hab." />
          <Feature icon={<Bath />} value={full_bath} label="Baños" />
          <Feature icon={<Car />} value={garage_cars} label="Garaje" />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${qualityColor(
              overall_qual
            )}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {qualityText(overall_qual)}
          </div>

          <span className="text-xs font-bold text-slate-500">
            Calidad {overall_qual}/10
          </span>
        </div>

        <motion.button
          type="button"
          onClick={onClick}
          whileHover="hover"
          whileTap={{ scale: 0.97 }}
          initial="initial"
          className="relative mt-4 w-full overflow-hidden rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/10"
        >
          <motion.span
            variants={{
              initial: { x: 0 },
              hover: { x: -4 },
            }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex items-center justify-center gap-2"
          >
            Explorar propiedad
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 6 },
              }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.span>

          <motion.div
            variants={{
              initial: { x: "-110%" },
              hover: { x: "110%" },
            }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 w-1/2 skew-x-12 bg-white/15"
          />

          <motion.div
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600"
          />
        </motion.button>
      </div>
    </motion.article>
  );
}

function Feature({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 border-r border-slate-200 px-2 py-3 last:border-r-0">
      <div className="text-violet-600 [&>svg]:h-4 [&>svg]:w-4">{icon}</div>

      <span className="text-sm font-black text-slate-800">{value ?? 0}</span>

      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
    </div>
  );
}