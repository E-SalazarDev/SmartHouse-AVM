import { motion } from "framer-motion";
import { useState } from "react";
import {
  Home, Calendar, Image, Settings, MessageCircle, Compass, User
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Inicio" },
  { icon: Calendar, label: "Calendario" },
  { icon: Image, label: "Galería" },
  { icon: Settings, label: "Ajustes" },
  { icon: MessageCircle, label: "Mensajes" },
  { icon: Compass, label: "Explorar" },
];

export default function TopBar() {
  const [active, setActive] = useState(0);

  return (
    
    <div className="w-full h-20 bg-blue-600 flex items-center p-5 rounded-xl relative overflow-hidden"> 
      <nav className="bg-[#111] h-14 flex items-center px-2 gap-0.5 rounded-full w-full">

        {/* Logo */}
        <div className="w-9 h-10 bg-white rounded-full flex items-center justify-center mr-1 shrink-0">
          <span className="text-black text-sm font-bold">✦</span>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1 shrink-0" />

        {/* Nav items */}
        {navItems.map(({ icon: Icon, label }, i) => (
          <div key={i} className="relative group">
            <motion.button
              onClick={() => setActive(i)}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors
                ${active === i ? "bg-white/10" : "hover:bg-white/7"}`}
              whileTap={{ scale: 0.92 }}
            >
              <Icon
                size={19}
                className={`transition-colors ${
                  active === i ? "text-white" : "text-white/40 group-hover:text-white/75"
                }`}
              />

            
              {active === i && (
                <motion.span
                  layoutId="dot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                />
              )}
            </motion.button>

            {/* Tooltip */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 bg-[#222] text-white/80 text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap border border-white/8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {label}
            </span>
          </div>
        ))}

        <div className="w-px h-6 bg-white/10 mx-1 shrink-0" />

        {/* Avatar */}
        <div className="relative group">
          <button className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-white/15 hover:border-white/40 transition-colors flex items-center justify-center ml-1">
            <User size={15} className="text-white/70" />
          </button>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 bg-[#222] text-white/80 text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap border border-white/8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Perfil
          </span>
        </div>

      </nav>
    </div>
  );
}