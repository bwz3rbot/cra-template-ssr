import { NavigationBar, Footer } from "../Navigation";
import { Grid } from "@mui/material";
export default function Layout({ children }) {
	return (
		<>
			<NavigationBar />
			<Grid
				container
				sx={{
					width: "100vw",
					height: "var(--body-height)",
					overflowY: "scroll",
				}}
			>
				<Grid
					item
					xs={12}
					sx={{
						minHeight: "40vh",
					}}
				>
					{children}
				</Grid>
				<Footer />
			</Grid>
		</>
	);
}
