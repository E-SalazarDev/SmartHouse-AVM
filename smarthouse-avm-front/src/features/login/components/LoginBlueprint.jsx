import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function LoginBlueprint() {
  return (
    <aside className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:p-12">
      {/* Cuadrícula técnica de fondo */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="blueprint-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#blueprint-grid)"
        />
      </svg>

      {/* Marca */}
      <div className="relative flex items-center gap-2.5 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5">
          <Home
            size={17}
            strokeWidth={1.8}
          />
        </div>

        <span className="text-lg font-semibold tracking-tight">
          SmartHouse AI
        </span>
      </div>

      {/* Información principal */}
      <div className="relative mt-10 max-w-md">
        <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-violet-300/70">
          Automated Valuation Model
        </span>

        <h2 className="font-serif text-3xl font-normal leading-[1.2] text-white">
          Cada propiedad, medida con la precisión
          de un modelo entrenado.
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Inicia sesión para consultar valuaciones,
          comparar propiedades y revisar el
          historial de tus análisis.
        </p>
      </div>

      {/* Plano de la propiedad */}
      <div className="relative flex flex-1 items-center justify-center py-8">
        <motion.svg
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewBox="0 0 440 340"
          className="w-full max-w-md"
        >
          {/* Muros exteriores */}
          <rect
            x="40"
            y="20"
            width="360"
            height="260"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* Muro horizontal */}
          <line
            x1="40"
            y1="150"
            x2="90"
            y2="150"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          <line
            x1="120"
            y1="150"
            x2="230"
            y2="150"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          <line
            x1="260"
            y1="150"
            x2="400"
            y2="150"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* División sala y cocina */}
          <line
            x1="220"
            y1="20"
            x2="220"
            y2="70"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          <line
            x1="220"
            y1="100"
            x2="220"
            y2="150"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* División recámara 1 y baño */}
          <line
            x1="160"
            y1="150"
            x2="160"
            y2="190"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          <line
            x1="160"
            y1="220"
            x2="160"
            y2="280"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* División baño y recámara 2 */}
          <line
            x1="240"
            y1="150"
            x2="240"
            y2="190"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          <line
            x1="240"
            y1="220"
            x2="240"
            y2="280"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />

          {/* Arcos de puertas */}
          <path
            d="M 90 150 A 30 30 0 0 1 120 120"
            fill="none"
            stroke="rgba(167,139,250,0.55)"
            strokeWidth="1"
          />

          <path
            d="M 230 150 A 30 30 0 0 0 200 180"
            fill="none"
            stroke="rgba(167,139,250,0.55)"
            strokeWidth="1"
          />

          <path
            d="M 220 70 A 30 30 0 0 1 250 100"
            fill="none"
            stroke="rgba(167,139,250,0.55)"
            strokeWidth="1"
          />

          <path
            d="M 40 70 A 26 26 0 0 1 66 96"
            fill="none"
            stroke="rgba(167,139,250,0.55)"
            strokeWidth="1"
          />

          {/* Entrada principal */}
          <line
            x1="40"
            y1="70"
            x2="40"
            y2="96"
            stroke="#020617"
            strokeWidth="3"
          />

          {/* Muebles */}
          <g
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
            fill="none"
          >
            <rect
              x="55"
              y="35"
              width="55"
              height="18"
              rx="2"
            />

            <line
              x1="55"
              y1="42"
              x2="110"
              y2="42"
            />

            <rect
              x="65"
              y="65"
              width="24"
              height="16"
              rx="1"
            />

            <path d="M 350 30 L 350 90 L 390 90" />

            <circle
              cx="365"
              cy="50"
              r="6"
            />

            <circle
              cx="365"
              cy="70"
              r="6"
            />

            <rect
              x="50"
              y="200"
              width="55"
              height="70"
              rx="2"
            />

            <line
              x1="50"
              y1="216"
              x2="105"
              y2="216"
            />

            <ellipse
              cx="200"
              cy="260"
              rx="10"
              ry="14"
            />

            <rect
              x="185"
              y="165"
              width="30"
              height="14"
              rx="2"
            />

            <rect
              x="335"
              y="200"
              width="55"
              height="70"
              rx="2"
            />

            <line
              x1="335"
              y1="216"
              x2="390"
              y2="216"
            />
          </g>

          {/* Etiquetas */}
          <g
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="#94a3b8"
            letterSpacing="0.5"
          >
            <text
              x="55"
              y="140"
            >
              SALA
            </text>

            <text
              x="290"
              y="140"
            >
              COCINA
            </text>

            <text
              x="55"
              y="270"
            >
              RECÁMARA 1
            </text>

            <text
              x="172"
              y="270"
            >
              BAÑO
            </text>

            <text
              x="330"
              y="270"
            >
              RECÁMARA 2
            </text>
          </g>

          {/* Medidas generales */}
          <g
            stroke="rgba(167,139,250,0.4)"
            strokeWidth="0.75"
            fill="none"
          >
            <line
              x1="40"
              y1="292"
              x2="400"
              y2="292"
              strokeDasharray="2 3"
            />

            <line
              x1="40"
              y1="286"
              x2="40"
              y2="298"
            />

            <line
              x1="400"
              y1="286"
              x2="400"
              y2="298"
            />

            <line
              x1="412"
              y1="20"
              x2="412"
              y2="280"
              strokeDasharray="2 3"
            />

            <line
              x1="406"
              y1="20"
              x2="418"
              y2="20"
            />

            <line
              x1="406"
              y1="280"
              x2="418"
              y2="280"
            />
          </g>

          <text
            x="220"
            y="308"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="#a78bfa"
          >
            13.80 m
          </text>

          <text
            x="420"
            y="150"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="#a78bfa"
            transform="rotate(90 420 150)"
          >
            10.32 m
          </text>

          {/* Punto animado */}
          <motion.circle
            cx="80"
            cy="60"
            r="4"
            fill="#a78bfa"
            animate={{
              opacity: [1, 0.35, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <line
            x1="80"
            y1="60"
            x2="80"
            y2="20"
            stroke="rgba(167,139,250,0.4)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
        </motion.svg>
      </div>

      {/* Resultado ilustrativo */}
      <div className="relative flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-slate-400">
        <span>
          142.4 m² · valuación estimada
          $3,240,000 MXN
        </span>

        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          94% confianza
        </span>
      </div>
    </aside>
  );
}