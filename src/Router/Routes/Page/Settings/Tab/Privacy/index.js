import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
export default function SettingsPagePrivacyTab() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography
						variant={"button"}
						component={Link}
						to={"/privacy"}
					>
						Privacy
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant={"button"}
						component={Link}
						to={"/terms"}
					>
						Terms of Service
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}
