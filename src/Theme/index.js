import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { createContext, useContext, useState } from "react";
import useCSSProps from "./useCSSProps";
export { DarkModeSwitch } from "./DarkModeSwitch";
const lightModeTheme = createTheme({
	palette: {
		mode: "light",

		primary: {
			main: "#556cd6",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});
const darkModeTheme = createTheme({
	palette: {
		mode: "dark",
		text: {
			primary: "#fff",
			secondary: "#fff",
		},
		background: {
			default: "#2f2f2f",
		},

		primary: {
			// dark mode secondary darker greyish
			main: "#121212",
		},
		secondary: {
			main: "#19857b",
		},
		error: {
			main: red.A400,
		},
	},
});

const AppThemeContext = createContext({
	toggleDarkMode: () => {},
	mode: "light",
});
export const useDarkMode = () => useContext(AppThemeContext);

const useRecallTheme = () => {
	const getDeviceTheme = () => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		if (window.matchMedia("(prefers-color-scheme: light)").matches) {
			return "light";
		}
		return null;
	};
	const storeSelectedTheme = theme => {
		localStorage.setItem("theme", theme);
	};
	const recallStoredTheme = () => {
		return localStorage.getItem("theme");
	};
	const [theme, setTheme] = useState(
		recallStoredTheme() || getDeviceTheme() || "light"
	);

	const handleSetTheme = theme => {
		setTheme(theme);
		storeSelectedTheme(theme);
	};

	const toggleDarkMode = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		handleSetTheme(newTheme);
	};
	return {
		theme,
		toggleDarkMode,
		setDarkMode: handleSetTheme,
	};
};

export default function ThemeContextProvider({ children }) {
	useCSSProps();
	const { theme, toggleDarkMode, setDarkMode } = useRecallTheme();

	return (
		<AppThemeContext.Provider
			value={{
				mode: theme,
				toggleDarkMode,
				setDarkMode,
			}}
		>
			<Provider
				theme={theme === "light" ? lightModeTheme : darkModeTheme}
			>
				{children}
			</Provider>
		</AppThemeContext.Provider>
	);
}
