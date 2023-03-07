import { useLayoutVariant } from "../../../../Layout";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function PageSettings() {
	useLayoutVariant({
		variant: "SPA",
	});

	return (
		<Grid>
			<Typography variant="h5">Settings Page</Typography>
			<Link to="/subscribe">Go to Subscribe</Link>
		</Grid>
	);
}
