import { useState, useEffect } from "react";
import { defaultSettings, type AppSettings } from "../types/settings";

const STORAGE_KEY = "sebaweather-settings";

export function useSettings() {
    const [settings, setSettings] = useState<AppSettings>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return { settings, updateSetting };
}