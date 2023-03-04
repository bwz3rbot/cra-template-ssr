import { useRequester } from "../../Apollo";
export default function SubscribeComponent() {
	const { definitions, useSubscription } = useRequester();
	const { loading, error, data } = useSubscription(
		definitions.notifications.subscription.notifications,
		{
			fetchPolicy: "network-only",
		}
	);
	console.log({
		loading,
		error,
		data,
	});

	return <>test</>;
}
