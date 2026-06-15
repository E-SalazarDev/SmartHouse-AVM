export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border border-slate-700
        bg-slate-800
        p-5
        text-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}