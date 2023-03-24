import { createContext, useContext } from "react";
import fetch from "cross-fetch";
const Context = createContext({
	user: null,
	signInWithEmailAndPassword: () => {},
	signInWithGoogle: () => {},
	sendEmailVerification: () => {},
	sendPasswordResetEmail: () => {},
	signOut: () => {},
	createAccount: () => {},
});
export const useAuthContext = () => useContext(Context);
export default function AuthContext({ children }) {
	return (
		<Context.Provider
			value={{
				user: null,
				signInWithEmailAndPassword: async ({
					email,
					password,
					onError,
					onSuccess,
				}) => {
					try {
						const res = await fetch("api/auth/login", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email,
								password,
							}),
						});
						const data = await res.json();
						if (data.error) {
							throw new Error(data.error);
						}
						onSuccess?.(data);
					} catch (err) {
						onError?.(err);
					}
				},
				signInWithGoogle: () => {},
				sendEmailVerification: () => {},
				sendPasswordResetEmail: () => {},
				signOut: () => {},
				createAccount: async ({
					email,
					password,
					onError,
					onSuccess,
				}) => {
					try {
						const res = await fetch("api/auth/signup", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email,
								password,
							}),
						});
						const data = await res.json();
						if (data.error) {
							throw new Error(data.error);
						}
						onSuccess?.(data);
					} catch (err) {
						console.log("catch", err);
						onError?.(err);
					}
				},
			}}
		>
			{children}
		</Context.Provider>
	);
}
