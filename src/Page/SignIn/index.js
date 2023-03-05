import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";
import { Grid } from "@mui/material";

import SignInDialog from "../../Component/SignInDialog";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

export default function PageSignIn() {
	const navigate = useNavigate();
	useLayoutVariant({
		variant: "standard",
	});
	const { showingSignInDialog, setShowingSignInDialog, idToken, user } =
		useAuthContext();

	useEffect(() => {
		// on page load, shows the sign-in dialog if the user is not authenticated
		console.log("loaded sign-in page.", {
			user,
		});
		const isAnonymousUser = !!user?.isAnonymous;

		if (!isAnonymousUser) {
			console.log("user is not anonymous, navigating to /home");
			navigate("/home");
		}
	}, [user]);

	return (
		<Grid container>
			<Grid item xs={12} sm={8} md={6}>
				<SignInDialog open />
			</Grid>
		</Grid>
	);
}
