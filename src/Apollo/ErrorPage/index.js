import { Grid, Box, Card, Typography } from "@mui/material";
import LayoutStandard from "../../Layout/Standard";
export default function ApolloClientConnectionErrorPage() {
	return (
		<LayoutStandard>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Card>
						<Box p={2}>
							<Typography variant="h4" component="h1">
								Error connecting to Apollo Client
							</Typography>
							<Typography variant="body1" component="p">
								Please check your internet connection and try
								again.
							</Typography>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</LayoutStandard>
	);
}
