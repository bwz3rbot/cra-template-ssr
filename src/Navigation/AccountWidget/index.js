import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import AccountMenu from "./Menu";
export default function AccountWidget() {
	const { user } = useAuth0();
	const location = useLocation();
	const navigate = useNavigate();
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

	const handleSetAnchorEl = e => {
		if (!menuAnchorEl) return setMenuAnchorEl(e.currentTarget);
		setMenuAnchorEl(null);
	};

	useEffect(() => {
		if (menuAnchorEl) setMenuAnchorEl(null);
	}, [location]);

	return (
		<>
			<IconButton onClick={handleSetAnchorEl}>
				<Avatar
					src={user?.picture}
					alt={user?.name}
					imgProps={{
						referrerPolicy: "no-referrer",
					}}
				>
					{user?.name?.slice(0, 1) || null}
				</Avatar>
			</IconButton>
			<AccountMenu
				anchorEl={menuAnchorEl}
				onClose={() => setMenuAnchorEl(null)}
				onSignInSuccess={() => {
					navigate("/home");
				}}
			/>
		</>
	);
}
