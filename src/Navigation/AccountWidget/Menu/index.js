import Avatar from "@mui/material/Avatar";
import { Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import SignInIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SignOutIcon from "@mui/icons-material/Logout";

import { useFirebaseContext } from "../../../Firebase";

import SignInDialog from "../SignInDialog";

export default function AccountMenu({ anchorEl, onClose = () => {} }) {
	const { signOut, auth, setShowingSignInDialog, username } =
		useFirebaseContext();

	return (
		<>
			<SignInDialog />
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={!!anchorEl}
				onClose={onClose}
				onClick={onClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
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
