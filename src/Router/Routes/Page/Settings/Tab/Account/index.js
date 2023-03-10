import { Grid, Typography } from "@mui/material";
import User from "../../../../../../Component/User";
import { DarkModeSwitch } from "../../../../../../Theme";
import SettingsPanel from "../../../../../../Component/Settings";
import { useDarkMode } from "../../../../../../Theme";
const MoonEmoji = () => <span>🌙</span>;
const SunEmoji = () => <span>☀️</span>;
export default function SettingsPageAccountTab() {
	const { mode, toggleDarkMode } = useDarkMode();
	return (
		<Grid container>
			<Grid item>
				<User />
				<SettingsPanel
					options={[
						{
							label: (
								<>
									{mode === "dark" ? (
										<MoonEmoji />
									) : (
										<SunEmoji />
									)}
									{mode === "dark" ? "Dark" : "Light"} Mode
								</>
							),
							Component: DarkModeSwitch,
							value: mode !== "dark",
							onChange: toggleDarkMode,
						},
					]}
				/>
			</Grid>
		</Grid>
	);
}
