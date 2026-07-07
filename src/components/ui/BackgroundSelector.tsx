import { useTranslation } from "react-i18next";

import { IconBrandWikipedia, IconPhotoPlus } from "@tabler/icons-react";

import { BACKGROUND_THEMES } from "../../constants/backgroundThemes";

type BackgroundSelectorProps = {
    selected: string;
    onSelect: (value: string) => void;
    hasWikipediaImage: boolean;
};

export default function BackgroundSelector({
    selected,
    onSelect,
    hasWikipediaImage,
}: BackgroundSelectorProps) {
    const { t } = useTranslation()
    return (
        <div className="relative">
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-zinc-900 to-transparent z-10" />

            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-visible pt-10 sm:pt-12 pb-3 px-3 sm:px-4 scrollbar-hide">

                <button
                    type="button"
                    disabled={!hasWikipediaImage}
                    onClick={() => onSelect("wikipedia")}
                    className={`group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-visible flex items-center justify-center transition-all
${selected === "wikipedia"
                            ? "ring-3 sm:ring-4 ring-purple-400 scale-105"
                            : ""
                        }
${hasWikipediaImage
                            ? "bg-zinc-800 hover:scale-105 cursor-pointer"
                            : "bg-zinc-800 opacity-40 cursor-not-allowed"
                        }`}
                >
                    <IconBrandWikipedia size={26} className="text-white/70 sm:w-8 sm:h-8 md:w-9.5 md:h-9.5" />
                    <span className="pointer-events-none absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 rounded-lg bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        Wikipedia
                    </span>
                </button>

                <label
                    htmlFor="custom-bg-input"
                    className={`group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 shrink-0 rounded-full flex items-center justify-center bg-zinc-800 cursor-pointer transition-all overflow-visible
                        ${selected === "custom"
                            ? "ring-3 sm:ring-4 ring-purple-400 scale-105"
                            : "hover:scale-105"
                        }`}
                >
                    <IconPhotoPlus size={24} className="text-white/70 sm:w-8 sm:h-8" />
                    <span className="pointer-events-none absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 rounded-lg bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        {t("locations.edit.customImage")}
                    </span>
                </label>

                {BACKGROUND_THEMES.map((theme) => (
                    <button
                        key={theme.id}
                        type="button"
                        onClick={() => onSelect(theme.id)}
                        className={`group relative shrink-0 rounded-full overflow-visible transition-all cursor-pointer
                            ${selected === theme.id
                                ? "ring-3 sm:ring-4 ring-purple-400 scale-105"
                                : "hover:scale-105"
                            }`}
                    >
                        <img
                            src={theme.image}
                            alt={t(`locations.edit.${theme.id}`)}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-full"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all" />
                        <span className="pointer-events-none absolute -top-9 sm:-top-10 left-1/2 -translate-x-1/2 rounded-lg bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                            {t(`locations.edit.${theme.id}`)}
                        </span>
                    </button>
                ))}

            </div>
        </div>
    );
}