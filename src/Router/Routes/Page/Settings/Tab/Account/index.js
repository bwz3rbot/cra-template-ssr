import { Grid, Typography } from "@mui/material";
import User from "../../../../../../Component/User";
import { DarkModeSwitch } from "../../../../../../Theme";
export default function SettingsPageAccountTab() {
	return (
		<Grid container>
			<Grid item>
				<User />
				<Typography variant="h6">Dark Mode</Typography>
				<DarkModeSwitch />
			</Grid>
		</Grid>
	);
}
