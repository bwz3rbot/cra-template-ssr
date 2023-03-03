import { NavigationBar } from "../../Navigation";
import { Grid } from "@mui/material";

export default function LayoutSPA({ children }) {
	return (
		<>
			<NavigationBar />
			<Grid
				container
				sx={{
					width: "100vw",
					height: "var(--body-height)",
					overflowY: "scroll",
					backgroundColor: "background.default",
					color: "text.primary",
				}}
			>
				<Grid
					// must be main for accessibility and SEO
					// some browsers don't support the main component and otheres don't support the role attribute
					component={"main"}
					role="main"
					item
					xs={12}
					sx={{
						height: "var(--body-height)",
						width: "100vw",
						padding: ".4rem",
						paddingTop: ".2rem",
					}}
				>
					{children}
				</Grid>
			</Grid>
		</>
	);
}
