import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFirebaseContext } from "..";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import NotificationSnackbar from "../../Component/Notification/Snackbar";
/*
Enable messaging in Brave browser
https://stackoverflow.com/questions/42385336/google-push-notifications-domexception-registration-failed-push-service-err
*/

export const useMessaging = () => {
	let mounted = true;
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { app, user } = useFirebaseContext();

	const [messaging, setMessaging] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);

	const getVapidToken = async messaging => {
		if (!messaging) return;
		const token = await getToken(messaging, {
			vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
		});

		return token;
	};
	const requestPermission = async messaging => {
		if (!messaging) return;
		console.log("requesting permission");
		return messaging.requestPermission();
	};

	const handleConfigureMessaging = async app => {
		const gcm = getMessaging(app);

		onMessage(
			gcm,
			({
				collapseKey,
				from,
				messageId,
				data,
				fcmOptions,
				notification,
			}) => {
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
			}
		);

		const token = await getVapidToken(gcm);
		mounted &&
			setCurrentUser({
				...user,
				token,
			});
		console.log("current user vapid token:");
		console.log(token);
		mounted && setMessaging(gcm);
	};

	useEffect(() => {
		console.log("handling messaging", { app, messaging });
		if (!app) return console.log("no app - returning");
		if (user === currentUser) return console.log("same user - returning");

		const asyncEffect = async () => {
			await handleConfigureMessaging();
		};
		asyncEffect();
		return () => {
			mounted = false;
		};
	}, [user]);

	return {
		messaging,
		getToken: getVapidToken,
		requestPermission,
	};
};

export default function MessagingContext({ children }) {
	useMessaging();
	return <>{children}</>;
}
