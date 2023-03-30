import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import SignInIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SignOutIcon from "@mui/icons-material/Logout";
import Menu, { Divider, ListItemIcon, MenuItem } from "../../../Component/Menu";

import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "../../../Cookies";
export default function AccountMenu({
	anchorEl,
	onClose = () => {},
	onSignInSuccess = () => {},
}) {
	const cookies = useCookies();
	const {
		user,
		logout,
		getAccessTokenWithPopup,
		getAccessTokenSilently,
		loginWithPopup,
	} = useAuth0();

	const handleSignIn = async ({ screen_hint }) => {
		// close the dialog before starting the sign in flow -
		// otherwise the menu won't open when the sign in flow is complete
		// because the menu overrides all mouse events
		onClose?.();
		await loginWithPopup({
			authorizationParams: {
				screen_hint,
			},
		});
		const { id_token } = await getAccessTokenSilently({
			detailedResponse: true,
			authorizationParams: {
				scope: "openid profile email offline_access",
			},
		});
		cookies.set("token", `Bearer ${id_token}`);

		onSignInSuccess?.();
	};

	return (
		<>
			<Menu key={user?.toString()} anchorEl={anchorEl} onClose={onClose}>
				<div>
					<div>
						{!user ? (
							<>
								<MenuItem
									onClick={() => {
										handleSignIn({ screen_hint: "login" });
									}}
								>
									<ListItemIcon>
										<SignInIcon fontSize="small" />
									</ListItemIcon>
									Sign In
								</MenuItem>
								<MenuItem
									onClick={() => {
										handleSignIn({ screen_hint: "signup" });
									}}
								>
									<ListItemIcon>
										<PersonAddIcon fontSize="small" />
									</ListItemIcon>
									Create Account
								</MenuItem>
							</>
						) : (
							<>
								<MenuItem>
									<Avatar
										src={user?.picture}
										alt={user?.name}
										imgProps={{
											referrerPolicy: "no-referrer",
										}}
									/>
									{user?.name}
								</MenuItem>
								<Divider />
							</>
						)}
					</div>

					{user && (
						<>
							<Link to="/settings">
								<MenuItem>
									<ListItemIcon>
										<SettingsIcon fontSize="small" />
									</ListItemIcon>
									Settings
								</MenuItem>
							</Link>
							<MenuItem onClick={logout}>
								<ListItemIcon>
									<SignOutIcon fontSize="small" />
								</ListItemIcon>
								Sign Out
							</MenuItem>
						</>
					)}
				</div>
			</Menu>
		</>
	);
}
