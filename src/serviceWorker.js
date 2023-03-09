// Convert environment variables to URL `search` parameters
const firebaseConfig = new URLSearchParams({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}).toString();

// Service worker URL w/config variables
const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js?${firebaseConfig}`;
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register(swUrl).catch(registrationError => {
		console.log("SW registration failed: ", registrationError);
	});
}
