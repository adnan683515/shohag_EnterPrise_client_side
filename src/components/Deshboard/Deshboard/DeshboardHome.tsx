import React, { useState } from "react";
import { Outlet } from "react-router";
import {
    Home,
    User,
    BarChart2,
    Settings,
    Menu,
    X,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

const DeshboardHome = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen">
            {/* ============ MOBILE NAVBAR ============ */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#025964] to-[#013a3f] text-white">
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-bold">Shoha</h1>
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {open && (
                    <nav className="bg-[#013a3f] border-t border-white/20">
                        {menuItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </nav>
                )}
            </header>

            {/* ============ DESKTOP SIDEBAR ============ */}
            <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#025964] to-[#013a3f] text-white">
                <div className="w-full">
                    <div className="px-6 py-6 text-2xl font-bold border-b border-white/20">
                        Shohag Enterprise
                    </div>

                    <nav className="mt-6 space-y-1 px-4">
                        {menuItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* ============ MAIN CONTENT ============ */}
            <main className="pt-16 lg:pt-0 lg:pl-64 px-4">
                <Outlet />
            </main>
        </div>
    );
};

export default DeshboardHome;
