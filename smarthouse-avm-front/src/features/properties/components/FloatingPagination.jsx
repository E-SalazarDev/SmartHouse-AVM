import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FloatingPagination() {
    return (
        <div className="pointer-events-none sticky bottom-7 z-40 flex w-full justify-center">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/80 bg-white/75 px-3 py-2 shadow-[0_20px_60px_rgba(15,23,42,0.22)] backdrop-blur-2xl ring-1 ring-slate-200/50">

                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition hover:scale-105 hover:text-violet-600"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex h-11 items-center gap-2 rounded-full bg-slate-100/80 px-5">
                    <button className="h-2.5 w-8 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-500 shadow-[0_0_12px_rgba(124,58,237,0.45)]" />
                    <button className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <button className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <button className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <button className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>

                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.15)] transition hover:scale-105 hover:text-violet-600"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>

            </div>
        </div>
    );
}