import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import '../../styles/backgrounds.css';

function getBgClass(pathname: string) {
    if (pathname === '/') return 'welcome-bg';
    if (pathname.startsWith('/home/city')) return 'city-bg';
    if (pathname === '/home') return 'home-bg';
    if (pathname === '/locations') return 'location-bg';
    return 'welcome-bg';
}


function AnimatedBackground({ children }: { children: ReactNode }) {
    const location = useLocation();
    const bgClass = getBgClass(location.pathname);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#1e1b2e]">
            <AnimatePresence>
                <motion.div
                    key={bgClass}
                    className={`absolute inset-0 ${bgClass}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                />
            </AnimatePresence>

            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </div>
    );
}

export default AnimatedBackground;