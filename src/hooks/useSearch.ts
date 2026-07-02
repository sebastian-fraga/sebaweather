import { useState } from 'react'
import type { City } from '../types/weather'
import { searchCities } from '../services/weatherApi'

export function useSearch() {
    const [results, setResults] = useState<City[]>([]);
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "empty"
    >("idle");

    async function search(query: string) {
        if (query.trim().length < 1) {
            setResults([]);
            setStatus("idle");
            return;
        }

        setStatus("loading");

        try {
            const data = await searchCities(query);

            if (data.length > 0) {
                setResults(data);
                setStatus("success");
            } else {
                setResults([]);
                setStatus("empty");
            }
        } catch (err) {
            console.error(err);
            setResults([]);
            setStatus("empty");
        }
    }

    return { results, status, search };
}