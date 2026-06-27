import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Nav from "./Nav";
import HeaderAuthButton from "./HeaderAuthButton";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 4);
        }
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
          
            <motion.header
                initial={false}
                animate={{
                    backgroundColor: scrolled
                        ? "rgba(11,13,18,0.72)"
                        : "rgba(11,13,18,1)",
                    boxShadow: scrolled
                        ? "0 12px 28px -12px rgba(15,23,42,0.4)"
                        : "0 0px 0px rgba(15,23,42,0)",
                    borderBottomColor: scrolled
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0)",
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex h-16 md:h-20 w-full items-center justify-between gap-4 border-b backdrop-blur-xl px-4 md:px-6"
            >
                {/* Logo */}
                <div className="flex min-w-max items-center gap-2 md:w-1/4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
                        <span className="text-sm font-bold text-white">S</span>
                    </div>
                    <span className="text-[15px] md:text-base font-semibold text-white tracking-tight">
                        SmartHouse
                        <span className="text-white/40 font-medium"> AVM</span>
                    </span>
                </div>

                <Nav />

                <HeaderAuthButton />
            </motion.header>


            <div className="h-16 md:h-20" aria-hidden="true" />
        </>
    );
}