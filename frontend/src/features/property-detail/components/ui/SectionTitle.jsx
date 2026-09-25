export default function SectionTitle({ children }) {
    return (
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500/90 sm:text-sm">
            {children}
        </h3>
    );
}