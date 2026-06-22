import { User } from "lucide-react";

export default function HeaderAuthButton() {
    return (
        <div className="flex items-center justify-end md:w-1/4">
            <button className="flex items-center gap-2 bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold p-2 md:py-2 md:px-4 rounded-full transition-all">
                <User size={18} />
                <span className="hidden md:inline text-sm">
                    Iniciar Sesión
                </span>
            </button>
        </div>
    );
}