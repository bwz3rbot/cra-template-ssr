importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const getParams = () => {
	const urlParams = new URLSearchParams(location.search);
	return Object.fromEntries(urlParams);
};

firebase.initializeApp(getParams());
const messaging = firebase.messaging();

// Configure message handler (assumes backend is set up)
messaging.onBackgroundMessage(payload => {
	const { icon, body, title } = payload.notification;
	// send push notification
	self.registration.showNotification(title, {
		body,
		icon,
	});
});
