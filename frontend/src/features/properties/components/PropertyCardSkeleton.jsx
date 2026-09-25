export default function PropertyCardSkeleton({ }) {

    return (
        <div className="flex flex-col rounded-3xl bg-white border border-slate-200/80 overflow-hidden">
            <div className="h-48 w-full animate-pulse bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
            <div className="flex flex-col gap-3 p-4">
                <div className="h-4 w-3/4 rounded-full bg-slate-100 animate-pulse" />
                <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1 py-1">
                            <div className="h-3 w-8 rounded-full bg-slate-100 animate-pulse" />
                            <div className="h-2.5 w-10 rounded-full bg-slate-100 animate-pulse" />
                        </div>
                    ))}
                </div>
                <div className="h-4 w-20 rounded-full bg-slate-100 animate-pulse" />
            </div>
        </div>
    );
}