import img from "../../../assets/house.png";

export default function PropertyCard({ property }) {
  return (
    <article className="group w-full max-w-md overflow-hidden rounded-4xl bg-white p-3 shadow-[0_24px_70px_-35px_rgba(15,23,42,.55)] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-[0_34px_90px_-40px_rgba(99,102,241,.7)]">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-slate-950 p-4 text-white">
        <img
          src={property.cover_image_url || img}
          alt={property.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950/80 to-slate-950/20" />

        <div className="relative z-10 flex min-h-72 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-md">
              Calidad {property.overall_qual}/10
            </span>

            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
              Activa
            </span>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
              {property.neighborhood}
            </p>

            <h3 className="max-w-xs text-3xl font-black leading-none">
              {property.title}
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <Mini label="Área" value={`${property.gr_liv_area} ft²`} />
              <Mini label="Baños" value={property.full_bath} />
              <Mini label="Hab." value={property.bedroom_abv_gr} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-2 py-4">
        <div>
          <p className="text-xs font-semibold text-slate-400">Construida en</p>
          <p className="text-xl font-black text-slate-950">
            {property.year_built}
          </p>
        </div>

        <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-violet-600">
          Ver detalle →
        </button>
      </div>
    </article>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
      <p className="text-[11px] text-white/55">{label}</p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}