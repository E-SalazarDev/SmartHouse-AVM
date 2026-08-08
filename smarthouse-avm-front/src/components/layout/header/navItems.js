// import { Compass, History, Home, } from "lucide-react";

// export const navItems = [
//     {
//         icon: Home,
//         label: "Inicio",
//         uri: "/home",
//     },
//     {
//         icon: Compass,
//         label: "Explorar",
//         uri: "/explorar",
//     },
//     {
//         icon: History,
//         label: "Historial",
//         uri: "/historial",
//     },
//     {
//         icon: Compass,
//         label: "Favoritos",
//         uri: "/favoritos",
//     },
//     {
//         icon: Compass,
//         label: "Comparador",
//         uri: "/comparador",
//     },
//     {
//         icon: Compass,
//         label: "Valuaciones",
//         uri: "/valuaciones",
//     },
// ];
import { Home, Compass, Scale, Heart} from "lucide-react";

export const navItems = [
    { uri: "/home", label: "Inicio", icon: Home },
    { uri: "/explorar", label: "Explorar", icon: Compass },
    { uri: "/comparador", label: "Comparar", icon: Scale },
    { uri: "/favoritos", label: "Favoritos", icon: Heart , requiresAuth: true},
    
];