import { createContext, useContext, useState, useEffect } from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import { NOTIFICATIONS } from "./dummydata";

import "./style.css";

const states = {
	none: { name: "none", Icon: NotificationsNoneRoundedIcon },
	active: {
		name: "active",
		Icon: NotificationsActiveRoundedIcon,
	},
	off: { name: "off", Icon: NotificationsOffRoundedIcon },
};
const Context = createContext({
	notifications: NOTIFICATIONS,
	hideNotification: id => {},
	clearNotifications: () => {},

	WidgetIcon: states.none.Icon,
});

export const useNotifications = () => useContext(Context);
export default function NotificationsContextProvider({ children }) {
	const [notifications, setNotifications] = useState(NOTIFICATIONS);
	const [state, setState] = useState("active");
	const WidgetIcon = states[state].Icon;
	useEffect(() => {
		setState(notifications.length ? "active" : "none");
	}, [notifications]);

	const getClassName = () => {
		if (state === "active") return "wiggle";
		return "none";
	};

	return (
		<Context.Provider
			value={{
				notifications,
				hideNotification: id => {
					setNotifications(notifications.filter(n => n.id !== id));
				},
				clearNotifications: () => setNotifications([]),
				WidgetIcon: () => <WidgetIcon className={getClassName()} />,
			}}
		>
			{children}
		</Context.Provider>
	);
}
