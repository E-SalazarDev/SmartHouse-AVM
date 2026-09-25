import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Maximize2,
    BedDouble,
    Warehouse,
    Ruler,
    Calendar,
    ChefHat,
    Sparkles,
    BarChart3,
} from "lucide-react";

const AI_PHRASES = [
    "Analizando más de 79 variables del inmueble",
    "Comparando contra 38,000+ propiedades",
    "Modelo Random Forest v2.3 corriendo en vivo",
];

function useCyclingPhrase(phrases, duration = 3200) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setIndex((p) => (p + 1) % phrases.length), duration);
        return () => clearInterval(id);
    }, [phrases.length, duration]);
    return phrases[index];
}

const RANGE = { min: 172, max: 196, estimate: 184, confidence: 94.2 };


const VIOLET = "#7c5cff";
const INDIGO = "#4f46e5";
const BLUE = "#0ea5e9";
const FUCHSIA = "#c026d3";

const ACCENTS = {
    features: [VIOLET, INDIGO],
    quality: [BLUE, "#38bdf8"],
    land: [FUCHSIA, "#e879f9"],
};


const BG_BASE = { from: "#110e1c", to: "#1d1832" };
const BG_GLOW_1 = VIOLET;
const BG_GLOW_2 = INDIGO;

function useCountUpLocal(target, duration = 1100) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        let start = null;
        let raf;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration]);
    return value;
}


function MeshBlob({ color, top, left, right, bottom, size, opacity = 0.2 }) {
    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                top,
                left,
                right,
                bottom,
                background: `radial-gradient(circle, ${color} 0%, transparent 72%)`,
                filter: "blur(50px)",
                opacity,
            }}
        />
    );
}


function GlassSurface({ className = "", children, style }) {
    return (
        <div
            className={`relative rounded-2xl border border-white/10 bg-white/6 backdrop-blur-xl ${className}`}
            style={{ boxShadow: "0 4px 24px -8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", ...style }}
        >
            {children}
        </div>
    );
}

/* Panel del showcase */
function SlidePanel({ children }) {
    return (
        <div className="relative h-full rounded-3xl overflow-hidden">
            <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${BG_BASE.from}, ${BG_BASE.to})` }} />
            <MeshBlob color={BG_GLOW_1} top="-15%" right="-10%" size={260} opacity={0.35} />
            <MeshBlob color={BG_GLOW_2} bottom="-18%" left="-12%" size={280} opacity={0.3} />

            <div
                className="relative h-full rounded-3xl border border-white/[0.07] p-5 sm:p-6 flex flex-col"
            >
                {children}
            </div>
        </div>
    );
}

function MiniChip({ icon: Icon, label, value, gradient, index = 0 }) {
    return (
        <motion.div
            className="flex items-center gap-3 bg-white/[0.07] backdrop-blur-md rounded-2xl px-3.5 py-2.5 border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + index * 0.1, ease: "easeOut" }}
        >
            <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`, boxShadow: `0 4px 12px -4px ${gradient[0]}88` }}
            >
                <Icon className="w-4 h-4 text-white" strokeWidth={2.25} />
            </div>
            <div className="text-left leading-none">
                <p className="text-[10px] uppercase tracking-wider text-white/55 mb-1 font-medium">{label}</p>
                <p className="font-mono text-[14px] font-semibold text-white">{value}</p>
            </div>
        </motion.div>
    );
}

function RingGauge({ label, value, score, max, gradientId, colors }) {
    const size = 108;
    const stroke = 8;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = score / max;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={colors[0]} />
                            <stop offset="100%" stopColor={colors[1]} />
                        </linearGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} fill="none" />
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={`url(#${gradientId})`}
                        strokeWidth={stroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - circumference * pct }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[20px] font-bold text-white leading-none">
                        {score}
                        <span className="text-[12px] font-semibold text-white/50">/{max}</span>
                    </span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[14px] font-semibold text-white leading-none mb-1.5">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-white/55 leading-none">{label}</p>
            </div>
        </div>
    );
}

function SlideKicker({ label, accent }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
            <p className="text-[12px] font-semibold uppercase tracking-widest text-white/85">
                {label}
            </p>
        </div>
    );
}


function SlideFeatures() {
    const g = ACCENTS.features;
    return (
        <>
            <SlideKicker label="Lo esencial" accent={g[0]} />
            <div className="flex-1 flex items-center justify-center py-2">
                <div className="flex flex-col items-center text-center gap-4 w-full">
                    <motion.div
                        className="p-3.5 rounded-2xl"
                        style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`, boxShadow: `0 8px 24px -8px ${g[0]}66` }}
                        initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                    >
                        <Maximize2 className="w-6 h-6 text-white" strokeWidth={2.25} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                    >
                        <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1.5 font-medium">Área habitable</p>
                        <p className="font-mono text-[38px] sm:text-[42px] font-bold leading-none text-white">
                            1,656<span className="text-[16px] font-semibold text-white/50 ml-1">ft²</span>
                        </p>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-2.5">
                        <MiniChip icon={BedDouble} label="Hab · Baños" value="3 · 2" gradient={g} index={0} />
                        <MiniChip icon={Warehouse} label="Garaje" value="3 autos" gradient={g} index={1} />
                    </div>
                    <p className="text-[12px] text-white/55 max-w-64 leading-relaxed">
                        Comparado contra propiedades similares en Ames, IA.
                    </p>
                </div>
            </div>
        </>
    );
}

function SlideQuality() {
    const g = ACCENTS.quality;
    return (
        <>
            <SlideKicker label="Calidad certificada por IA" accent={g[0]} />
            <div className="flex-1 flex items-center justify-center py-2">
                <div className="flex flex-col items-center gap-5 w-full">
                    <div className="flex items-center gap-8 sm:gap-10">
                        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                            <RingGauge label="Calidad general" value="Muy buena" score={8} max={10} gradientId="ringGeneral" colors={g} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}>
                            <RingGauge label="Condición general" value="Buena" score={5} max={10} gradientId="ringCondicion" colors={g} />
                        </motion.div>
                    </div>
                    <p className="text-[12px] text-white/55 text-center max-w-72 leading-relaxed">
                        Evaluado con base en más de 79 variables del modelo.
                    </p>
                </div>
            </div>
        </>
    );
}

function SlideLand() {
    const g = ACCENTS.land;
    return (
        <>
            <SlideKicker label="Terreno & construcción" accent={g[0]} />
            <div className="flex-1 flex items-center justify-center py-2">
                <div className="flex flex-col items-center text-center gap-4 w-full">
                    <motion.div
                        className="p-3.5 rounded-2xl"
                        style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`, boxShadow: `0 8px 24px -8px ${g[0]}66` }}
                        initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                    >
                        <Ruler className="w-6 h-6 text-white" strokeWidth={2.25} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                    >
                        <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1.5 font-medium">Terreno total</p>
                        <p className="font-mono text-[38px] sm:text-[42px] font-bold leading-none text-white">
                            11,096<span className="text-[16px] font-semibold text-white/50 ml-1">ft²</span>
                        </p>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-2.5">
                        <MiniChip icon={Calendar} label="Construida" value="2006" gradient={g} index={0} />
                        <MiniChip icon={ChefHat} label="Cocinas" value="1" gradient={g} index={1} />
                    </div>
                    <p className="text-[12px] text-white/55 max-w-64 leading-relaxed">
                        + 6 datos más disponibles en la ficha completa.
                    </p>
                </div>
            </div>
        </>
    );
}

const SLIDES = [SlideFeatures, SlideQuality, SlideLand];
const SLIDE_DURATION = 4500;

const CONTENT_TRANSITION = {
    initial: { opacity: 0, y: 14, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -14, filter: "blur(6px)" },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function AiValuationCard() {
    const price = useCountUpLocal(RANGE.estimate, 1100);
    const phrase = useCyclingPhrase(AI_PHRASES);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % SLIDES.length);
        }, SLIDE_DURATION);
        return () => clearInterval(id);
    }, []);

    const ActiveSlide = SLIDES[slideIndex];

    return (
        <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-6 flex flex-col overflow-hidden">

            {/*  HEADER  */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-slate-400 mb-1.5">
                        SmartHouse AI
                    </p>
                    <h3 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">
                        Motor de valuación
                    </h3>
                </div>
                <span className="font-mono text-[11px] text-slate-400 border border-slate-200 rounded-full px-3 py-1.5 tracking-wide shrink-0">
                    RF · v2.3
                </span>
            </div>

            {/*  HERO  */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${BG_BASE.from}, ${BG_BASE.to})` }} />
                <MeshBlob color={BG_GLOW_1} top="-25%" right="-10%" size={320} opacity={0.4} />
                <MeshBlob color={BG_GLOW_2} bottom="-20%" left="-15%" size={280} opacity={0.35} />

                <div className="relative px-6 py-10">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <GlassSurface className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full!">
                            <span className="relative flex h-2 w-2">
                                <motion.span
                                    className="absolute inline-flex h-full w-full rounded-full"
                                    style={{ background: FUCHSIA }}
                                    animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0.15, 0.6] }}
                                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: VIOLET }} />
                            </span>
                            <Sparkles className="w-3 h-3 text-white/70" strokeWidth={2.25} />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/85">
                                Modelo predictivo de IA
                            </span>
                        </GlassSurface>

                        <p className="text-[11px] uppercase tracking-[.14em] text-white/60 mb-2">
                            Estimación de valor
                        </p>
                        <p className="font-mono font-bold leading-none tabular-nums text-white" style={{ fontSize: "52px" }}>
                            ${price}K
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={phrase}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="mt-6"
                            >
                                <GlassSurface className="inline-flex items-center gap-2.5 px-3.5 py-2.5">
                                    <div
                                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: `linear-gradient(135deg, ${VIOLET}, ${FUCHSIA})` }}
                                    >
                                        <BarChart3 className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
                                    </div>
                                    <span className="text-[12.5px] text-white/80 font-medium text-left">
                                        {phrase}
                                    </span>
                                </GlassSurface>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/*  SHOWCASE  */}
            <div className="flex items-center gap-3 mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-slate-400 whitespace-nowrap">
                    Aspectos destacados
                </p>
                <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="flex-1">
                <SlidePanel>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slideIndex}
                            className="relative z-10 flex-1 flex flex-col"
                            initial={CONTENT_TRANSITION.initial}
                            animate={CONTENT_TRANSITION.animate}
                            exit={CONTENT_TRANSITION.exit}
                            transition={CONTENT_TRANSITION.transition}
                        >
                            <ActiveSlide />
                        </motion.div>
                    </AnimatePresence>
                </SlidePanel>
            </div>
        </div>
    );
}