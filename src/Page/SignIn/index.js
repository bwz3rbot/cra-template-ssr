import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

export default function PageSignIn() {
	const navigate = useNavigate();
	useLayoutVariant({
		variant: "standard",
	});
	const {
		showingSignInDialog,
		setShowingSignInDialog,
		isAuthenticated,
		idToken,
		user,
	} = useAuthContext();

	useEffect(() => {
		// on page load, shows the sign-in dialog if the user is not authenticated
		if (!showingSignInDialog) {
			setShowingSignInDialog(true);
		}
	}, [idToken, showingSignInDialog]);

	useEffect(() => {
		if (!user) return;
		if (!user?.isAnonymous) {
			navigate("/home");
			setShowingSignInDialog(false);
		}
	}, [idToken && !user?.isAnonymous]);

	return <></>;
}
