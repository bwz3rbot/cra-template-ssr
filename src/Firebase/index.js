import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { pick } from "lodash";

import {
	getAuth,
	signInAnonymously,
	signInWithPopup,
	signInWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	GoogleAuthProvider,
	EmailAuthProvider,
	onAuthStateChanged,
	linkWithCredential,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { FIREBASE_CONFIG } from "./config";
const Context = createContext({
	app: null,
	auth: null,
	analytics: null,
	user: null,
	isAuthenticated: false,
	isAnonymous: false,
	username: null,

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
	const [state, setState] = useState({
		app: null,
		auth: null,
		analytics: null,
		initialized: false,
		user: null,
	});

	useEffect(() => {
		// this effect will run once on mount and initialize the firebase app
		if (state.initialized) return;
		let mounted = true;
		const asyncEffect = async () => {
			const app = initializeApp(FIREBASE_CONFIG);
			const auth = getAuth(app);
			onAuthStateChanged(auth, user => {
				// state needs to be given a new reference to auth here
				// or the currently logged in user it will be out of sync

				setState(state => ({
					...state,
					auth,
				}));
			});
			await setPersistence(auth, browserSessionPersistence);
			const analytics = getAnalytics(app);
			mounted &&
				setState({
					app,
					auth,
					analytics,
					initialized: true,
				});
		};
		asyncEffect();
		return () => {
			mounted = false;
		};
	}, [state]);

	useEffect(() => {
		// this effect will run once the app has been initialized and will create an anonymous session
		// if the user creates a new account it will be merged with the anonymous session,
		// allowing them to retain their user id and any data they have created under the anonymous session
		if (!state.initialized) return;
		if (state.auth.currentUser) return;
		signInAnonymously(state.auth);
	}, [state]);

	useEffect(() => {
		// this effect is required to pass idToken to apollo client
		// it will run whenever a new user logs in or out
		// getIdToken function is asynchronous, so it must be done in an effect
		let mounted = true;
		if (!state.auth) return;
		if (!state?.auth?.currentUser) {
			return;
		}
		const asyncEffect = async () => {
			if (state.auth.currentUser && !state.idToken) {
				const idToken = await state.auth.currentUser?.getIdToken();
				mounted &&
					setState(state => ({
						...state,
						user: {
							...state.auth.currentUser,
							idToken,
						},
					}));
			}
		};
		asyncEffect();
	}, [state?.auth?.currentUser]);

	const isAuthenticated = Boolean(!!state?.user?.idToken);
	const isAnonymous = state?.user?.isAnonymous || false;

	useEffect(() => {
		// refresh the token every 55 minutes
		let mounted = true;
		if (!state.user) return;
		const timeInterval = 55 * 60 * 1000; // 55 minutes
		const interval = setInterval(async () => {
			const newToken = await state?.auth?.currentUser?.getIdToken(true);
			mounted &&
				setState(state => ({
					...state,
					user: {
						...state.user,
						idToken: newToken,
					},
				}));
		}, timeInterval);
		return () => {
			mounted = false;
			clearInterval(interval);
		};
	}, [state?.user?.idToken]);

	return (
		<Context.Provider
			value={{
				app: state.app,
				auth: state.auth,
				analytics: state.analytics,
				user: state.user,
				isAuthenticated,
				isAnonymous,
				username:
					state.auth?.currentUser?.displayName ||
					state.auth?.currentUser?.email ||
					null,
				signInWithEmailAndPassword: ({
					email,
					password,
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!state.auth) return;
					signInWithEmailAndPassword(state.auth, email, password)
						.then(onSuccess)
						.catch(onError);
				},
				signInWithGoogle: ({
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!state.auth) return;
					const provider = new GoogleAuthProvider();

					/* popup seems to work better on mobile than using redirect */
					signInWithPopup(state.auth, provider)
						.then(onSuccess)
						.catch(onError);
				},
				signOut: async () => {
					if (!state.auth) return;
					setState(state => ({ ...state, idToken: null }));
					await state.auth.signOut().catch(err => {
						console.error(err);
					});
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

					if (!state.auth) return;
					try {
						const currentUser = state.auth.currentUser;
						const Credential = EmailAuthProvider.credential(
							email,
							password
						);
						await linkWithCredential(currentUser, Credential);
						onSuccess();
					} catch (err) {
						onError(err);
						return;
					}
				},
			}}
		>
			{state.initialized && <>{children}</>}
		</Context.Provider>
	);
}

export const useFirebaseContext = () => {
	return useContext(Context);
};

export const useAuthContext = () => {
	// return only the required auth related values from useFirebaseContext in one line
	return pick(useFirebaseContext(), [
		"user",
		"username",
		"isAuthenticated",
		"isAnonymous",
		"createAccount",

		"signInWithEmailAndPassword",
		"signInWithGoogle",
		"signOut",
	]);
};
