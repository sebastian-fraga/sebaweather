import type { Icon } from "@tabler/icons-react";
import {
    IconTemperature,
    IconWind,
    IconLanguage,
    IconBell,
    IconClock,
    IconStarOff,
} from "@tabler/icons-react";

export type SettingField =
    | {
        key: "temperature";
        label: string;
        icon: Icon;
        type: "select";
        options: { value: "celsius" | "fahrenheit"; label: string }[];
    }
    | {
        key: "wind";
        label: string;
        icon: Icon;
        type: "select";
        options: { value: "kph" | "mph"; label: string }[];
    }
    | {
        key: "language";
        label: string;
        icon: Icon;
        type: "select";
        options: { value: "es" | "en"; label: string }[];
    }
    | {
        key: "timeFormat";
        label: string;
        icon: Icon;
        type: "select";
        options: { value: "24hs" | "12hs"; label: string }[];
    }
    | {
        key: "notificationsEnabled";
        label: string;
        description?: string;
        icon: Icon;
        type: "toggle";
    }
    | {
        key: "clearFavorites";
        label: string;
        description?: string;
        icon: Icon;
        type: "action";
        destructive?: boolean;
    };

export const settingsConfig: SettingField[] = [
    {
        key: "language",
        label: "Idioma🚧",
        icon: IconLanguage,
        type: "select",
        options: [
            { value: "es", label: "Español" },
            { value: "en", label: "English" },
        ],
    },
    {
        key: "notificationsEnabled",
        label: "Notificaciones🚧",
        description: "Pronóstico, alertas climáticas",
        icon: IconBell,
        type: "toggle",
    },
    {
        key: "temperature",
        label: "Temperatura",
        icon: IconTemperature,
        type: "select",
        options: [
            { value: "celsius", label: "Celsius (°C)" },
            { value: "fahrenheit", label: "Fahrenheit (°F)" },
        ],
    },
    {
        key: "wind",
        label: "Velocidad del viento",
        icon: IconWind,
        type: "select",
        options: [
            { value: "kph", label: "km/h" },
            { value: "mph", label: "mph" },
        ],
    },
    {
        key: "timeFormat",
        label: "Formato de hora🚧",
        icon: IconClock,
        type: "select",
        options: [
            { value: "24hs", label: "24 horas" },
            { value: "12hs", label: "12 horas" },
        ],
    },
    {
        key: "clearFavorites",
        label: "Eliminar favoritos",
        description: "Borra todas las ciudades agregadas a favoritos",
        icon: IconStarOff,
        type: "action",
        destructive: true,
    },
];