import { useState } from "react";
import { IconButton } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
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
				onClick={() => {
					if (state === "off") handleSetStateNone();
					if (state === "none") handleSetStateOff();
				}}
			>
				<NotificationsIcon
					className={`${state === "active" ? "wiggle" : "none"}`}
				/>
			</IconButton>
		</>
	);
}
