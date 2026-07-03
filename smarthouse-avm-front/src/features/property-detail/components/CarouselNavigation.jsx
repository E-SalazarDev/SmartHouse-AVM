import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselNavigation({
    total,
    currentIndex,
    onChange,
    onPrev,
    onNext,
}) {
    return (
        <div className="flex h-10 items-center justify-center gap-4">
            <button
                type="button"
                onClick={onPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                aria-label="Anterior"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2">
                {Array.from({ length: total }).map((_, index) => {
                    const active = index === currentIndex;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onChange(index)}
                            className={
                                active
                                    ? "h-2.5 w-6 rounded-full bg-violet-600 transition-all"
                                    : "h-2.5 w-2.5 rounded-full bg-slate-300 transition-all hover:bg-slate-400"
                            }
                            aria-label={`Ir a sección ${index + 1}`}
                        />
                    );
                })}
            </div>

            <button
                type="button"
                onClick={onNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                aria-label="Siguiente"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}