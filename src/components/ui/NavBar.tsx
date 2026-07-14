import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IconSearch, IconMapPin, IconSettings } from "@tabler/icons-react";
import Tooltip from "./Tooltip";

const navItems = [
    { to: "/home", icon: <IconSearch />, labelKey: "navbar.search" },
    { to: "/locations", icon: <IconMapPin />, labelKey: "navbar.locations" },
    { to: "/settings", icon: <IconSettings />, labelKey: "navbar.settings" },
];

function NavBar() {
    const { t } = useTranslation()
    const location = useLocation();
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <nav className="fixed inset-x-0 bottom-4 sm:bottom-6 md:bottom-10 flex justify-center z-40">
            <div className="flex items-center gap-2 sm:gap-3 bg-indigo-950/60 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 shadow-lg">

                {navItems.map(({ to, icon, labelKey }) => {
                    const isActive = location.pathname.startsWith(to);
                    const isHovered = hovered === to;

                    return (
                        <Tooltip key={to} label={t(labelKey)} position="top">
                            <NavLink
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

                                <AnimatePresence>
                                    {!isActive && isHovered && (
                                        <motion.div
                                            key="hover-bg"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        />
                                    )}
                                </AnimatePresence>

                                <span className={`relative z-10 ${isActive ? "text-black" : "text-gray-400"}`}>
                                    {icon}
                                </span>
                            </NavLink>
                        </Tooltip>
                    );
                })}
            </div>
        </nav>
    );
}

export default NavBar;