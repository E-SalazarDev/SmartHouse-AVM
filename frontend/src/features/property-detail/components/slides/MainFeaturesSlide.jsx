import {
    Maximize2,
    BedDouble,
    Bath,
    Car,
    Hash,
    Flame,
} from "lucide-react";

import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "../ui/FeatureCard";

export default function MainFeaturesSlide({ data }) {
    const features = [
        {
            icon: Maximize2,
            value: `${data.gr_liv_area} ft²`,
            label: "Área habitable",
        },
        {
            icon: BedDouble,
            value: `${data.bedroom_abv_gr} hab.`,
            label: "Habitaciones",
        },
        {
            icon: Bath,
            value: data.half_bath > 0
                ? `${data.full_bath} + ${data.half_bath}½`
                : `${data.full_bath}`,
            label: "Baños",
        },
        {
            icon: Car,
            value: data.garage_cars > 0
                ? `${data.garage_cars} auto${data.garage_cars > 1 ? "s" : ""}`
                : "Sin garaje",
            label: "Garaje",
        },
        {
            icon: Hash,
            value: `${data.tot_rms_abv_grd}`,
            label: "Total cuartos",
        },
        {
            icon: Flame,
            value: data.fireplaces > 0 ? data.fireplaces : "Ninguna",
            label: "Chimeneas",
        },
    ];

    return (
        <div>
            <SectionTitle>Características principales</SectionTitle>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {features.map((item) => (
                    <FeatureCard
                        key={item.label}
                        icon={item.icon}
                        value={item.value}
                        label={item.label}
                    />
                ))}
            </div>
        </div>
    );
}