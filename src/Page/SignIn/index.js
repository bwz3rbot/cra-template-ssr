import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

import { useEffect } from "react";

export default function PageSignIn() {
	useLayoutVariant({
		variant: "standard",
	});
	const { showingSignInDialog, setShowingSignInDialog, idToken } =
		useAuthContext();

	useEffect(() => {
		// on page load, shows the sign-in dialog if the user is not authenticated
		if (!showingSignInDialog) setShowingSignInDialog(true);
	}, [idToken, showingSignInDialog]);

	return <></>;
}
