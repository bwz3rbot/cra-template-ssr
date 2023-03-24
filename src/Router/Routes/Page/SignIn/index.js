import { useLayoutVariant } from "../../../../Layout";
import { Grid } from "@mui/material";

import SignInDialog from "./../../../../Component/SignInDialog";

export default function PageSignIn() {
	useLayoutVariant({
		variant: "standard",
	});

	return (
		<Grid container>
			<h1>Sign In to {process.env.REACT_APP_SITE_NAME}</h1>
			<Grid item xs={12} sm={8} md={6}>
				<SignInDialog open />
			</Grid>
		</Grid>
	);
}
