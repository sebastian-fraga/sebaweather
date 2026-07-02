import { motion } from 'framer-motion'

import NavBar from '../components/ui/NavBar';

import "../styles/backgrounds.css";
import "../styles/WelcomePage.css";

function SettingsPage() {
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div className='grid place-content-center'>
                    <img src="/assets/images/settings.webp" alt="" className='w-120 h-auto' />
                </div>
            </motion.div>
            <NavBar />
        </>
    );
}

export default SettingsPage;
