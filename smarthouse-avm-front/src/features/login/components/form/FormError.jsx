import { AlertCircle } from "lucide-react";

export default function FormError({ message }) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3"
        >
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-xs leading-5 text-red-700">{message}</p>
        </div>
    );
}