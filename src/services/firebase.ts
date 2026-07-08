import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJFglXdlSD9BwJP9TtrUpgNfMVdoVPZWQ",
    authDomain: "sebaweather.firebaseapp.com",
    projectId: "sebaweather",
    storageBucket: "sebaweather.firebasestorage.app",
    messagingSenderId: "42134410748",
    appId: "1:42134410748:web:1c85974c53094feb850e79",
    measurementId: "G-FV87GZRMBY"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore(app);

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;
const TOKEN_STORAGE_KEY = "sebaweather:fcm-token";

export async function requestNotificationToken(): Promise<string | null> {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
    });

    if (token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }

    return token;
}

export function getStoredNotificationToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export async function saveNotificationSubscription(
    token: string,
    city: { name: string; lat: number; lon: number },
    language: "es" | "en"
) {
    await setDoc(doc(db, "subscriptions", token), {
        token,
        cityName: city.name,
        lat: city.lat,
        lon: city.lon,
        language,
        createdAt: new Date().toISOString(),
    });
}


export async function deleteNotificationSubscription(token: string) {
    await deleteDoc(doc(db, "subscriptions", token));
    localStorage.removeItem(TOKEN_STORAGE_KEY);
}
