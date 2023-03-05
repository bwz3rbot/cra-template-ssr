import {
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	TextField,
	FormControl,
	Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useAuthContext } from "../../Firebase";
import { GoogleIcon } from "../../Navigation/AccountWidget/GoogleIcon";

export default function SignInDialog() {
	const {
		showingSignInDialog,
		setShowingSignInDialog,
		signInWithEmailAndPassword,
		createAccount,
	} = useAuthContext();

	const LoginForm = () => {
		const { enqueueSnackbar } = useSnackbar();
		return (
			<Stack
				component="form"
				spacing={2}
				onSubmit={e => {
					e.preventDefault();
					const handleCreateAccount = () => {
						createAccount({
							email: e.target.email.value,
							password: e.target.password.value,
							onError: err => {
								enqueueSnackbar(err.message, {
									variant: "error",
								});
							},
							onSuccess: () => {
								setShowingSignInDialog(false);
							},
						});
					};
					const handleSignIn = () => {
						signInWithEmailAndPassword({
							email: e.target.email.value,
							password: e.target.password.value,
							onError: err => {
								enqueueSnackbar(err.message, {
									variant: "error",
								});
							},
							onSuccess: () => {
								setShowingSignInDialog(false);
							},
						});
					};

					const submitBtn = e.nativeEvent.submitter.name;

					if (submitBtn === "create-act-btn") {
						handleCreateAccount();
					} else {
						handleSignIn();
					}
				}}
			>
				<TextField
					variant="filled"
					size="small"
					name="email"
					label="Email"
					type="email"
					required
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					variant="filled"
					size="small"
					required
				/>
				<FormControl>
					<Button
						sx={{
							backgroundColor: "primary.main",

							"&:hover": {
								backgroundColor: "primary.dark",
							},
						}}
						type="submit"
						name="sign-in-btn"
					>
						<Typography
							sx={{
								color: "primary.contrastText",
							}}
						>
							Sign In
						</Typography>
					</Button>
					<Divider />
					<Button
						sx={{
							backgroundColor: "primary.main",
							"&:hover": {
								backgroundColor: "primary.dark",
							},
						}}
						type="submit"
						name="create-act-btn"
					>
						<Typography
							sx={{
								color: "primary.contrastText",
							}}
						>
							Create Account
						</Typography>
					</Button>
				</FormControl>
			</Stack>
		);
	};
	return (
		<Dialog
			open={showingSignInDialog}
			onClose={() => setShowingSignInDialog(false)}
			sx={{
				"& .MuiDialog-paper": {
					width: "100%",
					maxWidth: "500px",
				},
				backdropFilter: "blur(10px)",
				transition: "all 0.3s ease-in-out",
			}}
		>
			<DialogTitle
				sx={{
					backgroundColor: "primary.main",
					color: "primary.contrastText",
				}}
			>
				Sign In To {process.env.REACT_APP_SITE_NAME}
			</DialogTitle>
			<DialogContent dividers>
				<LoginForm />
			</DialogContent>
			<DialogContent
				dividers
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<GoogleIcon />
			</DialogContent>

			<DialogActions
				sx={{
					backgroundColor: "primary.main",
				}}
			>
				<Button onClick={() => setShowingSignInDialog(false)}>
					<Typography
						sx={{
							color: "primary.contrastText",
							// on hover
							"&:hover": {
								color: "action.selected",
							},
						}}
					>
						Cancel
					</Typography>
				</Button>
			</DialogActions>
		</Dialog>
	);
}