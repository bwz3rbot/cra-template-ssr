import { pick } from "lodash";
import { useFirebaseContext } from "..";
export const useAuthContext = () => {
	// return only the required auth related values from useFirebaseContext in one line
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
