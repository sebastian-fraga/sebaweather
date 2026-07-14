import type { Icon } from "@tabler/icons-react";
import {
    IconTemperature,
    IconWind,
    IconLanguage,
    IconBell,
    IconStarOff
} from "@tabler/icons-react";

export type SettingField =
    | {
        key: "temperature";
        icon: Icon;
        type: "select";
        options: { value: "celsius" | "fahrenheit" }[];
    }
    | {
        key: "wind";
        icon: Icon;
        type: "select";
        options: { value: "kph" | "mph" }[];
    }
    | {
        key: "language";
        icon: Icon;
        type: "select";
        options: { value: "es" | "en" }[];
    }
    | {
        key: "notificationTime";
        icon: Icon;
        type: "time";
    }
    | {
        key: "notificationsEnabled";
        icon: Icon;
        type: "navigate";
        hasDescription?: boolean;
    }
    | {
        key: "clearFavorites";
        icon: Icon;
        type: "action";
        destructive?: boolean;
        hasDescription?: boolean;
    };

export const settingsConfig: SettingField[] = [
    {
        key: "language",
        icon: IconLanguage,
        type: "select",
        options: [{ value: "es" }, { value: "en" }],
    },
    {
        key: "notificationsEnabled",
        icon: IconBell,
        type: "navigate",
        hasDescription: true,
    },
    {
        key: "temperature",
        icon: IconTemperature,
        type: "select",
        options: [{ value: "celsius" }, { value: "fahrenheit" }],
    },
    {
        key: "wind",
        icon: IconWind,
        type: "select",
        options: [{ value: "kph" }, { value: "mph" }],
    },
    {
        key: "clearFavorites",
        icon: IconStarOff,
        type: "action",
        destructive: true,
        hasDescription: true,
    },
];