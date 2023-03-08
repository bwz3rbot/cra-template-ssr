// Scripts for firebase and firebase messaging
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
	apiKey: "%REACT_APP_FIREBASE_API_KEY%",
	authDomain: "%REACT_APP_FIREBASE_AUTH_DOMAIN%",
	projectId: "%REACT_APP_FIREBASE_PROJECT_ID%",
	storageBucket: "%REACT_APP_FIREBASE_STORAGE_BUCKET%",
	messagingSenderId: "%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%",
	appId: "%REACT_APP_FIREBASE_APP_ID%",
	measurementId: "%REACT_APP_FIREBASE_MEASUREMENT_ID%",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log("Received background message ", payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
