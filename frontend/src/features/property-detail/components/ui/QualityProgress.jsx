export default function QualityProgress({ score, max = 10 }) {
    const pct = Math.round((score / max) * 100);

    const color =
        pct >= 80
            ? "bg-emerald-400"
            : pct >= 50
                ? "bg-indigo-400"
                : "bg-amber-400";

    return (
        <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${pct}%` }}
                />
            </div>

            <span className="text-[11px] font-bold tabular-nums text-slate-400">
                {score}/{max}
            </span>
        </div>
    );
}