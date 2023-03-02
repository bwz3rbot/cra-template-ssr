import { NavigationBar } from "../../Navigation";
import { Grid } from "@mui/material";
import { Footer } from "../../Navigation/Footer";
export const LayoutDefault = ({ children }) => {
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
					item
					xs={12}
					sx={{
						minHeight: "40vh",
						width: "100vw",
						paddingX: ".4rem",
						paddingTop: ".2rem",
					}}
				>
					{children}
				</Grid>
				<Footer />
			</Grid>
		</>
	);
};
