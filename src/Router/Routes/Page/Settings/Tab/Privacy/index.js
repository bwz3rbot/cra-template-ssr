import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
export default function SettingsPagePrivacyTab() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Link to={"/privacy-policy"}>Privacy Policy</Link>
				</Grid>
				<Grid item xs={12}>
					<Link to={"/terms"}>Terms of Service</Link>
				</Grid>
			</Grid>
		</>
	);
}
