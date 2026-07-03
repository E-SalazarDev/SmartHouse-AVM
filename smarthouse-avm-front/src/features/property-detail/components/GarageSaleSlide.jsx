import {
    Car,
    Warehouse,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import FeatureCard from "./FeatureCard";
import {
    GARAGE_TYPE_LABELS,
    SALE_CONDITION_LABELS,
    translate,
} from "../lib/propertyLabels";

export default function GarageSaleSlide({ data }) {
    const garageLabel = translate(
        GARAGE_TYPE_LABELS,
        data.garage_type,
        data.garage_type
    );

    const saleLabel = translate(
        SALE_CONDITION_LABELS,
        data.sale_condition,
        data.sale_condition
    );

    const features = [
        {
            icon: Car,
            label: "Tipo de garaje",
            value: garageLabel,
        },
        {
            icon: Car,
            label: "Capacidad",
            value: data.garage_cars > 0
                ? `${data.garage_cars} auto${data.garage_cars > 1 ? "s" : ""}`
                : "Sin garaje",
            sub: data.garage_area > 0 ? `${data.garage_area} ft²` : undefined,
        },
        {
            icon: Warehouse,
            label: "Condición de venta",
            value: saleLabel,
        },
    ];

    return (
        <div>
            <SectionTitle>Garaje y condición de venta</SectionTitle>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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