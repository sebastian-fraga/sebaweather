import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { IconArrowUpRight, IconEdit, IconTrash, IconWind, IconPhoto } from '@tabler/icons-react';

import { getCityImage } from '../../services/wikipediaApi';
import { getCurrentWeather } from '../../services/weatherApi';
import { getFlagUrl } from '../../utils/flags';
import { useApp } from '../../context/AppContext';
import type { FavoriteCity } from '../../types/weather';
import { BACKGROUND_THEMES } from '../../constants/backgroundThemes';

type FavoriteCityCardProps = {
    city: FavoriteCity;
    onClick: () => void;
    onRemove: (e: React.MouseEvent) => void;
    onEdit: (e: React.MouseEvent, imageUrl: string | null) => void;
};

export default function FavoriteCityCard({ city, onClick, onRemove, onEdit }: FavoriteCityCardProps) {
    const { t } = useTranslation()
    const { state } = useApp()
    const { preferences } = state
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [temp, setTemp] = useState<number | null>(null);
    const [wind, setWind] = useState<number | null>(null);

    useEffect(() => {
        getCityImage(city.name, 800).then(setImageUrl);

        getCurrentWeather(String(city.lat), String(city.lon))
            .then((data) => {
                setTemp(
                    Math.round(
                        preferences.temperature === "celsius"
                            ? data.current.temp_c
                            : data.current.temp_f
                    )
                );

                setWind(
                    Math.round(
                        preferences.wind === "kph"
                            ? data.current.wind_kph
                            : data.current.wind_mph
                    )
                );
            })
            .catch(() => {
                setTemp(null);
                setWind(null);
            });
    }, [
        city.lat,
        city.lon,
        city.name,
        preferences.temperature,
        preferences.wind,
    ]);

    const backgroundImage =
        city.backgroundTheme === "custom"
            ? city.customBackground ?? imageUrl
            : BACKGROUND_THEMES.find(t => t.id === city.backgroundTheme)?.image ?? imageUrl;


    return (
        <div
            onClick={onClick}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-48 sm:h-64 md:h-80 cursor-pointer transition-all group hover:ring-2 hover:ring-purple-500"
        >
            {backgroundImage ? (
                <img
                    src={backgroundImage}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                    <IconPhoto size={36} className="text-white sm:w-12 sm:h-12" />
                </div>
            )}

            <div className="absolute inset-0 transition-all bg-linear-to-b from-black/10 via-black/20 to-black/95 hover:bg-black/20" />

            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 sm:gap-2 bg-black/70 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 max-w-[calc(100%-3.5rem)]">
                <img
                    src={getFlagUrl(city.country)}
                    alt={city.country}
                    className="w-5 h-4 sm:w-7 sm:h-5 rounded object-cover shrink-0"
                />
                <span className="text-white text-xs sm:text-sm font-medium truncate">
                    {city.nickname ?? city.name}
                </span>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/home/city/${city.lat}/${city.lon}`, {
                        state: city,
                    });
                }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors cursor-pointer"
                aria-label={t("common.openCityWeather")}
            >
                <IconArrowUpRight size={16} className="text-black sm:w-4.5 sm:h-4.5" />
            </button>

            <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 text-white">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-none">
                    {temp !== null
                        ? `${temp}${preferences.temperature === "celsius" ? "°C" : "°F"}`
                        : "—"}
                </p>
                {wind !== null && (
                    <p className="flex items-center gap-1 text-xs sm:text-sm text-white/80 mt-1">
                        <IconWind size={12} className="sm:w-3.5 sm:h-3.5" />
                        {wind} {preferences.wind === "kph" ? "km/h" : "mph"}
                    </p>
                )}
            </div>

            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1.5 sm:gap-2">

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(e, imageUrl);
                    }}
                    aria-label={t("common.editCity")}
                    className="bg-gray-900/70 hover:bg-gray-900 rounded-full p-1.5 sm:p-2 transition-colors cursor-pointer"
                >
                    <IconEdit size={14} className="text-white sm:w-4 sm:h-4" />
                </button>
                <button
                    onClick={onRemove}
                    aria-label={t("common.removeFromFavorites")}
                    className="bg-red-500/80 hover:bg-red-500 rounded-full p-1.5 sm:p-2 transition-colors cursor-pointer"
                >
                    <IconTrash size={14} className="text-white sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    );
}