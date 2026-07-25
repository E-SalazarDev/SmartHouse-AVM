import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home";
import DashboardPage from "../pages/Dashboard/Dashboard";
import PropertiesPage from "../pages/Properties/Properties";
import PropertyDetailPage from "../pages/PropertyDetail/PropertyDetail";
import Favorities from "../features/favorites/Favorites";
import LoginPage from "../pages/Login/Login";
import AuthProvider from "../features/auth/context/AuthProvider";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import RegisterPage from "../pages/Register/Register";
import ComparisonPage from "../pages/Comparison/Comparison";

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
                path: "comparador",
                element: <ComparisonPage />,
            },
            {
                path: "favoritos",
                element: (
                    <ProtectedRoute>
                        <Favorities />
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "registro",
                element: <RegisterPage />,
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