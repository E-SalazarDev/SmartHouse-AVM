import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home";
import DashboardPage from "../pages/Dashboard/Dashboard";
import PropertiesPage from "../pages/Properties/Properties";
import PropertyDetailPage from "../pages/PropertyDetail/PropertyDetail";
import Favorities from "../features/favorites/favorites";
import Login from "../features/login/login";
import AuthProvider from "../features/auth/context/AuthProvider";


const queryClient = new QueryClient();


export const router = createBrowserRouter([
    {
        path: "/",

        element: (
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <MainLayout />
                </AuthProvider>
            </QueryClientProvider>
        ),

        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "historial",
                element: <DashboardPage />,
            },
            {
                path: "favoritos",
                element: <Favorities />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "explorar",
                children: [
                    {
                        index: true,
                        element: <PropertiesPage />,
                    },
                    {
                        path: ":propertyId",
                        element: (
                            <PropertyDetailPage />
                        ),
                    },
                ],
            },
        ],
    },
]);