import { pick } from "lodash";
import { useFirebaseContext } from "../";
export const useAuthContext = () => {
	return pick(useFirebaseContext(), [
		"user",
		"username",
		"isAuthenticated",
		"isAnonymous",
		"createAccount",
		"sendEmailVerification",
		"sendPasswordResetEmail",
		"signInWithEmailAndPassword",
		"signInWithGoogle",
		"signOut",

		"logToken",
	]);
};
