import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import { useAuthContext } from "../../Firebase";

export default function User() {
	const { user } = useAuthContext();

	return (
		<>
			<Card>
				<CardHeader
					avatar={
						<Avatar
							alt="User"
							src={user?.photoURL}
							sx={{
								height: 100,
								width: 100,
							}}
						/>
					}
					subheader={
						<Typography color="textSecondary" variant="body1">
							{user?.email}
						</Typography>
					}
					title={
						<Typography
							color="textPrimary"
							gutterBottom
							variant="h6"
						>
							{user?.displayName}
						</Typography>
					}
				/>
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<Typography
								color="textPrimary"
								gutterBottom
								variant="h6"
							>
								{user?.displayName}
							</Typography>
							<Typography color="textSecondary" variant="body1">
								{user?.email}
							</Typography>
						</Grid>
						<Grid item md={6} xs={12}>
							<Typography color="textSecondary" variant="body1">
								{user?.uid}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
