import {
    Brain,
    Search,
    Layers3,
    History,
} from "lucide-react";

export const homeActions = [
    {
        title: "Nueva valuación",
        desc: "Calcula el precio estimado de una vivienda.",
        icon: Brain,
        gradient: "from-indigo-500 to-purple-500",
    },
    {
        title: "Explorar propiedades",
        desc: "Revisa inmuebles registrados por el administrador.",
        icon: Search,
        gradient: "from-slate-900 to-slate-700",
    },
    {
        title: "Comparar inmuebles",
        desc: "Analiza precio, área, calidad y ubicación.",
        icon: Layers3,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Historial",
        desc: "Consulta predicciones guardadas.",
        icon: History,
        gradient: "from-violet-500 to-fuchsia-500",
    },
];