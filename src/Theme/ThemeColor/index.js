import { Helmet } from "react-helmet-async";
import { useTheme } from "@emotion/react";
export default function ThemeColor() {
	const theme = useTheme();

	return (
		<Helmet>
			<meta
				name="theme-color"
				content={theme.palette.background.default}
			/>
		</Helmet>
	);
}
