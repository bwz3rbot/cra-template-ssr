import { useEffect, useState } from "react";
import {
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	IconButton,
	Typography,
	TextField,
	FormControl,
	Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { useFirebaseContext } from "../../../Firebase";
import { GoogleIcon } from "../GoogleIcon";

export default function SignInDialog() {
	const {
		showingSignInDialog,
		setShowingSignInDialog,
		signInWithEmailAndPassword,
		createAccount,
		username,
	} = useFirebaseContext();

	const LoginForm = () => {
		const { enqueueSnackbar } = useSnackbar();
		return (
			<Stack
				component="form"
				spacing={2}
				onSubmit={e => {
					e.preventDefault();

					console.log(e.target.email.value);

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
					<Button type="submit" name="sign-in-btn">
						Log In
					</Button>
					<Divider />
					<Button type="submit" name="create-act-btn">
						Create Account
					</Button>
				</FormControl>
			</Stack>
		);
	};
	return (
		<Dialog
			open={showingSignInDialog}
			onClose={() => setShowingSignInDialog(false)}
		>
			<DialogTitle>
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

			<DialogActions>
				<Button onClick={() => setShowingSignInDialog(false)}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
}
