export default function RememberMeCheckbox({ disabled }) {
    return (
        <label className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <input
                type="checkbox"
                name="remember"
                disabled={disabled}
                className="h-3.5 w-3.5 rounded border-slate-300 text-violet-600 focus:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            />
            Mantener sesión iniciada
        </label>
    );
}