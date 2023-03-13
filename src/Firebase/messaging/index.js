import { useSnackbar } from "notistack";
import { useState, createContext, useContext, useMemo } from "react";
import { useFirebaseContext, messaging } from "..";
import { onMessage, getToken } from "firebase/messaging";

import NotificationSnackbar from "../../Component/Notification/Snackbar";

/*
Enable messaging in Brave browser
https://stackoverflow.com/questions/42385336/google-push-notifications-domexception-registration-failed-push-service-err
*/

const getVapidToken = async messaging => {
	if (!messaging) return;
	return getToken(messaging, {
		vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
	});
};

const Context = createContext({
	token: null,
	getToken: getVapidToken,
});

export default function MessagingContext({ children }) {
	let mounted = true;
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { user } = useFirebaseContext();
	const [token, setToken] = useState(null);

	useMemo(() => {
		if (!messaging) return;
		const unsubscribe = onMessage(
			messaging,
			({
				collapseKey,
				from,
				messageId,
				data,
				fcmOptions,
				notification,
			}) => {
				enqueueSnackbar(
					<NotificationSnackbar notification={notification} />,
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
			}
		);
		return () => {
			mounted = false;
			unsubscribe();
		};
	}, [messaging]);

	useMemo(() => {
		if (!user) return;

		const asyncEffect = async () => {
			// if we don't get a token when the user logs in
			// they will not get notifications
			const token = await getVapidToken(messaging).catch(err => {
				console.log("Error fetching token: ", err);
			});
			mounted && setToken(token);
		};
		asyncEffect();

		return () => {
			mounted = false;
		};
	}, [user?.uid]);

	return (
		<Context.Provider
			value={{
				token,
				getToken: getVapidToken,
			}}
		>
			{children}
		</Context.Provider>
	);
}
export const useMessaging = () => {
	return useContext(Context);
};
