import {
    Brain,
    Search,
    Layers3,
    BarChart3,
} from "lucide-react";

export const homeActions = [
    {
        title: "Nueva valuación",
        desc: "Elige una propiedad del catálogo y obtén su valuación con IA.",
        icon: Brain,
        gradient: "from-indigo-500 to-purple-500",
        path: "/como-funciona",
    },
    {
        title: "Explorar propiedades",
        desc: "Revisa inmuebles registrados por el administrador.",
        icon: Search,
        gradient: "from-slate-900 to-slate-700",
        path: "/explorar",
    },
    {
        title: "Comparar inmuebles",
        desc: "Analiza precio, área, calidad y ubicación.",
        icon: Layers3,
        gradient: "from-blue-500 to-cyan-500",
        path: "/comparador",
    },
    {
        title: "Análisis del mercado",
        desc: "Estadísticas y tendencias de todo el catálogo.",
        icon: BarChart3,
        gradient: "from-violet-500 to-fuchsia-500",
        path: "/tendencias",
    },
];