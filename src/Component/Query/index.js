import { useRequester } from "../../Apollo";
export default function QueryComponent() {
	const { definitions, useQuery } = useRequester();
	const { loading, error, data } = useQuery(definitions.user.query.getUser, {
		fetchPolicy: "network-only",
	});
	console.log({
		loading,
		error,
		data,
	});

	return <>test</>;
}
