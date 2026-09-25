export default function Card({ children, className = "", padded = true }) {
  return (
    <div
      className={`
        ${padded ? "p-5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}