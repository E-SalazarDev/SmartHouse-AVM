import { BedDouble, Bath, Maximize2, Car } from "lucide-react";

export default function PropertyFeatures({ property }) {
    const { bedroom_abv_gr, full_bath, gr_liv_area, garage_cars } = property;

    const items = [
        { icon: BedDouble, value: bedroom_abv_gr, label: "recámaras" },
        { icon: Bath, value: full_bath, label: "baños" },
        { icon: Maximize2, value: `${gr_liv_area} ft²`, label: "área" },
        { icon: Car, value: garage_cars, label: "garage" },
    ];

    return (
        <div className="flex flex-wrap items-center gap-5 border-t border-slate-100 py-4">
            {items.map(({ icon: Icon, value, label }, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                        <Icon className="h-4 w-4 text-slate-500" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">
                            {value}
                        </span>
                        <span className="text-xs text-slate-400">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}