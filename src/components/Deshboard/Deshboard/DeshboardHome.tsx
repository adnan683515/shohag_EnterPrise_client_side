import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
    Home,
    User,
    BarChart2,
    Settings,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import ToastError from "../../Loader/ToastError";

const menuItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Transection", path: "/deshboard/Transection", icon: <Home size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart2 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Add Transection", path: "/deshboard/AddTransection", icon: <Settings size={20} /> }
];

const DeshboardHome = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const disptach = useDispatch()

    const handleLogout = () => {
        disptach(logout())
        navigate("/");
        ToastError({ title: 'Logout successfully!' })
    };

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
                    <nav className="bg-[#013a3f] border-t border-white/20 flex flex-col">
                        {/* Menu */}
                        {menuItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 cursor-pointer"
                                onClick={() => {
                                    navigate(item.path);
                                    setOpen(false);
                                }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}

                        {/* Mobile Bottom */}
                        <div className="mt-auto border-t border-white/20">
                            <div
                                className="px-6 py-4 text-sm text-white/80 cursor-pointer hover:bg-white/10"
                                onClick={() => {
                                    navigate("/account");
                                    setOpen(false);
                                }}
                            >
                                Account
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex  items-center gap-2 px-6 py-4 text-red-300 hover:bg-red-500/10"
                            >
                                <LogOut className="cursor-pointer" size={18} />
                                Logout
                            </button>
                        </div>
                    </nav>
                )}
            </header>

            {/* ============ DESKTOP SIDEBAR ============ */}
            <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#025964] to-[#013a3f] text-white">
                <div className="w-full flex flex-col">
                    <div className="px-6 py-6 text-2xl font-bold border-b border-white/20">
                        Shohag Enterprise
                    </div>

                    {/* Menu */}
                    <nav className="mt-6 space-y-1 px-4 flex-1">
                        {menuItems.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => navigate(item.path)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </nav>

                    {/* Desktop Bottom */}
                    <div className="border-t border-white/20 px-4 py-4">
                        <div
                            className="text-sm text-white/80 mb-3 cursor-pointer hover:text-white"
                            onClick={() => navigate("/account")}
                        >
                            Account
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-300 hover:bg-red-500/10"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* ============ MAIN CONTENT ============ */}
            <main className="pt-16 lg:pt-0 lg:pl-64 px-2 min-h-screen max-h-screen bg-orange-100 border border-black">
                <Outlet />
            </main>
        </div>
    );
};

export default DeshboardHome;
