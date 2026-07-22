import i18n from "../i18n";

import type { FavoriteCity } from "../types/weather";
import { MAX_FAVORITES } from "@/constants/favorites";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from "react";
import type { City } from "../types/weather";

type Preferences = {
    temperature: "celsius" | "fahrenheit";
    wind: "kph" | "mph";
    language: "es" | "en";
    notificationsEnabled: boolean;
    timeFormat: "24hs" | "12hs";
};

type AppState = {
    favoriteCities: FavoriteCity[];
    preferences: Preferences;
};

type SetPreferenceAction = {
    [K in keyof Preferences]: { type: "SET_PREFERENCE"; payload: { key: K; value: Preferences[K] } };
}[keyof Preferences];

type AppAction =
    | { type: "ADD_FAVORITE"; payload: City }
    | { type: "REMOVE_FAVORITE"; payload: { id: string } }
    | {
        type: "UPDATE_FAVORITE";
        payload: {
            id: string;
            data: Partial<FavoriteCity>;
        };
    }
    | SetPreferenceAction
    | { type: "CLEAR_FAVORITES" }
    | { type: "HYDRATE"; payload: AppState };

const initialState: AppState = {
    favoriteCities: [],
    preferences: {
        temperature: "celsius",
        wind: "kph",
        language: (i18n.language?.split("-")[0] as "es" | "en") || "es",
        notificationsEnabled: false,
        timeFormat: "24hs",
    },
};

const STORAGE_KEY = "sebaweather:app-state";

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "ADD_FAVORITE":
            if (state.favoriteCities.length >= MAX_FAVORITES) {
                return state;
            }

            return {
                ...state,
                favoriteCities: [
                    ...state.favoriteCities,
                    action.payload
                ]
            };

        case "REMOVE_FAVORITE":
            return {
                ...state,
                favoriteCities: state.favoriteCities.filter(
                    (c) => c.id !== action.payload.id
                ),
            };

        case "UPDATE_FAVORITE":
            return {
                ...state,
                favoriteCities: state.favoriteCities.map(city =>
                    city.id === action.payload.id
                        ? { ...city, ...action.payload.data }
                        : city
                ),
            };

        case "CLEAR_FAVORITES":
            return {
                ...state,
                favoriteCities: [],
            };

        case "SET_PREFERENCE":

            return {
                ...state,
                preferences: {
                    ...state.preferences,
                    [action.payload.key]: action.payload.value,
                },
            };

        case "HYDRATE":
            console.log("HYDRATE", action.payload);
            return action.payload;

        default:
            return state;
    }
}

const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const init = (): AppState => {

        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (!saved) return initialState;

            const parsed = JSON.parse(saved);

            const result = {
                ...initialState,
                ...parsed,
                preferences: {
                    ...initialState.preferences,
                    ...parsed.preferences,
                },
            };
            return result;
        } catch {
            return initialState;
        }
    };

    const [state, dispatch] = useReducer(appReducer, initialState, init);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (err) {
            console.error("Error guardando estado:", err);
        }
    }, [state]);

    useEffect(() => {

        if (i18n.language !== state.preferences.language) {
            i18n.changeLanguage(state.preferences.language);
        }
    }, [state.preferences.language]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp debe usarse dentro de <AppProvider>");
    }
    return context;
}