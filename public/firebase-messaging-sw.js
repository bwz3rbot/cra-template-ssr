importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// Set Firebase configuration, once available
let initialized = false;

self.addEventListener("fetch", e => {
	const options = Object.fromEntries(new URLSearchParams(location.search));
	console.log({ options });
	if (!options.apiKey) return;
	if (initialized) return;
	initialized = true;

	// Initialize Firebase app
	console.log("firebase messaging initializing options:", options);
	firebase.initializeApp(options);

	const messaging = firebase.messaging();

	// Configure message handler (assumes backend is set up)
	messaging.onBackgroundMessage(payload => {
		const { icon, body, title } = payload.notification;
		// send push notification
		console.log("received push notification: ", payload.notification);
		self.registration.showNotification(title, {
			body,
			icon,
		});
	});
});
