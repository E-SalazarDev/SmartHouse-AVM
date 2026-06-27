import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { navItems } from "./navItems";

export default function Nav() {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);

    return (
        <nav className="hidden md:flex flex-1 items-center justify-center px-2">
            <div className="flex items-center gap-0.5 rounded-full border border-white/8 bg-white/4 p-1.5">
                {navItems.map(({ icon: Icon, label, uri }, index) => {
                    const isActive = location.pathname === uri;
                    const isHovered = hovered === index;

                    return (
                        <Link key={uri} to={uri}>
                            <button
                                type="button"
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                title={label}
                                className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors lg:px-4"
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                {isHovered && !isActive && (
                                    <motion.span
                                        layoutId="nav-hover-pill"
                                        className="absolute inset-0 rounded-full bg-white/6"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                <motion.span
                                    className={`relative z-10 flex items-center gap-2 ${
                                        isActive
                                            ? "text-white"
                                            : "text-white/55 hover:text-white/90"
                                    }`}
                                    animate={{ scale: isActive ? 1.02 : 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    <Icon size={16} strokeWidth={2} />
                                    <span className="hidden lg:inline">
                                        {label}
                                    </span>
                                </motion.span>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}