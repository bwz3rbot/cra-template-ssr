import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { createContext, useContext, useState } from "react";
import useCSSProps from "../useCSSProps";
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
	useCSSProps();
	const [theme, setTheme] = useState("light");
	return (
		<AppThemeContext.Provider
			value={{
				mode: theme,
				toggleDarkMode: () => {
					setTheme(theme => {
						return theme === "light" ? "dark" : "light";
					});
				},
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
