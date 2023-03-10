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
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { user } = useFirebaseContext();
	const [token, setToken] = useState(null);
	useMemo(() => {
		let mounted = true;
		let unsubscribe = () => {};
		const asyncEffect = async () => {
			if (!user) return;
			if (user.isAnonymous) return;
			// if we don't get a token when the user logs in
			// they will not get notifications
			const token = await getVapidToken(messaging);
			mounted && setToken(token);

			unsubscribe = onMessage(
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
		};
		asyncEffect();
		return () => {
			mounted = false;
			unsubscribe();
		};
	}, [user]);

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
