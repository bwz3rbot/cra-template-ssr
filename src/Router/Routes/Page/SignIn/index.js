import { useLayoutVariant } from "../../../../Layout";
import { Grid } from "@mui/material";

import SignInDialog from "./../../../../Component/SignInDialog";

export default function PageSignIn() {
	useLayoutVariant({
		variant: "standard",
	});

	return (
		<Grid container>
			<Grid item xs={12} sm={8} md={6}>
				<SignInDialog open />
			</Grid>
		</Grid>
	);
}
