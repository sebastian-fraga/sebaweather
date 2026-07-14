import { useTranslation } from "react-i18next";

import { IconChevronLeft, IconMail, IconExternalLink } from "@tabler/icons-react";

import SlidePanel from "../layout/SlidePanel";

import { changelog, latestVersion } from "@/data/changelog";

interface AboutPanelProps {
    onClose: () => void;
}

function formatChangelogDate(dateStr: string, locale: string) {
    const [year, month] = dateStr.split("-").map(Number);
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" })
        .format(new Date(year, month - 1));
}


export default function AboutPanel({ onClose }: AboutPanelProps) {
    const { t, i18n } = useTranslation()
    return (
        <SlidePanel onClose={onClose}
        >
            <div className="flex flex-1 flex-col px-4 pt-4 sm:px-8 sm:pt-12 text-white">
                <div className="flex items-center gap-6">
                    <button className="bg-gray-200/30 rounded-3xl sm:rounded-4xl p-3 sm:p-4 text-white hover:bg-purple-300/80 cursor-pointer transition-all" aria-label={t("common.backToSettings")} onClick={onClose}>
                        <IconChevronLeft stroke={3} size={24} className="sm:w-8 sm:h-8" />
                    </button>

                    <h2 className="text-xl sm:text-2xl font-semibold text-white">
                        {t("about.title")}
                    </h2>
                </div>

                <div className="flex flex-col items-center mx-auto my-auto bg-black/25 border border-white/10 backdrop-blur-md shadow-2xl px-6 sm:px-8 py-10 rounded-4xl w-full max-w-lg">
                    <div className="w-24 h-24 mb-3 rounded-3xl bg-purple-500/10 border border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,.1)] flex items-center justify-center">
                        <img src="/assets/images/outlined-icon.webp" alt="Icono de SebaWeather" className="w-full h-full p-4 object-contain" />
                    </div>
                    <h3 className="font-semibold text-xl text-white">SebaWeather</h3>
                    <p className="text-indigo-300 font-medium text-sm">
                        {t("about.version")} {latestVersion}
                    </p>

                    <div className="mt-4 w-full">

                        <a
                            href="mailto:fragasebastian1@gmail.com"
                            className="flex items-center justify-center gap-3 bg-linear-150 from-violet-600 via-purple-600 to-fuchsia-600 hover:brightness-75 transition-all active:scale-95 px-6 py-3 rounded-xl text-white w-70 mx-auto"
                        >
                            <IconMail size={18} />
                            {t("about.contact")}
                        </a>
                    </div>

                    <div className="mt-6 w-full">
                        <p className="text-xs text-white/50 uppercase tracking-wide mb-2 px-1">
                            {t("about.builtWith")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["React", "TypeScript", "Tailwind", "Firebase", "WeatherAPI"].map((tech) => (
                                <span key={tech} className="text-xs text-purple-300 border border-purple-400/20 bg-white/5 px-3 py-1 rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <p className="text-xs text-white/50 uppercase tracking-wide mb-2 px-1">
                            {t("about.credits")}
                        </p>
                        <div className="bg-white/5 rounded-2xl p-4 space-y-3">
                            <p className="text-sm text-white/70">
                                {t("about.creditsWeather")}{' '}
                                <a
                                    href="https://www.weatherapi.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                                >
                                    WeatherAPI.com
                                    <IconExternalLink size={12} />
                                </a>
                            </p>
                            <p className="text-sm text-white/70">
                                {t("about.creditsAnimations")}{' '}
                                <a

                                    href="https://motion.dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                                >
                                    Motion
                                    <IconExternalLink size={12} />
                                </a>
                            </p>
                            <p className="text-sm text-white/70">
                                {t("about.creditsIcons")}{' '}
                                <a

                                    href="https://tabler.io/icons"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                                >
                                    Tabler Icons
                                    <IconExternalLink size={12} />
                                </a>
                            </p>
                            <p className="text-sm text-white/70">
                                {t("about.creditsLottie")}{' '}
                                <a

                                    href="https://airbnb.io/lottie/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-300 underline underline-offset-2 hover:text-purple-200 transition-colors inline-flex items-center gap-1"
                                >
                                    Lottie
                                    <IconExternalLink size={12} />
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <p className="text-xs text-white/50 uppercase tracking-wide mb-2 px-1">
                            {t("about.changelog.title")}
                        </p>
                        <div className="bg-white/5 rounded-2xl overflow-hidden divide-y divide-white/10">
                            {changelog.map((entry) => (
                                <div key={entry.version} className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-white">
                                            v{entry.version}
                                        </span>
                                        <span className="text-xs text-white/40">
                                            {formatChangelogDate(entry.date, i18n.language)}
                                        </span>
                                    </div>
                                    <ul className="text-sm text-white/60 space-y-1 mt-2 list-disc list-inside">
                                        {entry.items.map((itemKey) => (
                                            <li key={itemKey}>{t(itemKey)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SlidePanel >
    );
}
