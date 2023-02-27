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
							enableLogging &&
								console.log("query cache error", { err });
						},
						onSuccess: data => {
							enableLogging &&
								console.log("query cache success", { data });
						},
					}),
					mutationCache: new MutationCache({
						onError: err => {
							enableLogging &&
								console.log("mutation cache error", { err });
						},
						onSuccess: data => {
							enableLogging &&
								console.log("mutation cache success", { data });
						},
						onMutate: data => {
							enableLogging &&
								console.log("mutation cache mutate", { data });
						},
					}),
				})
			}
		>
			{children}
		</QueryClientProvider>
	);
}
