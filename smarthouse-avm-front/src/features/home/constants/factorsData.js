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


const CENTER = { x: 100, y: 230 };
const HALO_R = 46;


const ENDPOINTS = {
    top: { x: 100, y: 26 },
    bottom: { x: 100, y: 434 },
    left_high: { x: 4, y: 150 },
    left_low: { x: 4, y: 310 },
    right_high: { x: 196, y: 150 },
    right_low: { x: 196, y: 310 },
};

function startPoint(pos) {
    const end = ENDPOINTS[pos];
    const dx = end.x - CENTER.x;
    const dy = end.y - CENTER.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    return {
        x: CENTER.x + (dx / len) * HALO_R,
        y: CENTER.y + (dy / len) * HALO_R,
    };
}

function buildVariants(pos, bend) {
    const s = startPoint(pos);
    const e = ENDPOINTS[pos];
    const midX = (s.x + e.x) / 2;
    const midY = (s.y + e.y) / 2;
    const nx = -(e.y - s.y);
    const ny = e.x - s.x;
    const nlen = Math.sqrt(nx * nx + ny * ny) || 1;
    const ux = nx / nlen;
    const uy = ny / nlen;

    return bend.map((amount) => {
        const c1x = s.x + (e.x - s.x) * 0.33 + ux * amount;
        const c1y = s.y + (e.y - s.y) * 0.33 + uy * amount;
        const c2x = s.x + (e.x - s.x) * 0.66 + ux * amount * 0.4;
        const c2y = s.y + (e.y - s.y) * 0.66 + uy * amount * 0.4;
        return `M${s.x.toFixed(1)},${s.y.toFixed(1)} C${c1x.toFixed(1)},${c1y.toFixed(
            1
        )} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${e.x.toFixed(1)},${e.y.toFixed(1)}`;
    });
}

export const tentaclePaths = {
    top: buildVariants("top", [-14, 14, 0]),
    bottom: buildVariants("bottom", [14, -14, 0]),
    left_high: buildVariants("left_high", [-16, 12, -4]),
    left_low: buildVariants("left_low", [16, -12, 4]),
    right_high: buildVariants("right_high", [16, -12, 4]),
    right_low: buildVariants("right_low", [-16, 12, -4]),
};


export const tentacleChipClass = {
    top: "absolute left-1/2 -translate-x-1/2 top-0",
    bottom: "absolute left-1/2 -translate-x-1/2 bottom-0",
};