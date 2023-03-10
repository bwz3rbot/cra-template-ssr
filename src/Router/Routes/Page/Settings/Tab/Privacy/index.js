import SettingsPanel from "../../../../../../Component/Settings";
import { Grid } from "@mui/material";
export default function SettingsPagePrivacyTab() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<SettingsPanel options={[]} />
				</Grid>
			</Grid>
		</>
	);
}
