import { Grid, Box, Card, Typography } from "@mui/material";
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
				<Card>
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
