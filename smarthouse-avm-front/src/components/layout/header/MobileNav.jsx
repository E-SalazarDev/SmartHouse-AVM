import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "./navItems";
import HeaderAuthButton from "./HeaderAuthButton";

export default function MobileNav({ headerHeight, onNavigate }) {
    const location = useLocation();

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
                {navItems.map(({ icon: Icon, label, uri }) => {
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
                <HeaderAuthButton />
            </div>
        </motion.div>
    );
}