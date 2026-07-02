import type { FavoriteCity } from "../types/weather";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type ReactNode,
} from "react";
import type { City } from "../types/weather";

type Preferences = {
    units: "metric" | "imperial";
};

type AppState = {
    favoriteCities: FavoriteCity[];
    preferences: Preferences;
};

type AppAction =
    | { type: "ADD_FAVORITE"; payload: City }
    | { type: "REMOVE_FAVORITE"; payload: { id: number } }
    | {
        type: "UPDATE_FAVORITE";
        payload: {
            id: number;
            data: Partial<FavoriteCity>;
        };
    }
    | { type: "SET_UNITS"; payload: Preferences["units"] }
    | { type: "HYDRATE"; payload: AppState };

const initialState: AppState = {
    favoriteCities: [],
    preferences: { units: "metric" },
};

const STORAGE_KEY = "sebaweather:app-state";

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "ADD_FAVORITE": {
            const exists = state.favoriteCities.some(
                (c) => c.id === action.payload.id
            );
            if (exists) return state;
            return {
                ...state,
                favoriteCities: [...state.favoriteCities, action.payload],
            };
        }

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
            
        case "SET_UNITS":
            return {
                ...state,
                preferences: { ...state.preferences, units: action.payload },
            };

        case "HYDRATE":
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
            return saved ? JSON.parse(saved) : initialState;
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