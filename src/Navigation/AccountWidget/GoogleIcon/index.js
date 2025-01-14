import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
const states = {
	sm: {
		dark: {
			disabled: require("./png/1x/dark/disabled.png"),
			focus: require("./png/1x/dark/focus.png"),
			normal: require("./png/1x/dark/normal.png"),
			pressed: require("./png/1x/dark/pressed.png"),
		},
		light: {
			disabled: require("./png/1x/light/disabled.png"),
			focus: require("./png/1x/light/focus.png"),
			normal: require("./png/1x/light/normal.png"),
			pressed: require("./png/1x/light/pressed.png"),
		},
	},
	lg: {
		dark: {
			disabled: require("./png/2x/dark/disabled.png"),
			focus: require("./png/2x/dark/focus.png"),
			normal: require("./png/2x/dark/normal.png"),
			pressed: require("./png/2x/dark/pressed.png"),
		},
		light: {
			disabled: require("./png/2x/light/disabled.png"),
			focus: require("./png/2x/light/focus.png"),
			normal: require("./png/2x/light/normal.png"),
			pressed: require("./png/2x/light/pressed.png"),
		},
	},
};

export const SignInWithGoogleIconButton = ({
	onSuccess: onSignInSuccess = () => {},
}) => {
	const { loginWithPopup } = useAuth0();
	const theme = useTheme();
	const isLg = useMediaQuery(theme => theme.breakpoints.up("lg"));

	const breakpoint = isLg ? "lg" : "sm";

	const [state, setState] = useState("normal");

	const src = states[breakpoint][theme.palette.mode][state];

	return (
		<div
			onMouseDown={() => {
				setState("pressed");
			}}
			onMouseEnter={() => {
				setState("focus");
			}}
			onMouseUp={() => {
				setState("focus");
			}}
			onMouseLeave={() => {
				setState("normal");
			}}
			onClick={
				async () => {
					await loginWithPopup({
						authorizationParams: {
							prompt: "select_account",
						},
					});
					onSignInSuccess();
				}
				// signInWithGoogle({
				// 	onSuccess: () => {
				// 		setShowingSignInDialog(false);
				// 		onSignInSuccess();
				// 	},
				// })
			}
		>
			<img src={src} alt="Google" />
		</div>
	);
};
