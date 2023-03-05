import { createContext, useContext, useState, useEffect } from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";
import { useRequester } from "../Apollo";
import { NOTIFICATIONS } from "./dummydata";
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
	notifications: NOTIFICATIONS,
	hideNotification: id => {},
	acknowledgeNotification: id => {},
	clearNotifications: () => {},

	WidgetIcon: states.none.Icon,
});

export const useNotifications = () => useContext(Context);
export default function NotificationsContextProvider({ children }) {
	const { enqueueSnackbar } = useSnackbar();
	const { definitions, useSubscription, useMutation } = useRequester();

	// TODO: useQuery and fetch notifications from API
	const [notifications, setNotifications] = useState(NOTIFICATIONS);
	useSubscription(definitions.notifications.subscription.notifications, {
		onError: error => {
			console.log("notifications subscription error:", { error });
			enqueueSnackbar("Error fetching notifications", {
				variant: "error",
				autoHideDuration: 5000,
			});
		},
		onData: ({ data }) => {
			console.log("notifications subscription data:", { data });
			setNotifications(data.data.notifications);
			const count = data.data.notifications.length;
			enqueueSnackbar(`New notification${count === 1 ? "" : "s"}`, {
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

	const [state, setState] = useState("active");
	const WidgetIcon = states[state].Icon;
	useEffect(() => {
		setState(notifications.length ? "active" : "none");
	}, [notifications]);

	const getClassName = () => {
		if (state === "active") return "wiggle";
		return "none";
	};

	const handleUpdateNotificationsList = notification => {
		const index = notifications.findIndex(n => n.id === notification.id);
		const newNotifications = [...notifications];
		newNotifications[index] = notification;
		setNotifications(newNotifications);
	};

	const handleRemoveIndexFromNotificationsList = index => {
		const newNotifications = [...notifications];
		newNotifications.splice(index, 1);
		setNotifications(newNotifications);
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
							console.log(
								"acknowledgeNotification mutation error:",
								{
									error,
								}
							);
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
							console.log(
								"acknowledgeNotification mutation error:",
								{
									error,
								}
							);
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
					setNotifications([]);
				},
				WidgetIcon: () => <WidgetIcon className={getClassName()} />,
			}}
		>
			{children}
		</Context.Provider>
	);
}
