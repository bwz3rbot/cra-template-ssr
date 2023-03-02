import { NavigationBar } from "../../Navigation";
import { Grid } from "@mui/material";
export const LayoutSPA = ({ children }) => {
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
						height: "var(--body-height)",
						border: "1px solid red",
					}}
				>
					{children}
				</Grid>
			</Grid>
		</>
	);
};
