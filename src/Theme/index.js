import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { createContext, useContext, useState } from "react";
import useCSSProps from "./useCSSProps";
import ThemeColor from "./ThemeColor";
import { useCookies } from "../Cookies";
import "./styles.css";
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

export default function ThemeContextProvider({ children }) {
	const cookies = useCookies();
	useCSSProps();
	const getDeviceTheme = () => {
		if (typeof window === "undefined") return null;
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "dark";
		}
		if (window.matchMedia("(prefers-color-scheme: light)").matches) {
			return "light";
		}
		return null;
	};
	const storeSelectedTheme = theme => {
		cookies.set("theme", theme);
	};
	const recallStoredTheme = () => {
		let theme = cookies.get("theme");

		if (!theme) theme = getDeviceTheme();
		if (!theme) theme = "light";
		cookies.set("theme", theme);
		return theme;
	};
	const [theme, setTheme] = useState(recallStoredTheme());

	const handleSetTheme = theme => {
		setTheme(theme);
		storeSelectedTheme(theme);
	};

	const toggleDarkMode = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		handleSetTheme(newTheme);
	};

	return (
		<AppThemeContext.Provider
			value={{
				mode: theme,
				toggleDarkMode,
				setDarkMode: handleSetTheme,
			}}
		>
			<Provider
				theme={theme === "light" ? lightModeTheme : darkModeTheme}
			>
				<ThemeColor />
				{children}
			</Provider>
		</AppThemeContext.Provider>
	);
}
