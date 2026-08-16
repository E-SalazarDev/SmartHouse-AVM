export default function ComparisonCardSkeleton() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
            <div className="aspect-video w-full animate-pulse bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
            <div className="p-3.5 flex flex-col gap-2">
                <div className="h-4 w-3/4 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-3 w-1/2 rounded-full bg-slate-100 animate-pulse" />
                <div className="h-5 w-1/3 rounded-full bg-slate-100 animate-pulse mt-1" />
            </div>
        </div>
    );
}