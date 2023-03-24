const admin = require("firebase-admin");
const cert = require("../service-accont.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(cert),
	storageBucket: `${cert.project_id}.appspot.com`,
});

module.exports = {
	createUser: async (email, password) => {
		const user = await app.auth().createUser({
			email,

			password,
		});
		return user;
	},
	signInWithEmailAndPassword: async (email, password) => {
		const user = await app.auth().c;
		return user;
	},
	getUserFromToken: async token => {
		if (!token) return null;
		const decodedToken = await app.auth().verifyIdToken(token, true);
		const user = await app.auth().getUser(decodedToken.uid);
		return user;
	},
};
