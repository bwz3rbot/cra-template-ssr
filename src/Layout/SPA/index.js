import { NavigationBar } from "../../Navigation";
import { Grid } from "@mui/material";

export default function LayoutSPA({ children }) {
	return (
		<>
			<NavigationBar />

			<Grid
				// must be main for accessibility and SEO
				// some browsers don't support the main component and otheres don't support the role attribute
				component={"main"}
				role="main"
				item
				xs={12}
				sx={{
					height: "var(--body-height)",
					backgroundColor: "background.default",
					color: "text.primary",

					width: "100vw",
					overflow: "hidden",
				}}
			>
				{children}
			</Grid>
		</>
	);
}
