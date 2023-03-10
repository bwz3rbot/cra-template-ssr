import { Typography, Grid, Card, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import depthEffect from "../../../../Theme/sx/depth-effect";

export default function PageLanding() {
	const navigate = useNavigate();
	return (
		<Grid
			container
			spacing={2}
			sx={{
				height: "100%",
				width: "100%",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Card
					sx={{
						padding: 1,
						...depthEffect(),
					}}
				>
					<Box p={2}>
						<Typography
							variant="h4"
							component="h1"
							sx={{
								fontWeight: 600,
							}}
						>
							404 - Page Not Found
						</Typography>
						<WarningIcon
							sx={{
								fontSize: 75,
								color: "warning.main",
								margin: 1,
							}}
						/>

						<Typography
							variant="body1"
							component="p"
							sx={{
								fontWeight: 600,
								marginY: 2
							}}
						>
							We're sorry, but the page you requested could not be
							found.
						</Typography>
						<Typography
							variant="button"
							onClick={() => {
								navigate(-1);
							}}
							sx={{
								fontWeight: 600,
								cursor: "pointer",
							}}
						>
							&#8592; Go back
						</Typography>
					</Box>
				</Card>
			</Grid>
		</Grid>
	);
}
