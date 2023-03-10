import { Grid, Box, Card, Typography } from "@mui/material";
import depthEffect from "../../../../Theme/sx/depth-effect";
import ErrorIcon from "@mui/icons-material/Error";
import { useLayoutVariant } from "../../../../Layout";
export default function ApolloClientConnectionErrorPage() {
	useLayoutVariant({
		variant: "standard",
	});

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
							An unexpected error occurred
						</Typography>
						<ErrorIcon
							sx={{
								fontSize: 75,
								color: "error.main",
								margin: 1,
							}}
						/>
						<Typography
							variant="body1"
							component="p"
							sx={{
								fontWeight: 600,
							}}
						>
							Please try again later
						</Typography>
					</Box>
				</Card>
			</Grid>
		</Grid>
	);
}
