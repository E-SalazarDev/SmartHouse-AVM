export default function Grid({ children, className = "" }) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {children}
    </div>
  );
}