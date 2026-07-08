
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
    feelslike_c: number;
    feelslike_f: number;

    wind_kph: number;
    wind_mph: number;

    humidity: number;
    is_day: number;

    condition: {
        text: string;
        icon: string;
        code: number;
    };
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
                mintemp_f: number;

                maxtemp_c: number;
                maxtemp_f: number;

                condition: {
                    text: string;
                    icon: string;
                };
            };
        }[];
    };
}

export type FavoriteCity = City & {
    nickname?: string;
    backgroundTheme?: string;
    customBackground?: string;
};

export interface City {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}