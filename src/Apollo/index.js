import { useContext, createContext } from "react";
import { useFirebaseContext } from "../Firebase";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	useLazyQuery,
	useMutation,
	useApolloClient,
} from "@apollo/client";

import definitions from "./definitions";

const Context = createContext({
	definitions,
	useQuery,
	useLazyQuery,
	useMutation,
	useApolloClient,
});
export default function ApolloAppContextProvider({ children }) {
	const { idToken } = useFirebaseContext();
	const client = new ApolloClient({
		uri: process.env.REACT_APP_GQL_ENDPOINT,
		cache: new InMemoryCache(),
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
		},
	});
	return (
		<ApolloProvider client={client}>
			<Context.Provider
				value={{
					definitions,
					useQuery,
					useLazyQuery,
					useMutation,
					useApolloClient,
				}}
			>
				{children}
			</Context.Provider>
		</ApolloProvider>
	);
}

export const useRequester = () => useContext(Context);
