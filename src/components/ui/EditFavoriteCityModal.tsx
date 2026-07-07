import { useState } from "react";
import { useTranslation } from "react-i18next";

import { IconPhoto, IconDeviceFloppy, IconX, IconRestore } from "@tabler/icons-react";

import { useApp } from "../../context/AppContext";
import type { FavoriteCity } from "../../types/weather";
import { BACKGROUND_THEMES } from "../../constants/backgroundThemes";

import BackgroundSelector from "./BackgroundSelector";

type EditFavoriteCityModalProps = {
    city: FavoriteCity;
    wikipediaImage: string | null;
    onClose: () => void;
};

export default function EditFavoriteCityModal({
    city,
    wikipediaImage,
    onClose,
}: EditFavoriteCityModalProps) {
    const { t } = useTranslation()
    const { dispatch } = useApp();
    const initialState = {
        nickname: city.nickname ?? city.name,
        backgroundTheme: city.backgroundTheme,
        customImage: city.customBackground ?? null,
    };
    const [nickname, setNickname] = useState(initialState.nickname);
    const [backgroundTheme, setBackgroundTheme] = useState(initialState.backgroundTheme);
    const [customImage, setCustomImage] = useState<string | null>(initialState.customImage);

    function handleReset() {
        setNickname(initialState.nickname);
        setBackgroundTheme(initialState.backgroundTheme);
        setCustomImage(initialState.customImage);
    }

    const previewBackground =
        backgroundTheme === "custom"
            ? customImage
            : BACKGROUND_THEMES.find(t => t.id === backgroundTheme)?.image ||
            wikipediaImage;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="text-white bg-zinc-900 w-full max-w-md sm:max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative">
                <h2 className="text-lg sm:text-xl font-semibold">{t("locations.edit.cityName")}</h2>
                <input
                    type="text"
                    value={nickname}
                    maxLength={26}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded-lg mb-5 mt-2 text-sm sm:text-base"
                    placeholder={t("locations.edit.placeholder")}
                />

                <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-5 hover:bg-white/30 rounded-full p-1.5 sm:p-2 transition-all cursor-pointer">
                    <IconX size={20} className="sm:w-6 sm:h-6" />
                </button>

                <div className="relative h-36 sm:h-44 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden mb-6">
                    {previewBackground ? (
                        <img
                            src={previewBackground}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                            <IconPhoto size={36} className="text-white sm:w-12 sm:h-12" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 text-white">
                        <p className="text-base sm:text-lg font-bold truncate max-w-[80vw]">{nickname}</p>
                        <p className="text-xs opacity-70">{t("locations.edit.preview")}</p>
                    </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold">{t("locations.edit.theme")}</h2>
                <div className="mt-2 -mx-5 sm:-mx-8 md:-mx-10 px-5 sm:px-8 md:px-10 -mb-8 sm:-mb-10">
                    <div className="-mt-8 sm:-mt-10">
                        <BackgroundSelector
                            selected={backgroundTheme ?? "wikipedia"}
                            onSelect={(value) => {
                                setBackgroundTheme(value);
                                if (value !== "custom") {
                                    setCustomImage(null);
                                }
                            }}
                            hasWikipediaImage={!!wikipediaImage}
                        />
                    </div>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    id="custom-bg-input"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const reader = new FileReader();
                        reader.onload = () => {
                            setCustomImage(reader.result as string);
                            setBackgroundTheme("custom");
                        };
                        reader.readAsDataURL(file);
                    }}
                />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-3">
                    <button
                        className="w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 bg-linear-180 from-purple-500 to-purple-800 mt-8 sm:mt-12 py-3 sm:py-4 px-6 sm:px-10 md:px-16 rounded-xl cursor-pointer transition-all hover:brightness-80 active:scale-95"
                        onClick={() => {
                            dispatch({
                                type: "UPDATE_FAVORITE",
                                payload: {
                                    id: city.id,
                                    data: {
                                        nickname,
                                        backgroundTheme,
                                        customBackground: customImage ?? undefined,
                                    },
                                },
                            });

                            onClose();
                        }}
                    >
                        <IconDeviceFloppy size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base font-medium">{t("locations.edit.save")}</span>
                    </button>

                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 sm:gap-4 bg-linear-180 from-white to-slate-200 text-black mt-0 sm:mt-12 py-3 sm:py-4 px-6 sm:px-10 md:px-16 rounded-xl cursor-pointer transition-all hover:brightness-80 active:scale-95"
                    >
                        <IconRestore size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base font-medium">{t("locations.edit.reset")}</span>
                    </button>
                </div>

            </div>
        </div>
    );
}