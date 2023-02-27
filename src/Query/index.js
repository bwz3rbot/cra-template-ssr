import {
	QueryClientProvider,
	QueryClient,
	QueryCache,
	MutationCache,
} from "react-query";

export default function QueryClientContextProvider({
	children,
	enableLogging = false,
}) {
	const log = (type, data) => {
		enableLogging && console.log(type, data);
	};

	return (
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
							cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
						},
						mutations: {
							staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
							cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
						},
					},
					queryCache: new QueryCache({
						onError: err => {
							log("query cache error", { err });
						},
						onSuccess: data => {
							log("query cache success", { data });
						},
					}),
					mutationCache: new MutationCache({
						onError: err => {
							log("mutation cache error", { err });
						},
						onSuccess: data => {
							log("mutation cache success", { data });
						},
						onMutate: data => {
							log("mutation cache mutate", { data });
						},
					}),
				})
			}
		>
			{children}
		</QueryClientProvider>
	);
}
