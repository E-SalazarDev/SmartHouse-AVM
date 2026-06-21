import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function MainLayout() {
  return (
    <main className="min-h-screen p-4 md:p-5 bg-[#E6EEFA]">
      <div className="flex min-h-[calc(100vh-40px)] w-full flex-col gap-6">
        <Header />

        <div className="w-full flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
}