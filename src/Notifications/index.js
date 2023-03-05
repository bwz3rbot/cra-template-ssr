import { createContext, useContext, useState, useEffect } from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import { Typography } from "@mui/material";
import { useRequester } from "../Apollo";
import { useSnackbar } from "notistack";

import "./style.css";

export { NotificationsWidget } from "./Widget";

const states = {
	none: { name: "none", Icon: NotificationsNoneRoundedIcon },
	active: {
		name: "active",
		Icon: NotificationsActiveRoundedIcon,
	},
	off: { name: "off", Icon: NotificationsOffRoundedIcon },
};
const Context = createContext({
	notifications: [],
	hideNotification: id => {},
	acknowledgeNotification: id => {},
	clearNotifications: () => {},

	WidgetIcon: states.none.Icon,
});
const dedupe = arr =>
	arr.filter((v, i) => arr.findIndex(t => t.id === v.id) === i);
const getClassName = state => {
	if (state === "active") return "wiggle";
	return "none";
};
export const useNotifications = () => useContext(Context);
export default function NotificationsContextProvider({ children }) {
	/* Notifications State */
	const [notifications, setNotifications] = useState([]);
	const handleSetNotifications = notifications => {
		setNotifications(dedupe(notifications));
	};

	/* Widget Icon Wiggle State */
	const [iconState, setIconState] = useState("active");
	const Icon = states[iconState].Icon;
	const WidgetIcon = () => <Icon className={getClassName(iconState)} />;
	useEffect(() => {
		setIconState(notifications.length ? "active" : "none");
	}, [notifications]);

	/* Subscribe To Notifications */
	const { enqueueSnackbar } = useSnackbar();
	const { definitions, useSubscription, useMutation } = useRequester();

	const [initialized, setInitialized] = useState(false);
	useSubscription(definitions.notifications.subscription.notifications, {
		onError: error => {
			console.log("notifications subscription error:", { error });
			enqueueSnackbar("Error fetching notifications", {
				variant: "error",
				autoHideDuration: 5000,
			});
		},
		onData: ({ data }) => {
			const newNotifications = [...notifications];
			newNotifications.unshift(...data.data.notifications);
			if (newNotifications.length > 25) newNotifications.length = 25;
			handleSetNotifications(newNotifications);
			const count = data.data.notifications.length;

			// only show snackbar after first render
			let hasBeenInitialized = initialized;
			setInitialized(true);
			if (count === 0) return;
			if (hasBeenInitialized)
				enqueueSnackbar(<Typography>New notification</Typography>, {
					autoHideDuration: 5000,
				});
		},
	});

	const [acknowledge] = useMutation(
		definitions.notifications.mutation.acknowledge,
		{
			onError: error => {
				console.log("acknowledgeNotification mutation error:", {
					error,
				});
				enqueueSnackbar("Error acknowledging notification", {
					variant: "error",
					autoHideDuration: 5000,
				});
			},
			onCompleted: data => {
				console.log("acknowledgeNotification mutation completed:", {
					data,
				});
				enqueueSnackbar("Notification acknowledged", {
					variant: "success",
					autoHideDuration: 5000,
				});
			},
		}
	);
	const [hide] = useMutation(definitions.notifications.mutation.hide, {
		onError: error => {
			console.log("acknowledgeNotification mutation error:", { error });
			enqueueSnackbar("Error acknowledging notification", {
				variant: "error",
				autoHideDuration: 5000,
			});
		},
		onCompleted: data => {
			console.log("acknowledgeNotification mutation completed:", {
				data,
			});
			enqueueSnackbar("Notification acknowledged", {
				variant: "success",
				autoHideDuration: 5000,
			});
		},
	});

	const handleUpdateNotificationsList = notification => {
		const index = notifications.findIndex(n => n.id === notification.id);
		const newNotifications = [...notifications];
		newNotifications[index] = notification;
		handleSetNotifications(newNotifications);
	};

	const handleRemoveIndexFromNotificationsList = index => {
		const newNotifications = [...notifications];
		newNotifications.splice(index, 1);
		handleSetNotifications(newNotifications);
	};

	return (
		<Context.Provider
			value={{
				notifications,
				hideNotification: async id => {
					// TODO: call API to hide notification
					await hide({
						variables: {
							input: {
								id,
							},
						},
						onCompleted: data => {
							handleRemoveIndexFromNotificationsList(
								data.notification_hide.notification
							);
						},
						onError: error => {
							enqueueSnackbar(
								"Error acknowledging notification",
								{
									variant: "error",
									autoHideDuration: 5000,
								}
							);
						},
					});
				},
				acknowledgeNotification: async id => {
					// TODO: call API to acknowledge notification
					await acknowledge({
						variables: {
							input: {
								id,
							},
						},
						onCompleted: data => {
							handleUpdateNotificationsList(
								data.notification_acknowledge.notification
							);
						},
						onError: error => {
							enqueueSnackbar(
								"Error acknowledging notification",
								{
									variant: "error",
									autoHideDuration: 5000,
								}
							);
						},
					});
				},
				clearNotifications: async () => {
					// TODO: call API to clear all notifications
					handleSetNotifications([]);
				},
				WidgetIcon,
			}}
		>
			{children}
		</Context.Provider>
	);
}
