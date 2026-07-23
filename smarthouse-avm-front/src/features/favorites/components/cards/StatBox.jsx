export default function StatBox({ icon: Icon, value, label }) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white py-2.5">
            <Icon size={14} strokeWidth={2} className="text-violet-500" />
            <span className="text-sm font-semibold text-slate-900">{value}</span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {label}
            </span>
        </div>
    );
}