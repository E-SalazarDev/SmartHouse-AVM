import { Outlet } from "react-router-dom";
import Header from "../components/layout/header/Header";
import ComparisonFloatingBar from "../features/comparison/components/floating-bar/ComparisonFloatingBar";

export default function MainLayout() {
    return (
        <main className="min-h-screen px-4 pb-4 md:px-5 md:pb-5 bg-[#E6EEFA]">
            <div className="flex min-h-[calc(100vh-40px)] w-full flex-col gap-6">
                <Header />

                <div className="w-full flex-1">
                    <Outlet />
                </div>
            </div>

            <ComparisonFloatingBar />
        </main>
    );
}