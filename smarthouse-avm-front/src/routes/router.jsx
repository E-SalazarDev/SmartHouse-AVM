import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/Home";
import DashboardPage from "../pages/Dashboard/Dashboard";
import PropertiesPage from "../pages/Properties/Properties";
import PropertyDetailPage from "../pages/PropertyDetail/PropertyDetail";

const queryClient = new QueryClient();
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <QueryClientProvider client={queryClient}>
                <MainLayout />
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
                path: "explorar",
                children: [
                    {
                        index: true,
                        element: <PropertiesPage />,
                    },
                    {
                        path: ":propertyId",
                        element: <PropertyDetailPage />,
                    },
                ],
            },
        ],
    },
]);