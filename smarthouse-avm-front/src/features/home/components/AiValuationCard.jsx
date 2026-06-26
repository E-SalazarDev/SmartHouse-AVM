import { useState, useEffect, useMemo, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
    Home,
    Brain,
    Database,
    BadgeCheck,
    MapPin,
    Maximize2,
    BedDouble,
    Bath,
    Compass,
    Warehouse,
    Hammer,
} from "lucide-react";

const ROTATE_EVERY_MS = 9000;

const factors = [
    { key: "calidad", label: "Calidad", icon: Hammer, value: "7 / 10" },
    { key: "vecindario", label: "Vecindario", icon: Compass, value: "CollgCr" },
    { key: "garaje", label: "Garaje", icon: Warehouse, value: "2 autos" },
    { key: "ubicacion", label: "Ubicación", icon: MapPin, value: "Ames" },
    { key: "banos", label: "Baños", icon: Bath, value: "2" },
    { key: "estructura", label: "Estructura", icon: BedDouble, value: "2Story" },
    { key: "area", label: "Área", icon: Maximize2, value: "1710 ft²" },
    { key: "habitaciones", label: "Habitaciones", icon: BedDouble, value: "3" },
];

const tentaclePositions = ["top", "bottom", "left_high", "left_low", "right_high", "right_low"];

const tentacleChipClass = {
    top: "absolute left-1/2 -translate-x-1/2 top-0",
    bottom: "absolute left-1/2 -translate-x-1/2 bottom-0",
};

function pickRandomSplit(all, countInCircle) {
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return { inCircle: shuffled.slice(0, countInCircle), rest: shuffled.slice(countInCircle) };
}


function pickBendVariant() {
    const bends = [-16, -8, 0, 8, 16];
    return bends[Math.floor(Math.random() * bends.length)];
}

function pickPathVariants(positions) {
    const out = {};
    positions.forEach((pos) => {
        out[pos] = pickBendVariant();
    });
    return out;
}

function buildPath(start, end, bend) {
    if (!start || !end) return "";
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const nx = -dy;
    const ny = dx;
    const nlen = Math.sqrt(nx * nx + ny * ny) || 1;
    const ux = (nx / nlen) * bend;
    const uy = (ny / nlen) * bend;
    const c1x = start.x + dx * 0.33 + ux;
    const c1y = start.y + dy * 0.33 + uy;
    const c2x = start.x + dx * 0.66 + ux * 0.5;
    const c2y = start.y + dy * 0.66 + uy * 0.5;
    return `M${start.x.toFixed(1)},${start.y.toFixed(1)} C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${end.x.toFixed(1)},${end.y.toFixed(1)}`;
}

function TentacleChip({ item, position, chipRef }) {
    const Icon = item.icon;
    const reverse = position.startsWith("right");
    const isVertical = position === "top" || position === "bottom";
    const sideClass = position.startsWith("right") ? "ml-auto" : "mr-auto";

    return (
        <motion.div
            ref={chipRef}
            layout
            key={item.key}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(6px)" }}
            transition={{ duration: 0.45, type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ scale: 1.05 }}
            className={`${tentacleChipClass[position] ?? "relative"} ${
                isVertical ? "w-max" : `w-fit ${sideClass}`
            } z-30 flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3 py-2.5 shadow-[0_16px_38px_-24px_rgba(15,23,42,0.55)] backdrop-blur ${
                reverse ? "flex-row-reverse" : ""
            }`}
        >
            <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-[13px] font-semibold text-slate-700 whitespace-nowrap">
                {item.label}
            </span>
        </motion.div>
    );
}

function RestFactorCard({ item }) {
    const Icon = item.icon;
    return (
        <motion.div
            layout="position"
            key={item.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
            className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.4)]"
        >
            <div className="h-9 w-9 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 truncate">{item.value}</p>
            </div>
        </motion.div>
    );
}


function TentacleSvgOverlay({ wrapperRef, coreRef, chipRefs, pathVariants, rotationKey }) {
    const [points, setPoints] = useState(null);
    const [box, setBox] = useState({ w: 0, h: 0 });
    const lastPointsRef = useRef({});

    const measure = useCallback(() => {
        const wrapper = wrapperRef.current;
        const core = coreRef.current;
        if (!wrapper || !core) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        setBox({ w: wrapperRect.width, h: wrapperRect.height });

        const coreRect = core.getBoundingClientRect();
        const center = {
            x: coreRect.left + coreRect.width / 2 - wrapperRect.left,
            y: coreRect.top + coreRect.height / 2 - wrapperRect.top,
        };
        const haloRadius = coreRect.width / 2 + 6;

        const next = { ...lastPointsRef.current };
        tentaclePositions.forEach((pos) => {
            const chipEl = chipRefs.current[pos];
            
            if (!chipEl) return;
            const r = chipEl.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;

            const chipCenter = {
                x: r.left + r.width / 2 - wrapperRect.left,
                y: r.top + r.height / 2 - wrapperRect.top,
            };
            const dx = chipCenter.x - center.x;
            const dy = chipCenter.y - center.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            const start = {
                x: center.x + (dx / dist) * haloRadius,
                y: center.y + (dy / dist) * haloRadius,
            };

            let end;
            if (pos === "top") {
                end = { x: chipCenter.x, y: r.bottom - wrapperRect.top };
            } else if (pos === "bottom") {
                end = { x: chipCenter.x, y: r.top - wrapperRect.top };
            } else if (pos.startsWith("left")) {
                end = { x: r.right - wrapperRect.left, y: chipCenter.y };
            } else {
                end = { x: r.left - wrapperRect.left, y: chipCenter.y };
            }
            next[pos] = { start, end };
        });
        lastPointsRef.current = next;
        setPoints(next);
    }, [wrapperRef, coreRef, chipRefs]);

    useLayoutEffect(() => {
        measure();
       
        const timeouts = [0, 16, 50, 120, 220, 360, 500].map((ms) =>
            setTimeout(measure, ms)
        );
        return () => timeouts.forEach(clearTimeout);
    }, [measure, rotationKey]);

    useEffect(() => {
        const ro = new ResizeObserver(() => measure());
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure, wrapperRef]);

    if (!points || !box.w) return null;

    return (
        <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            width={box.w}
            height={box.h}
            fill="none"
        >
            <defs>
                <linearGradient id="neuralLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                    <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
                </linearGradient>
            </defs>

            <AnimatePresence mode="popLayout">
                {tentaclePositions.map((pos, index) => {
                    const p = points[pos];
                    if (!p) return null;
                    const d = buildPath(p.start, p.end, pathVariants[pos] ?? 0);
                    return (
                        <motion.path
                            key={`${pos}-${rotationKey}`}
                            d={d}
                            stroke="url(#neuralLine)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 + index * 0.12, duration: 1.2, ease: "easeInOut" }}
                        />
                    );
                })}
            </AnimatePresence>

            {tentaclePositions.map((pos, index) => {
                const p = points[pos];
                if (!p) return null;
                const d = buildPath(p.start, p.end, pathVariants[pos] ?? 0);
                return (
                    <motion.circle
                        key={`${pos}-pulse-${rotationKey}`}
                        r="4"
                        fill="#8b5cf6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ delay: 1 + index * 0.3, duration: 1.8, repeat: Infinity, repeatDelay: 2.4 }}
                    >
                        <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
                    </motion.circle>
                );
            })}
        </svg>
    );
}

function AiValuationCard() {
    const [split, setSplit] = useState(() => pickRandomSplit(factors, 6));
    const [pathVariants, setPathVariants] = useState(() => pickPathVariants(tentaclePositions));
    const [rotationKey, setRotationKey] = useState(0);
    const intervalRef = useRef(null);

    const wrapperRef = useRef(null);
    const coreRef = useRef(null);
    const chipRefs = useRef({});

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setSplit(pickRandomSplit(factors, 6));
            setPathVariants(pickPathVariants(tentaclePositions));
            setRotationKey((k) => k + 1);
        }, ROTATE_EVERY_MS);
        return () => clearInterval(intervalRef.current);
    }, []);

    const assigned = useMemo(() => {
        const map = {};
        tentaclePositions.forEach((pos, i) => {
            map[pos] = split.inCircle[i];
        });
        return map;
    }, [split]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] p-6"
        >
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            SmartHouse AI
                        </p>
                        <h3 className="text-lg font-bold text-slate-950">Motor de valuación</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Activo
                    </span>
                </div>

                <LayoutGroup>
                    <div
                        className="hidden min-[640px]:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3"
                        style={{ containerType: "inline-size" }}
                    >
                        <div className="flex flex-col gap-4 items-start">
                            <TentacleChip
                                item={assigned.left_high}
                                position="left_high"
                                chipRef={(el) => (chipRefs.current.left_high = el)}
                            />
                            <TentacleChip
                                item={assigned.left_low}
                                position="left_low"
                                chipRef={(el) => (chipRefs.current.left_low = el)}
                            />
                        </div>

                        <div
                            ref={wrapperRef}
                            className="relative mx-auto"
                            style={{ width: "clamp(150px, 30cqw, 220px)", aspectRatio: "200 / 460" }}
                        >
                            <TentacleSvgOverlay
                                wrapperRef={wrapperRef}
                                coreRef={coreRef}
                                chipRefs={chipRefs}
                                pathVariants={pathVariants}
                                rotationKey={rotationKey}
                            />

                            <div
                                ref={coreRef}
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        background: [
                                            "conic-gradient(from 0deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                            "conic-gradient(from 180deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                            "conic-gradient(from 360deg, rgba(99,102,241,0.7), rgba(168,85,247,0.1), rgba(34,211,238,0.1), rgba(99,102,241,0.7))",
                                        ],
                                    }}
                                    transition={{
                                        rotate: { repeat: Infinity, duration: 5.5, ease: "linear" },
                                        background: { repeat: Infinity, duration: 5.5, ease: "linear" },
                                    }}
                                    className="absolute rounded-full opacity-60 blur-[1px]"
                                    style={{ width: "61cqw", height: "61cqw", maxWidth: 112, maxHeight: 112, minWidth: 66, minHeight: 66 }}
                                />
                                <div
                                    className="absolute rounded-full bg-white"
                                    style={{ width: "44cqw", height: "44cqw", maxWidth: 80, maxHeight: 80, minWidth: 47, minHeight: 47 }}
                                />
                                <motion.div
                                    animate={{ y: [0, -6, 0], rotate: [-1.2, 1.2, -1.2] }}
                                    transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
                                    className="relative z-20 flex items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-500 shadow-[0_24px_50px_-16px_rgba(99,102,241,0.75)]"
                                    style={{ width: "31cqw", height: "31cqw", maxWidth: 56, maxHeight: 56, minWidth: 33, minHeight: 33 }}
                                >
                                    <Home className="w-1/2 h-1/2 text-white" />
                                </motion.div>
                            </div>

                            <AnimatePresence mode="popLayout">
                                <TentacleChip
                                    key={`top-${assigned.top?.key}`}
                                    item={assigned.top}
                                    position="top"
                                    chipRef={(el) => (chipRefs.current.top = el)}
                                />
                                <TentacleChip
                                    key={`bottom-${assigned.bottom?.key}`}
                                    item={assigned.bottom}
                                    position="bottom"
                                    chipRef={(el) => (chipRefs.current.bottom = el)}
                                />
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col gap-4 items-end">
                            <TentacleChip
                                item={assigned.right_high}
                                position="right_high"
                                chipRef={(el) => (chipRefs.current.right_high = el)}
                            />
                            <TentacleChip
                                item={assigned.right_low}
                                position="right_low"
                                chipRef={(el) => (chipRefs.current.right_low = el)}
                            />
                        </div>
                    </div>

                    <div className="grid min-[640px]:hidden grid-cols-2 gap-3">
                        <AnimatePresence mode="popLayout">
                            {tentaclePositions.map((pos) => (
                                <RestFactorCard key={assigned[pos]?.key} item={assigned[pos]} />
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <AnimatePresence mode="popLayout">
                            {split.rest.map((item) => (
                                <RestFactorCard key={item.key} item={item} />
                            ))}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>

                <div className="rounded-3xl border border-slate-200/80 bg-slate-950 text-white p-4 shadow-inner min-h-37">
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-4 h-4 text-indigo-300" />
                        <p className="text-sm font-semibold">Modelo predictivo</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <p className="text-lg font-bold">94.2%</p>
                            <p className="text-[11px] text-slate-400">precisión</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">79</p>
                            <p className="text-[11px] text-slate-400">variables</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">38K</p>
                            <p className="text-[11px] text-slate-400">registros</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-300" />
                            <span className="text-xs text-slate-300">Random Forest Regressor</span>
                        </div>
                        <BadgeCheck className="w-4 h-4 text-emerald-300" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Demo() {
    return (
        <div className="w-full max-w-md mx-auto">
            <AiValuationCard />
        </div>
    );
}