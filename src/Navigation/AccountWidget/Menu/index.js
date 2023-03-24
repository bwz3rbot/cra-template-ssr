import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

import SignInIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SignOutIcon from "@mui/icons-material/Logout";
import Menu, { Divider, ListItemIcon, MenuItem } from "../../../Component/Menu";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../Auth";

export default function AccountMenu({ anchorEl, onClose = () => {} }) {
	const { signOut, user } = useAuthContext();

	const navigate = useNavigate();
	const setShowingSignInDialog = () => {
		navigate("/signin");
	};

	return (
		<>
			<Menu key={user?.toString()} anchorEl={anchorEl} onClose={onClose}>
				<div>
					<div>
						{user?.isAnonymous ? (
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
							<>
								<MenuItem>
									<Avatar
										src={user?.photoURL}
										alt={user?.username || "Anonymous"}
										imgProps={{
											referrerPolicy: "no-referrer",
										}}
									/>
									{user?.username}
								</MenuItem>
								<Divider />
							</>
						)}
					</div>

					{!user?.isAnonymous && (
						<>
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
						</>
					)}
				</div>
			</Menu>
		</>
	);
}
