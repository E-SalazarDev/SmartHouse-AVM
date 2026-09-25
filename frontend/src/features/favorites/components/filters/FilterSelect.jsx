import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterSelect({ label, options }) {
    const [value, setValue] = useState(options[0]);
    const active = value !== options[0];

    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`appearance-none rounded-full border px-4 py-2 pr-9 text-sm font-medium outline-none transition-colors cursor-pointer ${
                    active
                        ? "border-violet-300 bg-violet-50 text-violet-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt === options[0] ? label : opt}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
        </div>
    );
}