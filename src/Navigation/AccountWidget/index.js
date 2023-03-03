import { useLocation } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { useAuthContext } from "../../Firebase/index";
import { useState, useEffect } from "react";
import AccountMenu from "./Menu";
export default function AccountWidget() {
	const { username, user } = useAuthContext();
	const location = useLocation();
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
					src={user?.photoURL}
					alt={username || "Anonymous User"}
					imgProps={{
						referrerPolicy: "no-referrer",
					}}
				>
					{username?.slice(0, 1) || null}
				</Avatar>
			</IconButton>
			<AccountMenu
				anchorEl={menuAnchorEl}
				onClose={() => setMenuAnchorEl(null)}
			/>
		</>
	);
}
