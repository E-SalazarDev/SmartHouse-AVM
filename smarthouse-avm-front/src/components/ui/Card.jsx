export default function Card({ children, className = "", padded = true }) {
  return (
    <div
      className={`
        rounded-2xl
        border border-slate-700
        bg-slate-800
        text-white
        shadow-sm
        ${padded ? "p-5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}