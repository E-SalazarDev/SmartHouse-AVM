import clsx from "clsx";

/**
 * Variantes:
 * - "default"  → texto oscuro sobre fondo claro
 * - "gradient" → texto oscuro con acento en gradiente azul→morado
 * - "dark"     → para fondos oscuros 
 */
const variants = {
  default: "text-ink",
  gradient: "text-ink",
  dark: "text-white",
};

const sizes = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

export default function PageTitle({
  title,
  subtitle,
  eyebrow,
  variant = "default",
  size = "md",
  align = "left",
  className,
}) {
  return (
    <div className={clsx("flex flex-col gap-2", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {eyebrow}
        </span>
      )}

      <h1
        className={clsx(
          "font-display font-bold tracking-tight leading-tight",
          sizes[size],
          variants[variant]
        )}
      >
        {variant === "gradient" ? (
          <>
            {title.split(" ").slice(0, -1).join(" ") + " "}
            <span className="bg-linear-to-r from-blue-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {title.split(" ").slice(-1)}
            </span>
          </>
        ) : (
          title
        )}
      </h1>

      {subtitle && (
        <p className={clsx("text-sm md:text-base", variant === "dark" ? "text-white/60" : "text-ink-soft")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}