import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import { IconHome, IconMapPin, IconSettings } from "@tabler/icons-react";

const navItems = [
    { to: "/home", icon: <IconHome />, label: "Inicio" },
    { to: "/locations", icon: <IconMapPin />, label: "Ubicaciones" },
    { to: "/settings", icon: <IconSettings />, label: "Configuración" },
];

function NavBar() {
    const location = useLocation();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <nav className="fixed inset-x-0 bottom-4 sm:bottom-6 md:bottom-10 flex justify-center z-50">
            <div className="flex items-center gap-2 sm:gap-3 bg-indigo-950/60 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 shadow-lg">

                {navItems.map(({ to, icon, label }) => {
                    const isActive = location.pathname.startsWith(to);
                    const isHovered = hovered === to;

                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className="group relative rounded-full p-2 sm:p-3 md:p-4 transition-all"
                            onMouseEnter={() => setHovered(to)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 bg-gray-50 rounded-full"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}

                            {!isActive && isHovered && (
                                <motion.div
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}

                            <span className={`relative z-10 ${isActive ? "text-black" : "text-gray-400"}`}>
                                {icon}
                            </span>

                            <span className="hidden sm:block pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg bg-white px-3 py-1 text-sm text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-20">
                                {label}
                            </span>
                        </NavLink>
                    );
                })}

            </div>
        </nav>
    );
}

export default NavBar;
