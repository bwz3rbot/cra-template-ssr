import { useState } from "react";
import { IconButton } from "@mui/material";
import NotificationsList from "./List";
import { useNotifications } from "../../Notifications";
export default function NotificationsWidget() {
	const { WidgetIcon: NotificationsBell } = useNotifications();
	const [menuAnchorEl, setMenuAnchorEl] = useState(null);

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
				<NotificationsBell />
			</IconButton>
			<NotificationsList
				anchorEl={menuAnchorEl}
				onClose={() => setMenuAnchorEl(null)}
			/>
		</>
	);
}
