import { useId } from "react";

export function BrandMark({ size = 40, decorative = false, className = "" }) {
   
    const gradientId = `brand-gradient-${useId().replace(/:/g, "")}`;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : "SmartHouse AVM"}
            aria-hidden={decorative ? true : undefined}
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    gradientUnits="userSpaceOnUse"
                    x1="4"
                    y1="2"
                    x2="60"
                    y2="62"
                >
                    <stop offset="0" stopColor="#4f46e5" />
                    <stop offset="0.55" stopColor="#7c3aed" />
                    <stop offset="1" stopColor="#d946ef" />
                </linearGradient>
            </defs>

            <rect width="64" height="64" rx="18" fill={`url(#${gradientId})`} />

            <path
                d="M32 12 L52 29 V51 H12 V29 Z"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinejoin="round"
            />

            <rect x="16" y="40" width="8" height="8" rx="2" fill={`url(#${gradientId})`} />
            <rect x="28" y="34" width="8" height="14" rx="2" fill={`url(#${gradientId})`} />
            <rect x="40" y="28" width="8" height="20" rx="2" fill={`url(#${gradientId})`} />

            <path
                d="M51 7 Q51 14 58 14 Q51 14 51 21 Q51 14 44 14 Q51 14 51 7 Z"
                fill="#67e8f9"
                stroke="#67e8f9"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/**
 * Logo completo (isotipo + nombre).
 
 */
export default function BrandLogo({
    size = 40,
    showText = true,
    variant = "onDark",
    className = "",
}) {
    const isOnDark = variant === "onDark";

    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <BrandMark size={size} decorative={showText} />

            {showText && (
                <span className="flex items-baseline gap-2 leading-none">
                    <span
                        className={`text-xl font-semibold tracking-tight ${
                            isOnDark ? "text-white" : "text-slate-950"
                        }`}
                    >
                        SmartHouse
                    </span>
                    <span
                        className={`text-sm font-semibold tracking-[0.18em] ${
                            isOnDark ? "text-violet-400" : "text-violet-600"
                        }`}
                    >
                        AVM
                    </span>
                </span>
            )}
        </span>
    );
}