import { createContext, useContext, useState, useEffect } from "react";
import MessagingContext from "./Messaging";

import { FIREBASE_CONFIG } from "./config";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";

import {
	getAuth,
	signInAnonymously,
	signInWithPopup,
	signInWithEmailAndPassword,
	browserSessionPersistence,
	GoogleAuthProvider,
	EmailAuthProvider,
	onAuthStateChanged,
	linkWithCredential,
	sendEmailVerification,
	sendPasswordResetEmail,
} from "firebase/auth";
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const Context = createContext({
	app,
	auth,
	messaging,
	analytics,
	user: null,
	isAuthenticated: false,
	isAnonymous: false,
	username: null,
	sendEmailVerification: () => {},
	sendPasswordResetEmail: () => {},
	signInWithGoogle: ({ onSuccess = () => {}, onError = () => {} }) => {},
	signInWithEmailAndPassword: ({
		email,
		password,
		onSuccess = () => {},
		onError = () => {},
	}) => {},
	signOut: () => {},
	createAccount: ({
		email,
		password,
		onSuccess = () => {},
		onError = () => {},
	}) => {},
});

export default function FirebaseAppContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		if (currentUser) return;
		console.log("Initial auth:", {
			auth,
		});
		// handle auth state change - sign in anonymously if no user
		let unsubscribe = () => {};
		auth.setPersistence(browserSessionPersistence).then(persistence => {
			unsubscribe = onAuthStateChanged(auth, user => {
				if (user) {
					setCurrentUser(user); // set the currentUser state if one exists
				} else {
					signInAnonymously(auth); // otherwise, sign in anonymously
				}
			});
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Context.Provider
			value={{
				app,
				auth,
				analytics,
				messaging,
				user: currentUser,
				isAuthenticated: !!currentUser,
				isAnonymous: currentUser?.isAnonymous || false,
				username:
					currentUser?.displayName || currentUser?.email || null,
				signInWithEmailAndPassword: ({
					email,
					password,
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!auth) return;
					signInWithEmailAndPassword(auth, email, password)
						.then(onSuccess)
						.catch(onError);
				},
				signInWithGoogle: async ({
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!auth) return;
					const provider = new GoogleAuthProvider();

					try {
						console.log("signInWithGoogle");
						/* popup seems to work better on mobile than using redirect */
						await signInWithPopup(auth, provider);
						onSuccess();
					} catch (err) {
						onError(err);
					}
				},
				signOut: async () => {
					if (!auth) return;
					await auth.signOut();
				},
				sendEmailVerification: async ({
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!auth) return;
					try {
						await sendEmailVerification(auth.currentUser);
						onSuccess();
					} catch (err) {
						onError(err);
					}
				},
				sendPasswordResetEmail: async ({
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!auth) return;
					try {
						await sendPasswordResetEmail(
							auth,
							auth.currentUser.email
						);
						onSuccess();
					} catch (err) {
						onError(err);
					}
				},
				createAccount: async ({
					email,
					password,
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					// This funciton takes the current anonymous user and links it
					// to the desired email and password credentials.
					// This causes auth state to update and onAuthStateChanged fire -
					// causing the app to re-render with a new user context

					if (!auth) return;
					try {
						const currentUser = auth.currentUser;
						const Credential = EmailAuthProvider.credential(
							email,
							password
						);

						await linkWithCredential(currentUser, Credential);
						await signInWithEmailAndPassword(auth, email, password);

						onSuccess();
					} catch (err) {
						onError(err);
						return;
					}
				},
			}}
		>
			<MessagingContext>{children}</MessagingContext>
		</Context.Provider>
	);
}

export const useFirebaseContext = () => {
	return useContext(Context);
};
export { useAuthContext } from "./Auth";

export { useMessaging } from "./Messaging";
