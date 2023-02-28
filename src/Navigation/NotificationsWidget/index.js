import { useState } from "react";
import { IconButton } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import NotificationsList from "./List";
import "./style.css";

const states = {
	none: { name: "none", Icon: NotificationsNoneRoundedIcon },
	active: {
		name: "active",
		Icon: NotificationsActiveRoundedIcon,
	},
	off: { name: "off", Icon: NotificationsOffRoundedIcon },
};

export default function NotificationsWidget() {
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const [state, setState] = useState("none");
	const handleSetStateNone = () => setState("none");
	const handleSetStateOff = () => setState("off");
	const handleSetStateActive = () => setState("active");

	const NotificationsIcon = states[state].Icon;

	return (
		<>
			<IconButton
				focusRipple={false}
				sx={{
					color: "primary.contrastText",
				}}
				onClick={e => {
					if (!menuAnchorEl) return setMenuAnchorEl(e.currentTarget);
					setMenuAnchorEl(null);
				}}
			>
				<NotificationsIcon
					className={`${state === "active" ? "wiggle" : "none"}`}
				/>
			</IconButton>
			<NotificationsList
				anchorEl={menuAnchorEl}
				onClose={() => setMenuAnchorEl(null)}
			/>
		</>
	);
}
