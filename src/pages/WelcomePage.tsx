import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

import "../styles/backgrounds.css";
import "../styles/WelcomePage.css";

function WelcomePage() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <main className="
                min-h-[90vh]
                flex flex-col items-center justify-center text-center
                gap-10 sm:gap-14 lg:gap-20
                px-6
            ">

                <img
                    src="/assets/images/welcome-hero.webp"
                    alt="Imagen de inicio"
                    className="
                        w-55 sm:w-70 md:w-87.5 lg:w-105
                        transition-all
                    "
                />

                <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <h2 className="
                        font-medium text-white
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                    ">
                        Asistente del clima
                    </h2>

                    <p className="
                        font-extralight text-gray-300
                        text-base sm:text-lg md:text-xl
                        max-w-xs sm:max-w-md md:max-w-lg
                        leading-relaxed
                    ">
                        Consulta el clima en tiempo real con datos de WeatherAPI
                    </p>
                </div>

                <button
                    onClick={() => {
                        localStorage.setItem("hasVisitedApp", "true");
                        navigate("/home");
                    }}
                    className="bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-2xl cursor-pointer transition-all active:scale-95 hover:brightness-110 px-10 py-3 sm:px-16 sm:py-4 md:px-24 md:py-5 text-base sm:text-lg md:text-xl"
                >
                    Empezar
                </button>

            </main>
        </motion.div>
    );
}

export default WelcomePage;
