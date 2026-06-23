import Card from "../../../components/ui/Card";
import img from "../../../assets/house.png";

export default function PropertyCard({ property }) {
  return (
    <Card
      padded={false}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.cover_image_url || img}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm backdrop-blur">
          Calidad {property.overall_qual}/10
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="line-clamp-1 text-xl font-bold text-white">
            {property.title}
          </h3>

          <p className="mt-1 text-sm text-white/80">
            {property.neighborhood || "Ubicación no disponible"}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xs text-slate-500">Año</p>
            <p className="font-bold text-slate-900">{property.year_built}</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xs text-slate-500">Área</p>
            <p className="font-bold text-slate-900">
              {property.gr_liv_area} ft²
            </p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xs text-slate-500">Baños</p>
            <p className="font-bold text-slate-900">{property.full_bath}</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-3">
            <p className="text-xs text-slate-500">Recámaras</p>
            <p className="font-bold text-slate-900">
              {property.bedroom_abv_gr}
            </p>
          </div>
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-blue-600">
          Ver detalle
          <span>→</span>
        </button>
      </div>
    </Card>
  );
}