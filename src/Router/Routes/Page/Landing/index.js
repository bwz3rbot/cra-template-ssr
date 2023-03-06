import { useLayoutVariant } from "../../../../Layout";

import { Grid, Typography } from "@mui/material";

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
