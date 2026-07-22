import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported, type Messaging } from "firebase/messaging";
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

export let messaging: Messaging | null = null;
export const db = getFirestore(app);

isSupported().then((supported) => {
    if (supported) {
        messaging = getMessaging(app);
    }
});

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;
const TOKEN_STORAGE_KEY = "sebaweather:fcm-token";

export async function requestNotificationToken(): Promise<string | null> {
    if (!messaging) return null;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    await navigator.serviceWorker.ready;

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
    city: { id: string; name: string; lat: number; lon: number, timezone?: string },
    language: "es" | "en",
    notificationTime: string
) {
    await setDoc(doc(db, "subscriptions", `${token}_${city.id}`), {
        token,
        cityId: city.id,
        cityName: city.name,
        lat: city.lat,
        lon: city.lon,
        language,
        notificationTime,
        createdAt: new Date().toISOString(),
        timezone: city.timezone ?? "America/Argentina/Buenos_Aires",
    });
}

export async function deleteNotificationSubscription(
    token: string,
    cityId: string
) {
    await deleteDoc(
        doc(db, "subscriptions", `${token}_${cityId}`)
    );
}

export function listenForegroundMessages() {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
        const { title, body, icon } = payload.data ?? {};

        if (title) {
            new Notification(title, {
                body,
                icon: icon || "/assets/icons/fallback.png",
            });
        }
    });
}
