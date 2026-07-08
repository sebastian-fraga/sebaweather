importScripts(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
    apiKey: "AIzaSyCJFglXdlSD9BwJP9TtrUpgNfMVdoVPZWQ",
    authDomain: "sebaweather.firebaseapp.com",
    projectId: "sebaweather",
    messagingSenderId: "42134410748",
    appId: "1:42134410748:web:1c85974c53094feb850e79",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const { title, body, icon } = payload.data;

    self.registration.showNotification(title, {
        body,
        icon: icon || "/assets/icons/fallback.png",
    });
});
