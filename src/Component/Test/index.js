import { useRequester } from "../../Apollo";
export default function TestComponent() {
	const { definitions, useQuery } = useRequester();
	const { loading, error, data } = useQuery(definitions.user.getUser);
	console.log({
		loading,
		error,
		data,
	});

	return <>test</>;
}
