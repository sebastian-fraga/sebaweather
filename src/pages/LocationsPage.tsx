import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { useApp } from '../context/AppContext';
import type { FavoriteCity } from "../types/weather";

import NavBar from '../components/ui/NavBar';
import CityCard from '../components/ui/CityCard';
import EditFavoriteCityModal from '../components/ui/EditFavoriteCityModal'

import "../styles/backgrounds.css";

function LocationsPage() {
    const { state, dispatch } = useApp();
    const [editingCity, setEditingCity] = useState<FavoriteCity | null>(null);
    const [editingImage, setEditingImage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRemove = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        dispatch({ type: "REMOVE_FAVORITE", payload: { id } });
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <main className="min-h-[90vh] flex flex-col items-center justify-center gap-8 px-8 pb-32">
                    <h2 className="text-4xl font-semibold text-white self-center">
                        Ubicaciones guardadas
                    </h2>

                    <div className="flex flex-col gap-6 w-[50vw]">
                        {state.favoriteCities.map((city) => (
                            <CityCard
                                key={city.id}
                                city={city}
                                onClick={() =>
                                    navigate(`/home/city/${city.lat}/${city.lon}`, {
                                        state: city,
                                    })
                                }
                                onRemove={(e) => handleRemove(e, city.id)}
                                onEdit={(e, imageUrl) => {
                                    e.stopPropagation();
                                    setEditingImage(imageUrl);
                                    setEditingCity(city);
                                }}
                            />

                        ))}
                        {editingCity && (
                            <EditFavoriteCityModal
                                city={editingCity}
                                wikipediaImage={editingImage}
                                onClose={() => {
                                    setEditingCity(null);
                                    setEditingImage(null);
                                }}
                            />
                        )}

                        <button
                            onClick={() => navigate('/home')}
                            className="group flex flex-col items-center justify-center gap-3 h-[20vh] rounded-4xl border-2 border-dashed border-white/30 hover:border-white/60 hover:bg-white/5 transition-all cursor-pointer"
                        >
                            <IconPlus size={40} stroke={2} className="text-white/70 group-hover:text-white transition-colors" />
                            <p className="text-xl text-white/70 group-hover:text-white transition-colors">
                                Agregar una ciudad
                            </p>
                        </button>
                    </div>
                </main>
            </motion.div>
            <NavBar />
        </>
    );
}

export default LocationsPage;