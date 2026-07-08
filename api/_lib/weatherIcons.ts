type WeatherCategory = "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";

const WEATHER_CODE_MAP: Record<number, WeatherCategory> = {
    1000: "sunny",   // Sunny / Clear

    1003: "cloudy",  // Partly cloudy
    1006: "cloudy",  // Cloudy
    1009: "cloudy",  // Overcast
    1030: "cloudy",  // Mist
    1135: "cloudy",  // Fog
    1147: "cloudy",  // Freezing fog

    1063: "rainy",   // Patchy rain possible
    1150: "rainy",   // Patchy light drizzle
    1153: "rainy",   // Light drizzle
    1168: "rainy",   // Freezing drizzle
    1171: "rainy",   // Heavy freezing drizzle
    1180: "rainy",   // Patchy light rain
    1183: "rainy",   // Light rain
    1186: "rainy",   // Moderate rain at times
    1189: "rainy",   // Moderate rain
    1192: "rainy",   // Heavy rain at times
    1195: "rainy",   // Heavy rain
    1198: "rainy",   // Light freezing rain
    1201: "rainy",   // Moderate or heavy freezing rain
    1240: "rainy",   // Light rain shower
    1243: "rainy",   // Moderate or heavy rain shower
    1246: "rainy",   // Torrential rain shower

    1087: "stormy",  // Thundery outbreaks possible
    1273: "stormy",  // Patchy light rain with thunder
    1276: "stormy",  // Moderate or heavy rain with thunder
    1279: "stormy",  // Patchy light snow with thunder
    1282: "stormy",  // Moderate or heavy snow with thunder

    1066: "snowy",   // Patchy snow possible
    1069: "snowy",   // Patchy sleet possible
    1072: "snowy",   // Patchy freezing drizzle possible
    1114: "snowy",   // Blowing snow
    1117: "snowy",   // Blizzard
    1204: "snowy",   // Light sleet
    1207: "snowy",   // Moderate or heavy sleet
    1210: "snowy",   // Patchy light snow
    1213: "snowy",   // Light snow
    1216: "snowy",   // Patchy moderate snow
    1219: "snowy",   // Moderate snow
    1222: "snowy",   // Patchy heavy snow
    1225: "snowy",   // Heavy snow
    1237: "snowy",   // Ice pellets
    1249: "snowy",   // Light sleet showers
    1252: "snowy",   // Moderate or heavy sleet showers
    1255: "snowy",   // Light snow showers
    1258: "snowy",   // Moderate or heavy snow showers
    1261: "snowy",   // Light showers of ice pellets
    1264: "snowy",   // Moderate or heavy showers of ice pellets
};

const CATEGORY_CONFIG: Record<WeatherCategory, { emoji: string; icon: string }> = {
    sunny: { emoji: "☀️", icon: "/assets/icons/sunny.png" },
    cloudy: { emoji: "☁️", icon: "/assets/icons/cloudy.png" },
    rainy: { emoji: "🌧️", icon: "/assets/icons/rainy.png" },
    stormy: { emoji: "⛈️", icon: "/assets/icons/stormy.png" },
    snowy: { emoji: "❄️", icon: "/assets/icons/snowy.png" },
};

export function getWeatherNotificationContent(code: number) {
    const category = WEATHER_CODE_MAP[code] ?? "sunny";
    return CATEGORY_CONFIG[category];
}