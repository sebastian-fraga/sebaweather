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
        icon: Icon;
        type: "select";
        wip?: boolean;
        options: { value: "celsius" | "fahrenheit" }[];
    }
    | {
        key: "wind";
        icon: Icon;
        type: "select";
        wip?: boolean;
        options: { value: "kph" | "mph" }[];
    }
    | {
        key: "language";
        icon: Icon;
        type: "select";
        options: { value: "es" | "en" }[];
    }
    | {
        key: "timeFormat";
        icon: Icon;
        type: "select";
        wip?: boolean;
        options: { value: "24hs" | "12hs" }[];
    }
    | {
        key: "notificationsEnabled";
        icon: Icon;
        type: "toggle";
        wip?: boolean;
        hasDescription?: boolean;
    }
    | {
        key: "clearFavorites";
        icon: Icon;
        type: "action";
        wip?: boolean;
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
        type: "toggle",
        wip: true,
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
        key: "timeFormat",
        icon: IconClock,
        type: "select",
        wip: true,
        options: [{ value: "24hs" }, { value: "12hs" }],
    },
    {
        key: "clearFavorites",
        icon: IconStarOff,
        type: "action",
        destructive: true,
        hasDescription: true,
    },
];