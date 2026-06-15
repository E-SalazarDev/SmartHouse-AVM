import { motion } from "framer-motion";
import { Home, Calendar, Image, Settings, MessageCircle, Compass, User } from "lucide-react";
import Nav from "./components/Nav";


export default function Header() {
 

  return (
    <>
      {/* BARRA SUPERIOR*/}
      <div className="w-full h-16 md:h-20 bg-black flex items-center justify-between p-4 md:p-5 rounded-xl relative overflow-hidden z-50"> 
        
        {/*LOGO */}
        <div className="flex items-center text-white font-bold text-lg md:text-xl md:w-1/4 min-w-max">
          <span>HousePrediction</span>
        </div>

        {/*BOTONES DE NAVEGACIÓN */}
        <Nav/>

        <div className="flex items-center justify-end md:w-1/4">
          <button className="flex items-center gap-2 bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold p-2 md:py-2 md:px-4 rounded-full transition-all">
            <User size={18} />
            <span className="hidden md:inline text-sm">Iniciar Sesión</span>
          </button>
        </div>
      </div>

    </>
  );
}