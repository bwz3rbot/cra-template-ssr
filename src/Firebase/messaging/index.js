import { useSnackbar } from "notistack";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
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
const getVapidToken = async messaging => {
	if (!messaging) return console.log("no messaging!");
	return getToken(messaging, {
		vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
	});
};

const Context = createContext({
	messaging: null,
	token: null,
	getToken: getVapidToken,
	requestPermission,
});

export default function MessagingContext({ children }) {
	let mounted = true;
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { user, messaging } = useFirebaseContext();
	const [token, setToken] = useState(null);

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
	}, [messaging]);

	useMemo(() => {
		const asyncEffect = async () => {
			if (!user) return;
			// if we don't get a token when the user logs in
			// they will not get notifications
			const token = await getVapidToken(messaging);
			mounted && setToken(token);
		};
		asyncEffect();
		return () => {
			mounted = false;
		};
	}, [user]);

	return (
		<Context.Provider
			value={{
				messaging,
				token,
				getToken: getVapidToken,
				requestPermission,
			}}
		>
			{children}
		</Context.Provider>
	);
}
export const useMessaging = () => {
	return useContext(Context);
};
