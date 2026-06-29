// src/features/propertyDetail/lib/propertyLabels.js

export const QUALITY_LABELS = {
    Ex: "Excelente",
    Gd: "Buena",
    TA: "Promedio",
    Fa: "Regular",
    Po: "Mala",
};

export const NO_FEATURE_LABELS = {
    bsmt_qual: "Sin sótano",
    garage_type: "Sin garaje",
    fireplace_qu: "Sin chimenea",
};

// Convierte un código de calidad (Ex/Gd/TA/Fa/Po) a { label, score } sobre 5
export function getQualityInfo(code) {
    if (!code || code === "NA") {
        return { label: "No disponible", score: 0 };
    }
    const scoreMap = { Ex: 5, Gd: 4, TA: 3, Fa: 2, Po: 1 };
    return {
        label: QUALITY_LABELS[code] ?? code,
        score: scoreMap[code] ?? 0,
    };
}

export const ZONING_LABELS = {
    RL: "Residencial de baja densidad",
    RM: "Residencial de densidad media",
    RH: "Residencial de alta densidad",
    FV: "Residencial tipo villa flotante",
    "C (all)": "Comercial",
    A: "Agrícola",
    I: "Industrial",
};

export const GARAGE_TYPE_LABELS = {
    Attchd: "Adjunto a la casa",
    Detchd: "Separado",
    BuiltIn: "Integrado a la estructura",
    Basment: "En sótano",
    CarPort: "Cochera abierta",
    "2Types": "Dos tipos de garaje",
    NA: "Sin garaje",
};

export const SALE_CONDITION_LABELS = {
    Normal: "Venta normal",
    Abnorml: "Venta anormal",
    AdjLand: "Venta de terreno adyacente",
    Alloca: "Venta con asignación especial",
    Family: "Venta entre familiares",
    Partial: "Casa nueva, no completada totalmente",
};

export function translate(dictionary, code, fallback = "No disponible") {
    if (!code) return fallback;
    return dictionary[code] ?? code;
}