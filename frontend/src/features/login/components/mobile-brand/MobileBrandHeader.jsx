import { Home } from "lucide-react";

export default function MobileBrandHeader() {
    return (
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950">
                <Home size={17} strokeWidth={1.8} className="text-white" />
            </div>

            <span className="text-lg font-semibold tracking-tight text-slate-900">
                SmartHouse AI
            </span>
        </div>
    );
}