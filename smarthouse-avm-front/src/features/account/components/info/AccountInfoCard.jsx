import { Mail, User, ShieldCheck } from "lucide-react";
import { getInitials, getFullName } from "../../lib/formatUserData";

function InfoRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                <Icon size={15} className="text-violet-600" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {label}
                </p>
                <p className="text-sm font-medium text-slate-900 truncate">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function AccountInfoCard({ user }) {
    const initials = getInitials(user);
    const fullName = getFullName(user);

    return (
        <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-slate-100">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
                    <span className="text-lg font-bold text-white">{initials}</span>
                </div>
                <div className="min-w-0">
                    <p className="text-lg font-semibold text-slate-900 truncate">
                        {fullName}
                    </p>
                    <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50/60">
                <InfoRow icon={User} label="Usuario" value={user?.username} />
                <InfoRow icon={Mail} label="Correo electrónico" value={user?.email} />
                <InfoRow
                    icon={ShieldCheck}
                    label="Rol"
                    value={user?.role === "user" ? "Usuario" : user?.role}
                />
            </div>
        </div>
    );
}