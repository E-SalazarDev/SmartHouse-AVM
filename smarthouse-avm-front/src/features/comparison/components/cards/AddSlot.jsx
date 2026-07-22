import { Scale } from "lucide-react";

export default function AddSlot() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 aspect-video sm:aspect-auto sm:h-full min-h-35">
            <Scale size={18} />
            <span className="text-xs font-medium text-center px-4">
                Agrega otra propiedad desde Explorar
            </span>
        </div>
    );
}