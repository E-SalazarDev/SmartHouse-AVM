import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import HeaderAuthButton from "./HeaderAuthButton";
import UserMenu from "./UserMenu";
import useAuth from "../../../features/auth/hooks/useAuth";

const OUTER_PAD = 14;
const CURVE_SPAN = 46;
const FLAT_PATH = "M 0,0 L 1,0 L 1,1 L 0,1 Z";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(96);
    const [pathD, setPathD] = useState(
        "M 0,0 L 0,0.72 L 0.27,0.72 C 0.30,0.72 0.31,1 0.35,1 L 0.65,1 C 0.69,1 0.70,0.72 0.73,0.72 L 1,0.72 L 1,0 Z"
    );

    const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

    const headerRef = useRef(null);
    const navPillRef = useRef(null);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 4);
        }
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useLayoutEffect(() => {
        function recalc() {
            const headerEl = headerRef.current;
            const pillEl = navPillRef.current;
            if (!headerEl) return;

            const headerRect = headerEl.getBoundingClientRect();
            setHeaderHeight(headerRect.height);

            const pillVisible = pillEl && pillEl.offsetParent !== null;
            if (!pillVisible) {
                setPathD(FLAT_PATH);
                return;
            }

            const pillRect = pillEl.getBoundingClientRect();
            const W = headerRect.width;
            const topY = 0.72;

            const outerLeftX = pillRect.left - headerRect.left - OUTER_PAD - CURVE_SPAN;
            const innerLeftX = pillRect.left - headerRect.left - OUTER_PAD;
            const innerRightX = pillRect.right - headerRect.left + OUTER_PAD;
            const outerRightX = pillRect.right - headerRect.left + OUTER_PAD + CURVE_SPAN;

            if (outerLeftX < 0 || outerRightX > W) return;

            const oL = outerLeftX / W;
            const iL = innerLeftX / W;
            const iR = innerRightX / W;
            const oR = outerRightX / W;
            const spanL = iL - oL;
            const spanR = oR - iR;

            const d = `
                M 0,0 L 0,${topY}
                L ${oL},${topY}
                C ${oL + spanL * 0.375},${topY} ${oL + spanL * 0.5},1 ${iL},1
                L ${iR},1
                C ${iR + spanR * 0.5},1 ${iR + spanR * 0.625},${topY} ${oR},${topY}
                L 1,${topY} L 1,0 Z
            `.replace(/\s+/g, " ").trim();

            setPathD(d);
        }

        recalc();

        const ro = new ResizeObserver(recalc);
        if (headerRef.current) ro.observe(headerRef.current);
        if (navPillRef.current) ro.observe(navPillRef.current);
        window.addEventListener("resize", recalc);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", recalc);
        };
    }, []);

    return (
        <>
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <clipPath id="continuous-trapezoid" clipPathUnits="objectBoundingBox">
                        <path d={pathD} />
                    </clipPath>
                </defs>
            </svg>

            <div
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    filter: scrolled
                        ? "drop-shadow(0 14px 28px rgba(0,0,0,0.6))"
                        : "drop-shadow(0 0px 0px rgba(0,0,0,0))",
                }}
            >
                <motion.header
                    initial={false}
                    animate={{
                        backgroundColor: scrolled
                            ? "rgba(11,13,18,0.85)"
                            : "rgba(11,13,18,1)",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ clipPath: "url(#continuous-trapezoid)" }}
                    className="flex h-24 w-full items-start justify-between gap-4 border-b border-white/5 backdrop-blur-xl px-5 md:px-14 pt-1"
                >
                    <div className="flex h-14 mt-1.5 items-center min-w-max">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-indigo-500/20 transform group-hover:scale-105 transition-transform duration-200">
                                <span className="text-base font-black text-white tracking-wider">S</span>
                            </div>
                            <span className="text-lg md:text-xl font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                SmartHouse
                                <span className="ml-1 text-sm md:text-base font-extrabold tracking-widest bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {" "}AVM
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:flex h-20 items-center justify-center scale-105 md:scale-110 transform origin-top transition-transform">
                        <Nav ref={navPillRef} />
                    </div>

                    <div className="flex h-12 mt-2 items-center gap-2 min-w-max scale-105 transform origin-right">
                        <div className="hidden md:block">
                            {isAuthenticated ? (
                                <UserMenu
                                    user={user}
                                    onLogout={logout}
                                    isLoggingOut={isLoggingOut}
                                />
                            ) : (
                                <HeaderAuthButton />
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white active:scale-95 transition-transform"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </motion.header>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <MobileNav
                        headerHeight={headerHeight}
                        onNavigate={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div className="h-24" aria-hidden="true" />
        </>
    );
}