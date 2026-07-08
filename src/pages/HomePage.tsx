import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IconSearch, IconArrowRight, IconListSearch, IconClock, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from 'framer-motion'

import { useSearch } from '../hooks/useSearch';
import { useSearchHistory } from '../hooks/useSearchHistory';
import type { City } from '../types/weather';
import { getFlagUrl } from '../utils/flags';

import NavBar from "../components/ui/NavBar";

import "../styles/HomePage.css";
import "../styles/backgrounds.css";

function HomePage() {
    const { t } = useTranslation();
    const { results, status, search } = useSearch();
    const { history, addToHistory, removeFromHistory } = useSearchHistory();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false);

    const handleCityClick = (city: City) => {
        addToHistory(city);
        navigate(`/home/city/${city.lat}/${city.lon}`, { state: city });
    };

    const handleClear = () => {
        setQuery("");
        search("");
        inputRef.current?.focus();
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            search(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, search]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>

                <main className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-4 px-4">

                    <div className="relative w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw]">
                        <IconSearch
                            className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-all ${isFocused ? "text-purple-400 stroke-3" : "text-gray-400"
                                }`}
                            size={24}
                        />
                        <input
                            ref={inputRef}
                            type="search"
                            className="bg-white w-full rounded-2xl py-3 sm:py-4 md:py-5 pl-14 sm:pl-16 md:pl-18 pr-4 sm:pr-6 text-lg sm:text-2xl md:text-3xl font-semibold placeholder:text-gray-400 shadow-lg shadow-purple-950/20 focus:outline-none focus:ring-4 focus:ring-purple-400/80 transition-shadow duration-200"
                            placeholder={t("home.search.placeholder")}
                            value={query}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                search(value);
                            }}
                        />

                        <AnimatePresence mode="wait">
                            {query ? (
                                <motion.button
                                    key="clear"
                                    type="button"
                                    onClick={handleClear}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    <IconX size={22} />
                                </motion.button>
                            ) : (
                                !isFocused && (
                                    <motion.kbd
                                        key="kbd"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 rounded-md bg-gray-100 border border-gray-300 text-gray-500 text-sm font-medium"
                                    >
                                        <span className="text-xs">Ctrl</span>
                                        <span className="text-xs">K</span>
                                    </motion.kbd>
                                )
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${query.trim()
                            ? "max-h-10 opacity-100 mb-8 sm:mb-12"
                            : "max-h-0 opacity-0 mb-0"
                            }`}
                    >
                        <p className="text-xs sm:text-sm text-gray-300 px-4">
                            {t("home.search.tip")}
                        </p>
                    </div>

                    <div className="relative w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] h-[60vh] sm:h-[55vh] md:h-[50vh] overflow-hidden bg-linear-180 from-white to-purple-200/90 rounded-3xl sm:rounded-4xl">

                        <div
                            className={`absolute inset-0 grid place-content-center transition-opacity duration-300 ${status === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                                <p className="text-base sm:text-lg text-slate-700">{t("home.search.searching")}</p>
                            </div>
                        </div>

                        <div
                            className={`absolute inset-0 transition-opacity duration-300 ${status === "success" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <div className="flex flex-col py-6 sm:py-12 h-full overflow-y-auto">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 px-4 sm:px-0">
                                    {t("home.search.results")}
                                </h2>

                                {results.map((city: City) => (
                                    <div
                                        key={city.id}
                                        onClick={() => handleCityClick(city)}

                                        className="group city-search flex items-center justify-between pl-4 sm:pl-8 md:pl-12 pr-4 sm:pr-6 md:pr-8 py-3 border-t-2 border-gray-500/10 hover:bg-gray-500/10 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                            <img
                                                src={getFlagUrl(city.country)}
                                                className="rounded-md w-12 h-8 sm:w-16 sm:h-10 border shrink-0"
                                            />
                                            <span className="text-lg sm:text-xl md:text-2xl font-medium truncate">
                                                {city.name}
                                                {city.region && (
                                                    <span className="text-slate-950 font-light">
                                                        , {city.region}
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        <IconArrowRight
                                            size={24}
                                            stroke={3}
                                            className="opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-white bg-purple-500 rounded-4xl p-1 shrink-0 ml-2"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`absolute inset-0 grid place-content-center text-center transition-opacity duration-300 px-4 ${status === "empty" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <p className="text-lg sm:text-xl font-semibold text-slate-700">
                                {t("home.search.noResults")}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500">
                                {t("home.search.tryAnotherSearch")}
                            </p>
                        </div>

                        <div
                            className={`absolute inset-0 transition-opacity duration-300 ${status === "idle" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            {history.length > 0 ? (
                                <div className="flex flex-col py-6 sm:py-12 h-full overflow-y-auto">
                                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 ml-6 sm:mb-8 px-4 sm:px-0 flex items-center gap-3">
                                        <IconClock size={24} className="text-slate-500" />
                                        {t("home.search.recent")}
                                    </h2>

                                    {history.map((city: City) => (
                                        <div
                                            key={city.id}
                                            onClick={() => handleCityClick(city)}
                                            className="group city-search flex items-center justify-between pl-2 sm:pl-4 md:pl-6 pr-4 sm:pr-6 md:pr-8 py-3 border-t-2 border-gray-500/10 hover:bg-gray-500/10 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromHistory(city);
                                                    }}
                                                    className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                                >
                                                    <IconX size={18} />
                                                </button>
                                                <img
                                                    src={getFlagUrl(city.country)}
                                                    className="rounded-md w-12 h-8 sm:w-16 sm:h-10 border shrink-0"
                                                />
                                                <span className="text-lg sm:text-xl md:text-2xl font-medium truncate">
                                                    {city.name}
                                                    {city.region && (
                                                        <span className="text-slate-950 font-light">
                                                            , {city.region}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            <IconArrowRight
                                                size={24}
                                                stroke={3}
                                                className="opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-white bg-purple-500 rounded-4xl p-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full grid place-content-center">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <IconListSearch />
                                        <p className="text-base sm:text-xl text-slate-950/70 text-left sm:text-center">
                                            {t("home.search.start")}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </motion.div >
            <NavBar />
        </>
    )
}

export default HomePage