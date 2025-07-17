import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-neutral-800 text-white">
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}