const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://api.weatherapi.com/v1"

export async function searchCities(query: string) {
    const res = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`)

    if (!res.ok) throw new Error("Error buscando ciudades")

    return res.json()
}

export async function getCurrentWeather(
    lat: string,
    lon: string,
    language?: "es" | "en"
) {
    const res = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&lang=${language}`
    );

    if (!res.ok) throw new Error("Error obteniendo el clima");

    return res.json();
}

export async function getForecast(
    lat: string,
    lon: string,
    language: "es" | "en",
    days = 4
) {
    const res = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&lang=${language}`
    );

    if (!res.ok) throw new Error("Error obteniendo el pronóstico");

    return res.json();
}