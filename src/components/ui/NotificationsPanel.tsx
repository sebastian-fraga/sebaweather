import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconChevronLeft, IconBellOff, IconClock } from "@tabler/icons-react";

import { useApp } from "../../context/AppContext";
import { getFlagUrl } from "../../utils/flags";
import {
    requestNotificationToken,
    saveNotificationSubscription,
    deleteNotificationSubscription,
    getStoredNotificationToken,
} from "../../services/firebase";
import type { FavoriteCity } from "../../types/weather";
import { NotificationToggleStatus } from "./NotificationToggleStatus";
import NotificationTimePickerModal from "./NotificationTimePickerModal";

const DEFAULT_TIME = "08:00"

type Props = {
    onClose: () => void;
};

export default function NotificationsPanel({ onClose }: Props) {
    const { t } = useTranslation();
    const { state, dispatch } = useApp();
    const { favoriteCities, preferences } = state;

    const [statusAlert, setStatusAlert] = useState<{
        type: "success" | "error";
        title: string;
        message: string;
    } | null>(null);

    const [timeModalCityId, setTimeModalCityId] = useState<number | null>(null);

    const showStatusAlert = (type: "success" | "error", title: string, message: string) => {
        setStatusAlert({ type, title, message });
        setTimeout(() => setStatusAlert(null), 1700);
    };

    const handleToggleCity = async (city: FavoriteCity) => {
        const turningOn = !city.notificationsEnabled;

        dispatch({
            type: "UPDATE_FAVORITE",
            payload: { id: city.id, data: { notificationsEnabled: turningOn } },
        });

        if (turningOn) {
            try {
                let token = getStoredNotificationToken();
                if (!token) {
                    token = await requestNotificationToken();
                }

                if (!token) {
                    dispatch({
                        type: "UPDATE_FAVORITE",
                        payload: { id: city.id, data: { notificationsEnabled: false } },
                    });
                    showStatusAlert(
                        "error",
                        t("settings.notificationsEnabled.permissionErrorTitle"),
                        t("settings.notificationsEnabled.permissionError")
                    );
                    return;
                }

                const time = city.notificationTime || DEFAULT_TIME;

                const weatherRes = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city.lat},${city.lon}`
                );

                const weather = await weatherRes.json();

                const timezone = weather.location.tz_id;
                const cityWithTimezone = {
                    ...city,
                    timezone,
                };

                await saveNotificationSubscription(
                    token,
                    cityWithTimezone,
                    preferences.language,
                    time
                );
                dispatch({
                    type: "UPDATE_FAVORITE",
                    payload: { id: city.id, data: { notificationTime: time } },
                });

                showStatusAlert(
                    "success",
                    t("settings.notificationsEnabled.successTitle"),
                    t("settings.notificationsEnabled.cityEnabled", { city: city.name })
                );
            } catch (err) {
                console.error("Error activando notificaciones para la ciudad:", err);
                dispatch({
                    type: "UPDATE_FAVORITE",
                    payload: { id: city.id, data: { notificationsEnabled: false } },
                });
                showStatusAlert(
                    "error",
                    t("settings.notificationsEnabled.saveErrorTitle"),
                    t("settings.notificationsEnabled.saveError")
                );
            }
        } else {
            const token = getStoredNotificationToken();
            if (token) {
                deleteNotificationSubscription(token, city.id).catch((err) =>
                    console.error("Error desactivando notificaciones para la ciudad:", err)
                );
            }
        }
    };

    const handleTimeSelect = async (city: FavoriteCity, time: string) => {
        dispatch({
            type: "UPDATE_FAVORITE",
            payload: { id: city.id, data: { notificationTime: time } },
        });

        setTimeModalCityId(null);

        const token = getStoredNotificationToken();
        if (!token) return;

        try {
            await saveNotificationSubscription(
                token,
                city,
                preferences.language,
                time
            );
        } catch (err) {
            console.error("Error actualizando horario de notificación:", err);
            showStatusAlert(
                "error",
                t("settings.notificationsEnabled.saveErrorTitle"),
                t("settings.notificationsEnabled.saveError")
            );
        }
    };

    const timeModalCity = favoriteCities.find(
        city => city.id === timeModalCityId
    );


    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 h-dvh flex flex-col bg-linear-150 from-purple-950 via-indigo-950 to-black overflow-hidden"
        >
            <div className="flex items-center gap-6 px-4 pt-4 sm:pt-12 sm:px-8">
                <button className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4 text-white hover:bg-purple-300/80 cursor-pointer transition-all" onClick={(onClose)}>
                    <IconChevronLeft stroke={3} size={24} className="sm:w-8 sm:h-8" />
                </button>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    {t("settings.notificationsPanel.manageTitle")}
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-8 mt-6 flex flex-col items-center">
                {favoriteCities.length === 0 ? (
                    <div className="h-full my-auto flex flex-col items-center justify-center gap-3 text-center text-white/60">
                        <IconBellOff size={44} stroke={1.5} className="animate-pulse" />
                        <p className="text-sm font-medium max-w-xs">{t("settings.notificationsPanel.noFavoritesYet")}</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 w-full max-w-2xl">
                        {favoriteCities.map((city, i) => (
                            <motion.div
                                key={city.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
                                className="w-full rounded-2xl bg-white/6 border border-white/8 backdrop-blur-md px-5 py-4"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <img
                                            src={getFlagUrl(city.country)}
                                            alt={city.country}
                                            className="rounded-lg w-11 h-8 object-cover border border-white/10 shrink-0 shadow-sm"
                                        />

                                        <div className="min-w-0">
                                            <p className="font-semibold text-white tracking-wide text-[15px] sm:text-base truncate">
                                                {city.nickname || city.name}
                                            </p>
                                            {city.region && (
                                                <p className="text-xs text-white/50 tracking-normal truncate mt-0.5">
                                                    {city.region}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <CityToggleSwitch
                                        checked={!!city.notificationsEnabled}
                                        onClick={() => handleToggleCity(city)}
                                    />
                                </div>

                                <AnimatePresence initial={false}>
                                    {city.notificationsEnabled && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <div className="mt-3.5 pt-3 border-t border-white/6 flex justify-start">
                                                <motion.button
                                                    whileHover={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setTimeModalCityId(city.id)}
                                                    className="
                                                        flex items-center gap-2.5 px-3 py-1.5 rounded-xl
                                                        bg-white/5 border border-white/5
                                                        text-xs sm:text-sm text-white/70 
                                                        transition-all cursor-pointer shadow-sm"
                                                >
                                                    <IconClock size={16} className="text-purple-300" />
                                                    <span>
                                                        {t("settings.notificationsPanel.timeLabel")}:{" "}
                                                        <span className="font-semibold text-white ml-0.5 px-1.5 py-0.5 rounded-md">
                                                            {city.notificationTime || DEFAULT_TIME}
                                                        </span>
                                                    </span>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <NotificationTimePickerModal
                key="global-time-picker-modal"
                isOpen={!!timeModalCity}
                onClose={() => setTimeModalCityId(null)}
                selected={timeModalCity?.notificationTime || DEFAULT_TIME}
                onSelect={(time) => {
                    if (timeModalCity) {
                        handleTimeSelect(timeModalCity, time);
                    }
                }}
            />

            <AnimatePresence>
                {statusAlert && (
                    <NotificationToggleStatus
                        type={statusAlert.type}
                        title={statusAlert.title}
                        message={statusAlert.message}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function CityToggleSwitch({ checked, onClick }: { checked: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`relative h-6 w-11 rounded-full cursor-pointer transition-colors ${checked ? "bg-indigo-500" : "bg-white/20"
                }`}
            aria-checked={checked}
            role="switch"
        >
            <motion.span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
                animate={{ left: checked ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
            />
        </div>
    );
}