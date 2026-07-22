import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "./es.json";
import en from "./en.json";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: es },
            en: { translation: en },
        },

        supportedLngs: ["es", "en"],

        load: "languageOnly",

        fallbackLng: "es",

        detection: {
            order: ["navigator"],
            caches: [],
        },

        interpolation: {
            escapeValue: false,
        },

        debug: true,
    });

export default i18next;