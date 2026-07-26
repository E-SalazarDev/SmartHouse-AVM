import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Heart, LogOut } from "lucide-react";

export default function UserMenu({ user, onLogout, isLoggingOut }) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);

    function updatePosition() {
        const triggerEl = triggerRef.current;
        if (!triggerEl) return;
        const rect = triggerEl.getBoundingClientRect();
        setMenuPos({
            top: rect.bottom + 8,
            right: window.innerWidth - rect.right,
        });
    }

    function handleToggle() {
        if (!open) updatePosition();
        setOpen((v) => !v);
    }

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event) {
            const clickedTrigger = triggerRef.current?.contains(event.target);
            const clickedDropdown = dropdownRef.current?.contains(event.target);
            if (!clickedTrigger && !clickedDropdown) setOpen(false);
        }

        function handleReposition() {
            updatePosition();
        }

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleReposition);
        window.addEventListener("scroll", handleReposition, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleReposition);
            window.removeEventListener("scroll", handleReposition, true);
        };
    }, [open]);

    const displayName = user?.first_name || user?.username || "Usuario";
    const initials = (
        (user?.first_name?.[0] || user?.username?.[0] || "U") +
        (user?.last_name?.[0] || "")
    ).toUpperCase();

    async function handleLogoutClick() {
        setOpen(false);
        await onLogout();
    }

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={handleToggle}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 pl-1.5 pr-3 py-1.5 hover:bg-white/10 hover:border-white/15 transition-colors"
            >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 ring-2 ring-white/10">
                    <span className="text-xs font-bold text-white">{initials}</span>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0d12]" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-white/90 max-w-25 truncate">
                    {displayName}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                                position: "fixed",
                                top: menuPos.top,
                                right: menuPos.right,
                            }}
                            className="w-64 rounded-2xl border border-white/10 bg-[#0b0d12] p-2 shadow-2xl shadow-black/50 z-100"
                        >
                            <div className="flex items-center gap-3 px-3 py-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">
                                    <span className="text-sm font-bold text-white">{initials}</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {user?.first_name
                                            ? `${user.first_name} ${user.last_name ?? ""}`.trim()
                                            : user?.username}
                                    </p>
                                    <p className="text-xs text-white/50 truncate">{user?.email}</p>
                                </div>
                            </div>

                            <div className="my-1 border-t border-white/10" />

                            <Link
                                to="/mi-cuenta"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <User size={16} strokeWidth={2} />
                                Mi cuenta
                            </Link>

                            <Link
                                to="/favoritos"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                <Heart size={16} strokeWidth={2} />
                                Favoritos
                            </Link>

                            <div className="my-1 border-t border-white/10" />

                            <button
                                type="button"
                                onClick={handleLogoutClick}
                                disabled={isLoggingOut}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                            >
                                <LogOut size={16} strokeWidth={2} />
                                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}