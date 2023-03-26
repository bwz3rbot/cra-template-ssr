import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
	Button,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useRequester } from "../../Apollo";
import { calculateDateSinceTimestamp } from "../../util/calculateDateSinceTimestamp";
import { useSnackbar } from "notistack";

import depthEffect from "../../Theme/sx/depth-effect";

export default function User() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { user } = useAuth0();

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const isEmailVerified = user?.emailVerified;
	const userCreatedDate = new Date(user?.updated_at);
	const userCreatedDateSince = calculateDateSinceTimestamp(
		userCreatedDate.getTime()
	);
	const lastLoginDate = new Date(user?.updated_at);
	const lastLoginDateSince = calculateDateSinceTimestamp(
		lastLoginDate.getTime()
	);

	console.log("rendering user with user: ", user);
	const section = [
		[
			{
				label: "User Created",
				value: `${userCreatedDateSince} ago`,
			},

			{
				label: "Last Login",
				value: `${lastLoginDateSince} ago`,
			},
		],
		[
			{
				label: "Email Verified",
				value: isEmailVerified ? (
					"Yes"
				) : (
					<Button
					// onClick={() => {
					// 	sendEmailVerification({
					// 		onSuccess: () => {
					// 			enqueueSnackbar("Email verification sent", {
					// 				variant: "success",
					// 				autoHideDuration: 5000,
					// 				onClick: () => {
					// 					closeSnackbar();
					// 				},
					// 			});
					// 		},
					// 		onError: () => {
					// 			enqueueSnackbar(
					// 				"Email verification failed",
					// 				{
					// 					variant: "error",
					// 					autoHideDuration: 5000,

					// 					onClick: () => {
					// 						closeSnackbar();
					// 					},
					// 				}
					// 			);
					// 		},
					// 	});
					// }}
					>
						Click to verify
					</Button>
				),
			},
			{
				label: "Time Zone",
				value: timeZone,
			},
		],
	];

	if (false) {
		section.push([
			{
				label: "Reset Password",
				value: (
					<Button
					// onClick={() => {
					// 	sendPasswordResetEmail({
					// 		onSuccess: () => {
					// 			enqueueSnackbar(
					// 				"Password reset email sent",
					// 				{
					// 					variant: "success",
					// 					autoHideDuration: 5000,
					// 					onClick: () => {
					// 						closeSnackbar();
					// 					},
					// 				}
					// 			);
					// 		},
					// 		onError: () => {
					// 			enqueueSnackbar(
					// 				"Password reset email failed",
					// 				{
					// 					variant: "error",
					// 					autoHideDuration: 5000,
					// 					onClick: () => {
					// 						closeSnackbar();
					// 					},
					// 				}
					// 			);
					// 		},
					// 	});
					// }}
					>
						Click to reset
					</Button>
				),
			},
		]);
	}
	return (
		<>
			<Card
				sx={{
					...depthEffect(),
					maxWidth: 500,
					height: "fit-content",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							alt="User"
							src={user?.picture}
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
					<Grid container spacing={2}>
						{section.map((section, i) => (
							<Grid item key={i} xs={12} sm={6}>
								<Grid container spacing={2}>
									{section.map((item, i) => (
										<Grid item key={i} xs={12}>
											<Typography
												color="textSecondary"
												gutterBottom
												variant="body2"
											>
												{item.label}
											</Typography>
											<Typography
												color="textPrimary"
												variant="h6"
											>
												{item.value}
											</Typography>
										</Grid>
									))}
								</Grid>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
