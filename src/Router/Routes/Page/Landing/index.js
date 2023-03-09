import { useLayoutVariant } from "../../../../Layout";

import { Button, Grid, Typography } from "@mui/material";
import { useAuthContext, useMessaging } from "../../../../Firebase";

export default function PageLanding() {
	return (
		<>
			<Grid container>
				<Typography>Welcome to the landing page!</Typography>
			</Grid>
		</>
	);
}
