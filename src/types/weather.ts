export interface City {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
}

interface CurrentWeather {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
}

export interface WeatherResponse {
    location: Location;
    current: CurrentWeather;
}

export interface ForecastResponse {
    location: Location;
    current: CurrentWeather;
    forecast: {
        forecastday: {
            date: string;
            date_epoch: number;
            day: {
                mintemp_c: number;
                maxtemp_c: number;
                condition: { text: string; icon: string };
            };
        }[];
    };
}

export interface City {
    id: number
    name: string
    lat: number
    lon: number
    country: string
    region: string;
    url: string;
}

export type FavoriteCity = City & {
    nickname?: string;
    backgroundTheme?: string;
    customBackground?: string;
};