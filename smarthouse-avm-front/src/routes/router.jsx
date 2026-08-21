import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home";
import DashboardPage from "../pages/Dashboard/Dashboard";
import PropertiesPage from "../pages/Properties/Properties";
import PropertyDetailPage from "../pages/PropertyDetail/PropertyDetail";
import FavoritesPage from "../pages/Favorites/Favorites";
import LoginPage from "../pages/Login/Login";
import AuthProvider from "../features/auth/context/AuthProvider";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import RegisterPage from "../pages/Register/Register";
import ComparisonPage from "../pages/Comparison/Comparison";
import AccountPage from "../pages/Account/Account";
import TrendsPage from "../pages/Trends/Trends";
import HowItWorksPage from "../pages/HowItWorks/HowItWorks";
import { ComparisonProvider } from "../features/comparison/context/ComparisonProvider";

const queryClient = new QueryClient();


export const router = createBrowserRouter([
    {
        path: "/",

        element: (
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ComparisonProvider>
                        <MainLayout />
                    </ComparisonProvider>
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
                path: "tendencias",
                element: <TrendsPage />,
            },
            {
                path: "como-funciona",
                element: <HowItWorksPage />,
            },
            {
                path: "comparador",
                element: <ComparisonPage />,
            },
            {
                path: "favoritos",
                element: (
                    <ProtectedRoute>
                        <FavoritesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "mi-cuenta",
                element: (
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                ),
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