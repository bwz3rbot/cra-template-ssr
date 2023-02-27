import { createTheme, ThemeProvider as Provider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { createContext, useContext, useState } from "react";
import useCSSProps from "../useCSSProps";
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

const AppThemeContext = createContext({
	DarkModeToggler: () => <></>,
});
export const useDarkMode = () => useContext(AppThemeContext);

export const ThemeContext = ({ children }) => {
	useCSSProps();
	const [theme, setTheme] = useState("light");
	return (
		<AppThemeContext.Provider
			value={{
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
};
