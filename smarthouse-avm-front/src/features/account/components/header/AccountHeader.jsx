export default function AccountHeader() {
    return (
        <div>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-600/70">
                Tu perfil
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-950">
                Mi cuenta
            </h1>
            <p className="mt-2 text-sm text-slate-500">
                Información de tu cuenta en SmartHouse AVM.
            </p>
        </div>
    );
}