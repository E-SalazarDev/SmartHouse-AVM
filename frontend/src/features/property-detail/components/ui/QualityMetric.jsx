import QualityProgress from "./QualityProgress";

export default function QualityMetric({ icon: Icon, label, value, score, max = 10 }) {
    return (
        <div className="flex flex-col rounded-2xl bg-slate-50 px-4 py-3.5">
            <div className="mb-1 flex items-center gap-1.5">
                {Icon && <Icon className="h-3.5 w-3.5 text-violet-500" />}

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                </span>
            </div>

            <p className="text-sm font-bold text-slate-900">
                {value}
            </p>

            <QualityProgress score={score} max={max} />
        </div>
    );
}