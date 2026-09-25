import { Mail, User, IdCard, Contact, ShieldCheck } from "lucide-react";
import { getInitials, getFullName } from "../../lib/formatUserData";

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 transition hover:bg-violet-50/40">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 transition group-hover:bg-violet-100">
                <Icon size={15} className="text-violet-600" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="truncate text-sm font-medium text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function AccountInfoCard({ user }) {
    const initials = getInitials(user);
    const fullName = getFullName(user);
    const isAdmin = user?.is_staff || user?.is_superuser;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">

            {/* Header */}
            <div className="relative z-0 overflow-hidden bg-linear-to-br from-[#131129] via-[#0f0e22] to-[#0a0918] px-6 pb-16 pt-8">

                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl" />

                <div className="pointer-events-none absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl" />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

                {isAdmin && (
                    <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-indigo-200 ring-1 ring-white/15 backdrop-blur-md">
                        <ShieldCheck size={12} />
                        Administrador
                    </span>
                )}
            </div>

            {/* Información principal del usuario */}
            <div className="relative z-10 flex items-end gap-4 px-6">

                {/* Avatar */}
                <div className="-mt-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                    <span className="text-xl font-bold text-white">
                        {initials}
                    </span>
                </div>

                {/* Nombre y correo */}
                <div className="min-w-0 pb-1">
                    <p className="truncate text-lg font-bold text-slate-950">
                        {fullName}
                    </p>

                    <p className="truncate text-sm text-slate-500">
                        {user?.email}
                    </p>
                </div>
            </div>

            {/* Datos de la cuenta */}
            <div className="mt-6 grid grid-cols-1 gap-3 bg-slate-50/60 p-4 sm:grid-cols-2">
                <InfoRow
                    icon={IdCard}
                    label="Nombre"
                    value={user?.first_name}
                />

                <InfoRow
                    icon={Contact}
                    label="Apellido"
                    value={user?.last_name}
                />

                <InfoRow
                    icon={User}
                    label="Usuario"
                    value={user?.username}
                />

                <InfoRow
                    icon={Mail}
                    label="Correo electrónico"
                    value={user?.email}
                />
            </div>
        </div>
    );
}