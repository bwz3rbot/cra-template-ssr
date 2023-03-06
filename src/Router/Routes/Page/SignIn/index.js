import { useAuthContext } from "../../../../Firebase";
import { useLayoutVariant } from "../../../../Layout";
import { Grid } from "@mui/material";

import SignInDialog from "./../../../../Component/SignInDialog";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

export default function PageSignIn() {
	const navigate = useNavigate();
	useLayoutVariant({
		variant: "standard",
	});
	const { user } = useAuthContext();

	useEffect(() => {
		const isAnonymousUser = !!user?.isAnonymous;
		if (!isAnonymousUser) navigate("/home");
	}, [user]);

	return (
		<Grid container>
			<Grid item xs={12} sm={8} md={6}>
				<SignInDialog open />
			</Grid>
		</Grid>
	);
}
