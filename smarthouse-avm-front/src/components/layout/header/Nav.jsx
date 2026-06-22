import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { navItems } from "./navItems";

export default function Nav() {
    const location = useLocation();
    const [hovered, setHovered] = useState(null);

    return (
        <nav className="hidden md:flex items-center justify-center flex-1 px-2">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
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
                                className="relative py-2 px-3 lg:px-4 rounded-full font-semibold flex items-center gap-2 text-sm transition-colors"
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
                                        className="absolute inset-0 rounded-full bg-white/10"
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
                                            : "text-white/65 hover:text-white"
                                    }`}
                                    animate={{ scale: isActive ? 1.02 : 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    <Icon size={16} />
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