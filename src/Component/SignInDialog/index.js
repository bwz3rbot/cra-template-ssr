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
import { SignInWithGoogleIconButton } from "../../Navigation/AccountWidget/GoogleIcon";
import { useNavigate } from "react-router-dom";

export default function SignInDialog() {
	const { signInWithEmailAndPassword, createAccount } = useAuthContext();

	const navigate = useNavigate();

	const handleSuccess = () => {
		navigate("/home");
	};

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
							onSuccess: handleSuccess,
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
							onSuccess: handleSuccess,
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
					autoComplete="email"
					required
				/>
				<TextField
					label="Password"
					type="password"
					autoComplete="current-password"
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
			open
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
				<SignInWithGoogleIconButton onSuccess={handleSuccess} />
			</DialogContent>

			<DialogActions
				sx={{
					backgroundColor: "primary.main",
					height: "1rem",
				}}
			>
				{/* Empty bottom bar to fill out the component */}
			</DialogActions>
		</Dialog>
	);
}
