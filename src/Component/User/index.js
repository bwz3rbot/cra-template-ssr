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
import { useRequester } from "../../Apollo";

export default function User() {
	const { user } = useAuthContext();
	const { user: appUser } = useRequester();

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
						<Grid item xs={12}>
							<Typography color="textSecondary" variant="body1">
								Firebase ID:{user?.uid}
							</Typography>
							<Typography color="textSecondary" variant="body1">
								User ID:{appUser?.id}
							</Typography>
							<Typography color="textSecondary" variant="body1">
								User ID and FirebaseUID match?{" "}
								{user?.uid === appUser?.id ? "Yes" : "No"}
							</Typography>
							{/* TODO: debug why Firebase ID and
							UID don't match when signing out until the page is refreshed */}
							<Typography color="textSecondary" variant="body1">
								Workspace ID:{appUser?.workspace.id}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
