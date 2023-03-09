import { useSnackbar } from "notistack";
import { useEffect, useState, createContext, useContext } from "react";
import { useFirebaseContext } from "..";
import { onMessage, getToken } from "firebase/messaging";

import NotificationSnackbar from "../../Component/Notification/Snackbar";

/*
Enable messaging in Brave browser
https://stackoverflow.com/questions/42385336/google-push-notifications-domexception-registration-failed-push-service-err
*/
const requestPermission = async messaging => {
	if (!messaging) return;
	return messaging.requestPermission();
};
const hasPermission = async messaging => {
	if (!messaging) return;
	return messaging.getToken({
		vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
	});
};

const Context = createContext({
	messaging: null,
	getToken: () => {},
	requestPermission: () => {},
	hasPermission: () => {},
});

export const useMessaging = () => {
	return useContext(Context);
};

export default function MessagingContext({ children }) {
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { user, messaging } = useFirebaseContext();
	const [token, setToken] = useState();

	const getVapidToken = async messaging => {
		if (!messaging) return;
		const token = await getToken(messaging, {
			vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
		});
		return token;
	};

	useEffect(() => {
		if (token) return console.log(token);

		if (user) {
			getVapidToken(messaging).then(token => {
				setToken(token);
			});
		}
	}, [token]);

	useEffect(() => {
		const handleMessage = ({
			collapseKey,
			from,
			messageId,
			data,
			fcmOptions,
			notification,
		}) => {
			console.log("got message ", from);
			enqueueSnackbar(
				<NotificationSnackbar
					notification={{
						...notification,
					}}
				/>,
				{
					variant: data.type?.toLowerCase() || "info",
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "right",
					},
					onClick: () => {
						closeSnackbar();
					},
				}
			);
		};

		const unsubscribe = onMessage(messaging, handleMessage);
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Context.Provider
			value={{
				messaging,
				getToken: getVapidToken,
				requestPermission,
				hasPermission,
			}}
		>
			{children}
		</Context.Provider>
	);
}
