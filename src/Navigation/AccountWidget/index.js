import { Avatar, IconButton } from "@mui/material";
import { useFirebaseContext } from "../../Firebase/index";
import { useState } from "react";
import AccountMenu from "./Menu";
export default function AccountWidget() {
	const { auth, username } = useFirebaseContext();
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

	const setAnchorEl = e => setMenuAnchorEl(e.currentTarget);

	return (
		<>
			<IconButton onClick={setAnchorEl}>
				<Avatar
					src={auth?.currentUser?.photoURL}
					alt={username || "Anonymous"}
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
