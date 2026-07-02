import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { IconSearch, IconArrowRight, IconListSearch } from "@tabler/icons-react";
import { motion } from 'framer-motion'

import { useSearch } from '../hooks/useSearch';
import type { City } from '../types/weather';
import { getFlagUrl } from '../utils/flags';

import NavBar from "../components/ui/NavBar";

import "../styles/HomePage.css";
import "../styles/backgrounds.css";

function HomePage() {
    const { results, status, search } = useSearch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            search(query);
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, search]);
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>

                <main className="min-h-[90vh] flex flex-col items-center justify-center text-center gap-4 px-4">

                    <div className="relative w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw]">
                        <IconSearch
                            className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400"
                            size={24}
                        />
                        <input
                            type="search"
                            className="bg-white w-full rounded-2xl py-3 sm:py-4 md:py-5 pl-14 sm:pl-16 md:pl-18 pr-4 sm:pr-6 text-lg sm:text-2xl md:text-3xl font-semibold placeholder:text-gray-400"
                            placeholder="Buscar ciudad..."
                            onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                search(value);
                            }}
                        />
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${query.trim()
                            ? "max-h-10 opacity-100 mb-8 sm:mb-12"
                            : "max-h-0 opacity-0 mb-0"
                            }`}
                    >
                        <p className="text-xs sm:text-sm text-gray-300 px-4">
                            ¿No encuentras tu ciudad? Intenta agregar el país o provincia.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] h-[60vh] sm:h-[55vh] md:h-[50vh] overflow-hidden bg-linear-180 from-white to-purple-200/90 rounded-3xl sm:rounded-4xl">

                        <div
                            className={`absolute inset-0 grid place-content-center transition-opacity duration-300 ${status === "loading" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                                <p className="text-base sm:text-lg text-slate-700">Buscando...</p>
                            </div>
                        </div>

                        <div
                            className={`absolute inset-0 transition-opacity duration-300 ${status === "success" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <div className="flex flex-col py-6 sm:py-12 h-full overflow-y-auto">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 px-4 sm:px-0">
                                    Resultados de búsqueda
                                </h2>

                                {results.map((city: City) => (
                                    <div
                                        key={city.id}
                                        onClick={() =>
                                            navigate(`/home/city/${city.lat}/${city.lon}`, {
                                                state: city,
                                            })
                                        }
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
                                No se encontraron ciudades
                            </p>
                            <p className="text-xs sm:text-sm text-slate-500">
                                Intenta con otro nombre
                            </p>
                        </div>

                        <div
                            className={`absolute inset-0 grid place-content-center transition-opacity duration-300 px-4 ${status === "idle" ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <IconListSearch />
                                <p className="text-base sm:text-xl text-slate-950/70 text-left sm:text-center">
                                    Busca una ciudad para comenzar
                                </p>
                            </div>
                        </div>

                    </div>
                </main>
            </motion.div>
            <NavBar />
        </>
    )
}

export default HomePage