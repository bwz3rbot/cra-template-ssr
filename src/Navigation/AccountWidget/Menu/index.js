import Avatar from "@mui/material/Avatar";
import { Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { useFirebaseContext } from "../../../Firebase";

export default function AccountMenu({ anchorEl, onClose = () => {} }) {
	const { logout, auth, loginWithGoogle } = useFirebaseContext();

	return (
		<>
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
								onClick={() => {
									loginWithGoogle();
								}}
							>
								<ListItemIcon>
									<LoginIcon fontSize="small" />
								</ListItemIcon>
								Login
							</MenuItem>
							<MenuItem>
								<ListItemIcon>
									<PersonAdd fontSize="small" />
								</ListItemIcon>
								Create Account
							</MenuItem>
						</>
					) : (
						<MenuItem>
							<Avatar
								src={auth?.currentUser?.photoURL}
								alt={
									auth?.currentUser?.displayName ||
									"Anonymous"
								}
							/>
							{auth?.currentUser?.displayName}
						</MenuItem>
					)}

					<Divider />

					<Link to="/settings">
						<MenuItem>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							Settings
						</MenuItem>
					</Link>
					<MenuItem onClick={logout}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</div>
			</Menu>
		</>
	);
}
