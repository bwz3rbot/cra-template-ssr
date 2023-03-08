import { useLayoutVariant } from "../../../../Layout";

import { Button, Grid, Typography } from "@mui/material";
import { useAuthContext, useMessaging } from "../../../../Firebase";

export default function PageLanding() {
	useLayoutVariant({
		variant: "standard",
	});

	return (
		<>
			<Grid container>
				<Typography>Welcome to the landing page!</Typography>
			</Grid>
		</>
	);
}
