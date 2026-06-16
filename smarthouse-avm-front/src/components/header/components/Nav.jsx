import { Home, Calendar, Image, Settings, MessageCircle, Compass, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav(second) {

    const [active, setActive] = useState(0);
    const navItems = [
        { icon: Home, label: "Inicio", uri: "/home" },
        { icon: Calendar, label: "Calendario", uri:"/dashboard"},
        { icon: Image, label: "Galería", uri:"/dashboard" },
        { icon: Settings, label: "Ajustes", uri:"/dashboard" },
        { icon: MessageCircle, label: "Mensajes", uri:"/dashboard" },
        { icon: Compass, label: "Explorar", uri:"/dashboard" },
    ];


    return (
        <div className="hidden md:flex items-center justify-center gap-2 lg:gap-4 flex-1 px-2">
            {navItems.map(({ icon: Icon, label, uri }, i) => (
                <Link to={uri}>
                 <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`py-2 px-3 lg:px-4 rounded-full font-bold transition-all flex items-center gap-2 ${active === i
                            ? "bg-fuchsia-500 text-white"
                            : "bg-blue-500 hover:bg-fuchsia-500 text-white"
                        }`}
                    title={label}
                >
                    <Icon size={18} />
                    <span className="hidden lg:inline text-sm">{label}</span>
                </button>
                </Link>
            ))}
        </div>
    )
}