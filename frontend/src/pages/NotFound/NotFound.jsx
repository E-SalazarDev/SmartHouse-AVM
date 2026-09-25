import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

function HouseIllustration() {
    return (
        <svg viewBox="0 0 240 200" className="h-44 w-auto sm:h-52">
            <defs>
                <filter id="houseGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Suelo */}
            <ellipse cx="120" cy="178" rx="86" ry="8" fill="rgba(99,102,241,0.08)" />

            <motion.g
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Techo */}
                <motion.path
                    d="M40,90 L120,30 L200,90"
                    stroke="rgba(165,180,252,0.9)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Cuerpo de la casa */}
                <rect
                    x="55"
                    y="90"
                    width="130"
                    height="80"
                    rx="6"
                    fill="#181433"
                    stroke="rgba(99,102,241,0.35)"
                    strokeWidth="2.5"
                />

                {/* Ventana izquierda */}
                <rect
                    x="72"
                    y="108"
                    width="26"
                    height="26"
                    rx="4"
                    fill="rgba(99,102,241,0.12)"
                    stroke="rgba(165,180,252,0.5)"
                    strokeWidth="1.5"
                />
                <line x1="85" y1="108" x2="85" y2="134" stroke="rgba(165,180,252,0.4)" strokeWidth="1.2" />
                <line x1="72" y1="121" x2="98" y2="121" stroke="rgba(165,180,252,0.4)" strokeWidth="1.2" />

                {/* Ventana derecha */}
                <rect
                    x="142"
                    y="108"
                    width="26"
                    height="26"
                    rx="4"
                    fill="rgba(99,102,241,0.12)"
                    stroke="rgba(165,180,252,0.5)"
                    strokeWidth="1.5"
                />
                <line x1="155" y1="108" x2="155" y2="134" stroke="rgba(165,180,252,0.4)" strokeWidth="1.2" />
                <line x1="142" y1="121" x2="168" y2="121" stroke="rgba(165,180,252,0.4)" strokeWidth="1.2" />

                {/* Puerta */}
                <rect
                    x="106"
                    y="132"
                    width="28"
                    height="38"
                    rx="3"
                    fill="rgba(99,102,241,0.18)"
                    stroke="rgba(165,180,252,0.55)"
                    strokeWidth="1.5"
                />
                <circle cx="128" cy="151" r="1.6" fill="rgba(199,210,254,0.9)" />
            </motion.g>

            {/* Lupa buscando la dirección — orbita alrededor de la casa */}
            <motion.g
                animate={{
                    x: [0, 14, 0, -14, 0],
                    y: [0, -10, 0, -10, 0],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "url(#houseGlow)" }}
            >
                <circle
                    cx="176"
                    cy="60"
                    r="14"
                    fill="#181433"
                    stroke="#a5b4fc"
                    strokeWidth="2.5"
                />
                <line
                    x1="186"
                    y1="70"
                    x2="196"
                    y2="80"
                    stroke="#a5b4fc"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <text
                    x="176"
                    y="65"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#c7d2fe"
                >
                    ?
                </text>
            </motion.g>
        </svg>
    );
}

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-[70vh] w-full items-center justify-center rounded-2xl border border-slate-200 bg-[#f6f7fb] p-4 shadow-xl md:p-6">
            <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                className="relative flex max-w-lg flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] px-6 py-10 text-center shadow-[0_32px_64px_-24px_rgba(15,23,42,0.5)] sm:px-12 sm:py-12"
            >
                <div className="pointer-events-none absolute -left-16 top-1/2 h-44 w-60 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-8 top-0 h-28 w-44 rounded-full bg-violet-500/10 blur-2xl" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

                <motion.div variants={fadeUp} className="relative">
                    <HouseIllustration />
                </motion.div>

                <motion.span
                    variants={fadeUp}
                    className="relative mt-4 text-xs font-bold tracking-[0.2em] uppercase text-indigo-300/75"
                >
                    Error 404
                </motion.span>

                <motion.h1
                    variants={fadeUp}
                    className="relative mt-2 text-3xl font-bold text-white sm:text-4xl"
                >
                    Esta dirección no existe
                </motion.h1>

                <motion.p variants={fadeUp} className="relative mt-3 max-w-sm text-sm text-white/50">
                    Buscamos por todas partes, pero no encontramos ninguna propiedad
                    en esta URL. Puede que se haya movido o que nunca haya existido.
                </motion.p>

                <motion.div
                    variants={fadeUp}
                    className="relative mt-8 flex flex-col gap-3 sm:flex-row"
                >
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Volver atrás
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/home")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-slate-100"
                    >
                        <Home className="h-3.5 w-3.5" />
                        Ir al inicio
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/explorar")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:shadow-xl"
                    >
                        <Search className="h-3.5 w-3.5" />
                        Explorar propiedades
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}