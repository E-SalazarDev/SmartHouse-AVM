import {
    LandPlot,
    Home,
    Calendar,
    Layers,
    Hammer,
    Hash,
} from "lucide-react";

import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "../ui/FeatureCard";
import { ZONING_LABELS, translate } from "../../lib/propertyLabels";

export default function LandConstructionSlide({ data }) {
    const zoningLabel = translate(
        ZONING_LABELS,
        data.ms_zoning,
        data.ms_zoning
    );

    const features = [
        {
            icon: LandPlot,
            label: "Terreno",
            value: `${data.lot_area} ft²`,
            sub: data.lot_frontage ? `${data.lot_frontage} ft de frente` : undefined,
        },
        {
            icon: Home,
            label: "Sótano",
            value: data.total_bsmt_sf > 0
                ? `${data.total_bsmt_sf} ft²`
                : "Sin sótano",
        },
        {
            icon: Calendar,
            label: "Construida",
            value: data.year_built,
            sub: data.year_remod_add !== data.year_built
                ? `Rem. ${data.year_remod_add}`
                : "Sin remodelaciones",
        },
        {
            icon: Layers,
            label: "Zonificación",
            value: zoningLabel,
            sub: data.ms_zoning,
        },
        {
            icon: Hammer,
            label: "Clase inmueble",
            value: `Clase ${data.ms_sub_class}`,
        },
        {
            icon: Hash,
            label: "Cocinas",
            value: data.kitchen_abv_gr,
        },
    ];

    return (
        <div>
            <SectionTitle>Terreno y construcción</SectionTitle>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {features.map((item) => (
                    <FeatureCard
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                        sub={item.sub}
                    />
                ))}
            </div>
        </div>
    );
}