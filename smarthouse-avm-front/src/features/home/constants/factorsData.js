import {
    MapPin,
    Maximize2,
    BedDouble,
    Bath,
    Compass,
    Warehouse,
    BrickWall,
    Hammer,
} from "lucide-react";


export const factors = [
    { key: "calidad", label: "Calidad", icon: Hammer, value: "7 / 10" },
    { key: "vecindario", label: "Vecindario", icon: Compass, value: "CollgCr" },
    { key: "garaje", label: "Garaje", icon: Warehouse, value: "2 autos" },
    { key: "ubicacion", label: "Ubicación", icon: MapPin, value: "Ames" },
    { key: "banos", label: "Baños", icon: Bath, value: "2" },
    { key: "estructura", label: "Estructura", icon: BrickWall, value: "2Story" },
    { key: "area", label: "Área", icon: Maximize2, value: "1710 ft²" },
    { key: "habitaciones", label: "Habitaciones", icon: BedDouble, value: "3" },
];


export const tentaclePositions = [
    "top",
    "bottom",
    "left_high",
    "left_low",
    "right_high",
    "right_low",
];

export const tentaclePaths = {
    top: [
        "M82,182 C98,131 70,79 82,26",
        "M82,182 C68,131 98,79 82,26",
        "M82,182 C90,131 90,79 82,26",
    ],
    bottom: [
        "M82,278 C66,329 94,381 82,434",
        "M82,278 C96,329 66,381 82,434",
        "M82,278 C74,329 74,381 82,434",
    ],
    left_high: [
        "M48,196 C46,160 6,145 0,110",
        "M48,196 C20,174 30,131 0,110",
        "M48,196 C39,164 23,135 0,110",
    ],
    left_low: [
        "M48,264 C18,285 27,327 0,350",
        "M48,264 C44,299 2,313 0,350",
        "M48,264 C25,288 9,317 0,350",
    ],
    right_high: [
        "M116,196 C146,175 137,133 164,110",
        "M116,196 C120,161 162,147 164,110",
        "M116,196 C139,172 155,143 164,110",
    ],
    right_low: [
        "M116,264 C118,300 158,315 164,350",
        "M116,264 C144,286 134,329 164,350",
        "M116,264 C125,296 141,325 164,350",
    ],
};


export const tentacleChipClass = {
    top: "absolute left-1/2 -translate-x-1/2 top-0",
    bottom: "absolute left-1/2 -translate-x-1/2 bottom-0",
};