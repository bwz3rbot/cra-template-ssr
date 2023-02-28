import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import SignInIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SignOutIcon from "@mui/icons-material/Logout";
import { useFirebaseContext } from "../../../Firebase";

import Menu, { Divider, ListItemIcon, MenuItem } from "../../../Component/Menu";

export default function AccountMenu({ anchorEl, onClose = () => {} }) {
	const { signOut, auth, setShowingSignInDialog, username } =
		useFirebaseContext();

	return (
		<>
			<Menu anchorEl={anchorEl} onClose={onClose}>
				<div>
					{auth?.currentUser?.isAnonymous ? (
						<>
							<MenuItem
								onClick={() => setShowingSignInDialog(true)}
							>
								<ListItemIcon>
									<SignInIcon fontSize="small" />
								</ListItemIcon>
								Sign In
							</MenuItem>
							<MenuItem
								onClick={() => setShowingSignInDialog(true)}
							>
								<ListItemIcon>
									<PersonAddIcon fontSize="small" />
								</ListItemIcon>
								Create Account
							</MenuItem>
						</>
					) : (
						<MenuItem>
							<Avatar
								src={auth?.currentUser?.photoURL}
								alt={username || "Anonymous"}
								imgProps={{
									referrerPolicy: "no-referrer",
								}}
							/>
							{username}
						</MenuItem>
					)}

					<Divider />

					<Link to="/settings">
						<MenuItem>
							<ListItemIcon>
								<SettingsIcon fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
					</Link>
					<MenuItem onClick={signOut}>
						<ListItemIcon>
							<SignOutIcon fontSize="small" />
						</ListItemIcon>
						Sign Out
					</MenuItem>
				</div>
			</Menu>
		</>
	);
}
