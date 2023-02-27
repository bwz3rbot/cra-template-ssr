import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
	getAuth,
	signInAnonymously,
	signInWithPopup,
	setPersistence,
	browserSessionPersistence,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { FIREBASE_CONFIG } from "./config";

const Context = createContext({
	app: null,
	auth: null,
	analytics: null,
	login: () => {},
	logout: () => {},
	loginWithGoogle: () => {},
	user: {
		uid: null,
		username: null,
		photoURL: null,
	},
});

export default function FirebaseAppContextProvider({ children }) {
	const [state, setState] = useState({
		app: null,
		auth: null,
		analytics: null,
		initialized: false,
	});

	useEffect(() => {
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

	const handleAnonymousLogin = async () => {
		if (!state.auth) return;
		signInAnonymously(state.auth);
	};
	useEffect(() => {
		if (!state.initialized) return;
		if (state.auth.currentUser) return;
		handleAnonymousLogin();
	}, [state]);

	return (
		<Context.Provider
			value={{
				app: state.app,
				auth: state.auth,
				analytics: state.analytics,
				login: ({
					email,
					password,
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!state.auth) return;
					state.auth
						.signInWithEmailAndPassword(email, password)
						.then(onSuccess)
						.catch(onError);
				},
				loginWithGoogle: ({
					onSuccess = () => {},
					onError = () => {},
				} = {}) => {
					if (!state.auth) return;
					const provider = new GoogleAuthProvider();
					/* popup seems to work better on mobile than using redirect */
					signInWithPopup(state.auth, provider);
				},
				logout: () => {
					if (!state.auth) return;
					state.auth.signOut();
				},
			}}
		>
			{state.initialized && children}
		</Context.Provider>
	);
}

export const useFirebaseContext = () => {
	return useContext(Context);
};
