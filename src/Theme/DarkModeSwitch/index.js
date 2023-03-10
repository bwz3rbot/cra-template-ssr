import { Switch } from "@mui/material";
import { useDarkMode } from "..";

export const DarkModeSwitch = () => {
	const { mode, toggleDarkMode } = useDarkMode();
	return <Switch checked={mode === "dark"} onChange={toggleDarkMode} />;
};
