import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { navItems } from "./navItems";
import HeaderAuthButton from "./HeaderAuthButton";
import useAuth from "../../../features/auth/hooks/useAuth";

export default function MobileNav({ headerHeight, onNavigate }) {
    const location = useLocation();
    const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

    const visibleItems = navItems.filter(
        (item) => !item.requiresAuth || isAuthenticated
    );

    async function handleLogoutClick() {
        onNavigate();
        await logout();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ top: headerHeight + 8 }}
            className="fixed left-4 right-4 z-40 md:hidden rounded-2xl border border-white/10 bg-[#0b0d12] p-3 shadow-2xl shadow-black/50"
        >
            <div className="flex flex-col gap-1">
                {visibleItems.map(({ icon: Icon, label, uri }) => {
                    const isActive = location.pathname === uri;
                    return (
                        <Link key={uri} to={uri} onClick={onNavigate}>
                            <div
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white/90"
                                }`}
                            >
                                <Icon size={16} strokeWidth={2} />
                                {label}
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-2 border-t border-white/10 pt-3">
                {isAuthenticated ? (
                    <div className="px-1">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
                                <span className="text-xs font-bold text-white">
                                    {(user?.first_name?.[0] || user?.username?.[0] || "U").toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.first_name || user?.username}
                                </p>
                                <p className="text-xs text-white/50 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogoutClick}
                            disabled={isLoggingOut}
                            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        >
                            <LogOut size={16} strokeWidth={2} />
                            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                        </button>
                    </div>
                ) : (
                    <HeaderAuthButton />
                )}
            </div>
        </motion.div>
    );
}