import { useEffect, useRef } from "react";

const CODE_LENGTH = 6;

export default function OtpInput({
    value,
    onChange,
    disabled = false,
    hasError = false,
}) {
    const inputsRef = useRef([]);

    // Al quedar vacío (inicio o tras un error) el foco vuelve al primer dígito.
    useEffect(() => {
        if (!disabled && value === "") {
            inputsRef.current[0]?.focus();
        }
    }, [disabled, value]);

    function focusAt(index) {
        const safeIndex = Math.min(Math.max(index, 0), CODE_LENGTH - 1);
        inputsRef.current[safeIndex]?.focus();
    }

    function handleChange(index, event) {
        const typed = event.target.value.replace(/\D/g, "");

        if (!typed) {
            return;
        }

        const nextValue = (value.slice(0, index) + typed).slice(0, CODE_LENGTH);

        onChange(nextValue);
        focusAt(nextValue.length);
    }

    function handleKeyDown(index, event) {
        if (event.key === "Backspace") {
            event.preventDefault();

            if (value[index]) {
                onChange(value.slice(0, index));
                focusAt(index);
            } else {
                onChange(value.slice(0, Math.max(index - 1, 0)));
                focusAt(index - 1);
            }

            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            focusAt(index - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            focusAt(index + 1);
        }
    }

    function handlePaste(event) {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, CODE_LENGTH);

        if (!pasted) {
            return;
        }

        onChange(pasted);
        focusAt(pasted.length);
    }

    return (
        <div
            className="flex gap-2 sm:gap-2.5"
            role="group"
            aria-label="Código de verificación de 6 dígitos"
        >
            {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputsRef.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    value={value[index] ?? ""}
                    disabled={disabled}
                    aria-label={`Dígito ${index + 1}`}
                    onChange={(event) => handleChange(index, event)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    onFocus={(event) => event.target.select()}
                    className={`h-12 min-w-0 flex-1 rounded-xl border bg-slate-50 text-center text-lg font-semibold text-slate-900 outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 ${
                        hasError
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"
                    }`}
                />
            ))}
        </div>
    );
}