import { useContext, createContext, useState, useEffect } from "react";
import { useAuthContext } from "../Firebase";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	useLazyQuery,
	useMutation,
	useSubscription,
	useApolloClient,
} from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import definitions from "./definitions";

const Context = createContext({
	definitions,
	useQuery,
	useLazyQuery,
	useMutation,
	useSubscription,
	useApolloClient,
});

const apolloClientFactory = idToken => {
	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
		},
	});

	const wsLink = new GraphQLWsLink(
		createClient({
			url: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT,
			connectionParams: {
				authorization: idToken ? `Bearer ${idToken}` : "",
			},
		})
	);
	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		httpLink
	);
	const client = new ApolloClient({
		link: splitLink,
		cache: new InMemoryCache(),
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
		},
	});
	return client;
};
export default function ApolloAppContextProvider({ children }) {
	const { idToken, isAuthenticated } = useAuthContext();
	const [state, setState] = useState({
		client: apolloClientFactory("initializing"),
		state: "loading",
	});

	useEffect(() => {
		let mounted = true;
		if (idToken) {
			console.log("creating new client");
			const newClient = apolloClientFactory(idToken);
			if (mounted) {
				console.log("setting client to the state");
				setState({
					client: newClient,
					state: "ready",
				});
			}
		}
		return () => {
			mounted = false;
		};
	}, [isAuthenticated]);

	return (
		<Context.Provider
			value={{
				definitions,
				useQuery,
				useLazyQuery,
				useMutation,
				useSubscription,
				useApolloClient,
			}}
		>
			<ApolloProvider client={state.client}>{children}</ApolloProvider>
		</Context.Provider>
	);
}

export const useRequester = () => useContext(Context);
