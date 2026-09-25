export default function FavoriteSkeleton() {
    return (
        <div className="rounded-3xl border border-slate-100 bg-white overflow-hidden">
            <div className="aspect-4/3 animate-pulse bg-slate-100" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="grid grid-cols-4 gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
                    ))}
                </div>
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
            </div>
        </div>
    );
}