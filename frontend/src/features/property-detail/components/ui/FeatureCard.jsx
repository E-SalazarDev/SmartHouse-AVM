export default function FeatureCard({ icon: Icon, label, value, sub }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
            {Icon && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                    <Icon className="h-4 w-4 text-violet-500" />
                </div>
            )}

            <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                    {value}
                </p>
                <p className="text-[10px] text-slate-400">
                    {label}
                </p>
                {sub && (
                    <p className="mt-0.5 text-[10px] text-slate-400">
                        {sub}
                    </p>
                )}
            </div>
        </div>
    );
}