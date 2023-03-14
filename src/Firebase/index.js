import { createContext, useContext, useState, useMemo } from "react";
import { useLogger } from "../Logger";
import { FIREBASE_CONFIG } from "./config";

import { initializeApp } from "firebase/app";
import {
	getAnalytics,
	isSupported as isSupportedAnalytics,
} from "firebase/analytics";
import {
	getMessaging,
	isSupported as isSupportedMessaging,
} from "firebase/messaging";
import MessagingContext from "./Messaging";
import {
	getAuth,
	signInAnonymously,
	signInWithPopup,
	signInWithEmailAndPassword,
	indexedDBLocalPersistence,
	GoogleAuthProvider,
	EmailAuthProvider,
	onAuthStateChanged,
	linkWithCredential,
	sendEmailVerification,
	sendPasswordResetEmail,
} from "firebase/auth";
export const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const analytics = isSupportedAnalytics() ? getAnalytics(app) : null;
export const messaging = isSupportedMessaging() ? getMessaging(app) : null;

const Context = createContext({
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
	const { setUser } = useLogger();
	const [currentUser, setCurrentUser] = useState(null);
	useMemo(() => {
		if (currentUser) return;
		// handle auth state change - sign in anonymously if no user
		let unsubscribe = () => {};
		auth.setPersistence(indexedDBLocalPersistence).then(persistence => {
			unsubscribe = onAuthStateChanged(auth, user => {
				if (user) {
					setUser({
						user_id: user.uid,
					});
					setCurrentUser(user); // set the currentUser state if one exists
				} else {
					signInAnonymously(auth); // otherwise, sign in anonymously
				}
			});
		});
		return () => {
			unsubscribe();
		};
	}, [auth]);

	return (
		<Context.Provider
			value={{
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

					try {
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
