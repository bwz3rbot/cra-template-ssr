import { useLocation } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { useFirebaseContext } from "../../Firebase/index";
import { useState, useEffect } from "react";
import AccountMenu from "./Menu";
export default function AccountWidget() {
	const { auth, username } = useFirebaseContext();
	const location = useLocation();
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

	const setAnchorEl = e => setMenuAnchorEl(e.currentTarget);

	useEffect(() => {
		if (menuAnchorEl) setMenuAnchorEl(null);
	}, [location]);

	return (
		<>
			<IconButton onClick={setAnchorEl}>
				<Avatar
					src={auth?.currentUser?.photoURL}
					alt={username || "Anonymous"}
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
