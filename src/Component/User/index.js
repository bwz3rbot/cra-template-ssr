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
import { useAuthContext } from "../../Firebase";
import { useRequester } from "../../Apollo";
import { calculateDateSinceTimestamp } from "../../util/calculateDateSinceTimestamp";
import { useSnackbar } from "notistack";

import depthEffect from "../../Theme/sx/depth-effect";

export default function User() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { user, sendEmailVerification, sendPasswordResetEmail } =
		useAuthContext();
	const { user: appUser } = useRequester();

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	console.log({
		user,
		timeZone,
	});
	const isEmailVerified = user?.emailVerified;
	const userCreatedDate = new Date(user?.metadata.creationTime);
	const userCreatedDateSince = calculateDateSinceTimestamp(
		userCreatedDate.getTime()
	);
	const lastLoginDate = new Date(user?.metadata.lastSignInTime);
	const lastLoginDateSince = calculateDateSinceTimestamp(
		lastLoginDate.getTime()
	);

	const shouldAllowResetPassword = () => {
		user.providerData.forEach(profile => {
			console.log({ profile });
			if (profile.providerId === "password") {
				return true;
			}
		});
	};
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
						onClick={() => {
							sendEmailVerification({
								onSuccess: () => {
									enqueueSnackbar("Email verification sent", {
										variant: "success",
										autoHideDuration: 5000,
										onClick: () => {
											closeSnackbar();
										},
									});
								},
								onError: () => {
									enqueueSnackbar(
										"Email verification failed",
										{
											variant: "error",
											autoHideDuration: 5000,

											onClick: () => {
												closeSnackbar();
											},
										}
									);
								},
							});
						}}
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

	if (shouldAllowResetPassword()) {
		section.push([
			{
				label: "Reset Password",
				value: (
					<Button
						onClick={() => {
							sendPasswordResetEmail({
								onSuccess: () => {
									console.log("handling success");
									enqueueSnackbar(
										"Password reset email sent",
										{
											variant: "success",
											autoHideDuration: 5000,
											onClick: () => {
												closeSnackbar();
											},
										}
									);
								},
								onError: () => {
									console.log("handling error");
									enqueueSnackbar(
										"Password reset email failed",
										{
											variant: "error",
											autoHideDuration: 5000,
											onClick: () => {
												closeSnackbar();
											},
										}
									);
								},
							});
						}}
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
				}}
			>
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
