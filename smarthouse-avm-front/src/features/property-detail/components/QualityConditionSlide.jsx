import {
    Star,
    Hammer,
    ChefHat,
    Layers,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import QualityMetric from "./QualityMetric";
import { getQualityInfo } from "../lib/propertyLabels";

function qualityLabel(score) {
    if (score >= 9) return "Premium";
    if (score >= 7) return "Muy buena";
    if (score >= 5) return "Buena";
    if (score >= 3) return "Regular";
    return "Básica";
}

export default function QualityConditionSlide({ data }) {
    const kitchen = getQualityInfo(data.kitchen_qual);
    const basement = getQualityInfo(data.bsmt_qual);

    return (
        <div>
            <SectionTitle>Calidad y condición</SectionTitle>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <QualityMetric
                    icon={Star}
                    label="Calidad general"
                    value={qualityLabel(data.overall_qual)}
                    score={data.overall_qual}
                    max={10}
                />

                <QualityMetric
                    icon={Hammer}
                    label="Condición general"
                    value={qualityLabel(data.overall_cond)}
                    score={data.overall_cond}
                    max={10}
                />

                <QualityMetric
                    icon={ChefHat}
                    label="Calidad de cocina"
                    value={kitchen.label}
                    score={kitchen.score}
                    max={5}
                />

                <QualityMetric
                    icon={Layers}
                    label="Calidad de sótano"
                    value={basement.label}
                    score={basement.score}
                    max={5}
                />
            </div>
        </div>
    );
}