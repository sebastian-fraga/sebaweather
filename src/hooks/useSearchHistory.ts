import { useState, useCallback } from "react";
import type { City } from "../types/weather";

const STORAGE_KEY = "recentSearches";
const MAX_ITEMS = 6;

export function useSearchHistory() {
    const [history, setHistory] = useState<City[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const addToHistory = useCallback((city: City) => {
        setHistory((prev) => {
            const filtered = prev.filter(
                (c) => !(c.lat === city.lat && c.lon === city.lon)
            );
            const updated = [city, ...filtered].slice(0, MAX_ITEMS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    const removeFromHistory = useCallback((city: City) => {
        setHistory((prev) => {
            const updated = prev.filter(
                (c) => !(c.lat === city.lat && c.lon === city.lon)
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    return { history, addToHistory, removeFromHistory };
}