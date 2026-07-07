import type { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const db = getFirestore();
const messaging = getMessaging();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const authHeader = req.headers.authorization;

    if (
        process.env.CRON_SECRET &&
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const subscriptions = await db.collection("subscriptions").get();

    let sent = 0;
    let failed = 0;

    for (const docSnap of subscriptions.docs) {
        const { token, lat, lon, cityName } = docSnap.data();

        try {
            const weatherRes = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}&days=1`
            );
            const weather = await weatherRes.json();

            console.log("WeatherAPI response:", weather);

            const today = weather.forecast.forecastday[0].day;

            await messaging.send({
                token,
                notification: {
                    title: `Clima en ${cityName}`,
                    body: `Hoy ${Math.round(today.maxtemp_c)}°, ${today.condition.text}`,
                },
            });

            sent++;
        } catch (err: unknown) {
            failed++;
            console.error(`Error notificando a ${cityName}:`, err);

            const code = (err as { code?: string })?.code;
            if (
                code === "messaging/invalid-registration-token" ||
                code === "messaging/registration-token-not-registered"
            ) {
                await docSnap.ref.delete();
            }
        }
    }

    res.status(200).json({ sent, failed, total: subscriptions.size });
}