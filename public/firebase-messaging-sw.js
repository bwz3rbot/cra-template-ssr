const getParams = () => {
	const urlParams = new URLSearchParams(location.search);
	return Object.fromEntries(urlParams);
};

const params = getParams();

const options = {
	// it seems like this will work even without valid options?
	apiKey: params.apiKey || true,
	authDomain: params.authDomain || true,
	databaseURL: params.databaseURL || true,
	projectId: params.projectId || true,
	storageBucket: params.storageBucket || true,
	messagingSenderId: params.messagingSenderId || true,
	appId: params.appId || true,
	measurementId: params.measurementId || true,
};
if (params) {
	importScripts(
		"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
	);
	importScripts(
		"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
	);
	console.log("initializign firebase app with optoins: ", options);
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
}
