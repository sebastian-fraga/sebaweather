import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { IconChevronLeft, IconDots, IconStar, IconStarFilled } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getForecast } from "../services/weatherApi";
import type { City, ForecastResponse } from "../types/weather";
import { getFlagUrl } from '../utils/flags';
import { useApp } from '../context/AppContext';


import { NotificationToggleStatus } from "../components/ui/NotificationToggleStatus";
import TemperatureGauge from '../components/ui/TemperatureGauge';
import NavBar from '../components/ui/NavBar';

import '../styles/CityPage.css'
import "../styles/backgrounds.css";

function CityPage() {
    const { t } = useTranslation()
    const { state, dispatch } = useApp();
    const language = state.preferences.language;
    const { name, lat, lon } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const canGoBack = location.key !== "default";
    const { preferences } = state;

    const city = (location.state as City | null) ?? null;

    const [notifications, setNotifications] = useState<
        {
            id: number;
            type: "success" | "error";
            title: string;
            message: string;
        }[]
    >([]);

    const showNotification = (
        notification: Omit<typeof notifications[number], "id">
    ) => {
        const id = Date.now();

        setNotifications(prev => [
            ...prev,
            { id, ...notification }
        ]);

        setTimeout(() => {
            setNotifications(prev =>
                prev.filter(n => n.id !== id)
            );
        }, 1500);
    };

    const [weather, setWeather] = useState<ForecastResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: PointerEvent) => {
            const target = e.target as Node;

            if (menuRef.current && !menuRef.current.contains(target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    useEffect(() => {
        async function loadWeather() {
            if (!lat || !lon) return;

            try {
                setLoading(true);
                setError(false);

                const data = await getForecast(lat, lon, language);
                setWeather(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        loadWeather();
    }, [lat, lon, language]);

    if (loading) {
        return (
            <motion.div className="text-white grid place-content-center p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <div
                    className={`absolute inset-0 grid place-content-center transition-opacity duration-300}`}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                        <p className="text-lg text-white/80">{t("city.loading")}</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (error || !weather) {
        return <p className="text-white p-10">No se pudo cargar el clima.</p>;
    }

    const forecastDays = weather.forecast.forecastday;
    const todayForecast = forecastDays[0];

    const days = forecastDays.slice(0, 4);

    function getDayLabel(dateString: string) {
        const [year, month, day] = dateString.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const locale = language === "es" ? "es-AR" : "en-US";

        return date.toLocaleDateString(locale, {
            weekday: "short",
            day: "numeric",
        });
    }

    if (!todayForecast) {
        return <p>{t("city.noForecast")}</p>;
    }

    const isFavorite = city ? state.favoriteCities.some((c) => c.id === city.id) : false;

    const MAX_FAVORITES = 5;

    const toggleFavorite = () => {
        if (!city) return;

        if (isFavorite) {
            dispatch({
                type: "REMOVE_FAVORITE",
                payload: { id: city.id },
            });

            showNotification({
                type: "success",
                title: t("city.favoriteRemovedTitle"),
                message: t("city.favoriteRemovedMessage", {
                    city: city.name,
                }),
            });

        } else {
            if (state.favoriteCities.length >= MAX_FAVORITES) {
                showNotification({
                    type: "error",
                    title: t("city.favoriteLimitTitle"),
                    message: t("city.favoriteLimitMessage", {
                        max: MAX_FAVORITES,
                    }),
                });

                return;
            }

            dispatch({
                type: "ADD_FAVORITE",
                payload: city,
            });

            showNotification({
                type: "success",
                title: t("city.favoriteAddedTitle"),
                message: t("city.favoriteAddedMessage", {
                    city: city.name,
                }),
            });
        }
    };

    const currentTemp =
        preferences.temperature === "celsius"
            ? Math.round(weather.current.temp_c)
            : Math.round(weather.current.temp_f);

    const minTemp =
        preferences.temperature === "celsius"
            ? Math.round(todayForecast.day.mintemp_c)
            : Math.round(todayForecast.day.mintemp_f);

    const maxTemp =
        preferences.temperature === "celsius"
            ? Math.round(todayForecast.day.maxtemp_c)
            : Math.round(todayForecast.day.maxtemp_f);

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>

                <div className="w-full flex justify-between px-4 sm:px-10 md:px-20 lg:px-32 xl:px-50 mt-4 sm:mt-10 md:mt-16 mb-6 sm:mb-12 text-white city-button-wrapper">
                    <button
                        className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4"

                        onClick={() => {
                            if (canGoBack) {
                                navigate(-1);
                            } else {
                                navigate("/home");
                            }
                        }}
                    >
                        <IconChevronLeft
                            stroke={3}
                            size={24}
                            className="sm:w-8 sm:h-8"
                            aria-label={t("common.back")}
                        />
                    </button>

                    <div
                        className={`relative transition-colors duration-200 rounded-full ${menuOpen ? "bg-purple-500/60" : ""
                            }`}
                        ref={menuRef}
                    >
                        <button
                            className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label={t("common.openOptions")}
                        >
                            <IconDots
                                stroke={3}
                                size={24}
                                className="sm:w-8 sm:h-8"
                            />
                        </button>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className="absolute right-0 mt-2 w-52 sm:w-66 bg-[#2a2438] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden z-50"
                                >
                                    <button
                                        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
                                        onClick={() => {
                                            toggleFavorite();
                                        }}
                                    >
                                        {isFavorite ? (
                                            <IconStarFilled size={18} className="text-yellow-400 sm:w-5 sm:h-5" />
                                        ) : (
                                            <IconStar size={18} className="sm:w-5 sm:h-5" />
                                        )}
                                        <span>
                                            {isFavorite
                                                ? t("city.removeFavorite")
                                                : t("city.addFavorite")}
                                        </span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <main className="text-white flex flex-col justify-center items-center city-weather px-4 mb-20">
                    <div className='flex items-center gap-4 sm:gap-7 mt-8 sm:mt-16'>
                        <img
                            src={getFlagUrl(city?.country ?? weather.location.country)}
                            alt={city?.country ?? weather.location.country}
                            className="rounded-md w-12 h-8 sm:w-16 sm:h-10"
                        />

                        <div className="flex items-center gap-2 sm:items-center text-2xl sm:text-3xl md:text-4xl">
                            <h2 className="font-medium">
                                {city?.name ?? name ?? weather.location.name},
                            </h2>

                            <p className="font-light text-slate-100/80">
                                {city?.region ?? weather.location.region}
                            </p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 items-center bg-linear-to-br from-violet-500 via-purple-400 to-fuchsia-400 backdrop-blur-xl w-full max-w-2xl md:max-w-3xl lg:max-w-7xl lg:w-200 h-auto sm:h-auto lg:h-90 lg:max-h-120 rounded-3xl sm:rounded-[40px] mt-6 sm:mt-8 mb-8 sm:mb-12 p-6 sm:p-8 md:p-12 gap-6 sm:gap-0'>
                        <div className="flex justify-center">
                            <TemperatureGauge
                                current={currentTemp}
                                min={minTemp}
                                max={maxTemp}
                                unit={preferences.temperature}
                            />
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                            <img
                                src={`https:${weather.current.condition.icon.replace("64x64", "128x128")}`}
                                alt={weather.current.condition.text}
                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                            />
                            <p className='text-xl sm:text-2xl md:text-3xl max-w-80 font-medium text-center'>{weather.current.condition.text}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 md:gap-6 justify-start sm:justify-center overflow-x-auto sm:flex-wrap w-full max-w-2xl md:max-w-3xl lg:max-w-7xl lg:w-200 pb-2 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
                        {days.map((day, index) => {
                            const isToday = index === 0;

                            const dayMin =
                                preferences.temperature === "celsius"
                                    ? Math.round(day.day.mintemp_c)
                                    : Math.round(day.day.mintemp_f);

                            const dayMax =
                                preferences.temperature === "celsius"
                                    ? Math.round(day.day.maxtemp_c)
                                    : Math.round(day.day.maxtemp_f);


                            return (
                                <div
                                    key={day.date_epoch}
                                    className={`w-32 h-44 sm:w-40 sm:h-52 md:w-44 md:h-56 shrink-0 rounded-xl py-4 sm:py-5 md:py-6 px-3 sm:px-4 flex flex-col items-center justify-between gap-2 sm:gap-3 transition-all duration-200
                        ${isToday ? "bg-linear-to-br from-violet-500 via-purple-400 to-fuchsia-400" : "bg-white/10"}`}
                                >
                                    <p className={`text-sm sm:text-md font-medium ${isToday ? "text-white" : "text-white/80"}`}>{getDayLabel(day.date)}</p>

                                    <img
                                        src={`https:${day.day.condition.icon.replace("64x64", "128x128")}`}
                                        alt={day.day.condition.text}
                                        className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-200 ${isToday ? "drop-shadow-xl scale-110" : "drop-shadow-sm"
                                            }`}
                                    />

                                    <p className={`text-[12px] sm:text-base md:text-lg text-center font-medium leading-tight line-clamp-2 min-h-[2.5em] flex items-center ${isToday ? "text-white" : "text-white/90"}`}>
                                        {day.day.condition.text}
                                    </p>

                                    <div className="flex gap-2 text-xs sm:text-sm font-black">
                                        <span className={`${isToday ? "text-blue-100" : "text-blue-200"}`}>
                                            {dayMin}°
                                        </span>
                                        <span className={`${isToday ? "text-red-100" : "text-red-200"}`}>
                                            {dayMax}°
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>

            </motion.div>
            <AnimatePresence>
                {notifications.map((notification, index) => (
                    <NotificationToggleStatus
                        key={notification.id}
                        type={notification.type}
                        title={notification.title}
                        message={notification.message}
                        index={index}
                    />
                ))}
            </AnimatePresence>
            <NavBar />
        </>
    );
}

export default CityPage;