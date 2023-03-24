import { useContext, createContext, useState, useEffect } from "react";
import { useAuthContext } from "../Auth";
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
import LoadingScreen from "../Component/LoadingScreen";

import { createClient } from "graphql-ws";
import fetch from "cross-fetch";
import ws from "ws";

import definitions from "./definitions";

const Context = createContext({
	user: null,
	definitions,
	useQuery,
	useLazyQuery,
	useMutation,
	useSubscription,
	useApolloClient,
});

const apolloClientFactory = (idToken, workspace_id = "default") => {
	const httpLink = new HttpLink({
		uri: process.env.REACT_APP_API_ENDPOINT,
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
			workspace_id,
		},
		fetch,
	});

	const wsLink = new GraphQLWsLink(
		createClient({
			url: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT,
			connectionParams: {
				authorization: idToken ? `Bearer ${idToken}` : "",
				workspace_id,
			},
			webSocketImpl: typeof window === "undefined" ? ws : null,
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
		credentials: "include",
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
			workspace_id,
		},
	});
	return client;
};
export default function ApolloAppContextProvider({ children }) {
	let mounted = true;

	const { user } = useAuthContext();

	const [clientState, setClientState] = useState({
		client: apolloClientFactory(),
		user: null,
		status: "loading",
	});

	useEffect(() => {
		if (!user) return;
		// creates a new apollo client when new firebase auth context is available
		const asyncEffect = async () => {
			const token = await user.getIdToken();
			const newClient = apolloClientFactory(token);

			mounted &&
				setClientState({
					client: newClient,
					status: "ready",
				});
		};
		asyncEffect();
		return () => {
			mounted = false;
		};
	}, [user]);

	return (
		<Context.Provider
			value={{
				user: clientState.user,
				definitions,
				useQuery,
				useLazyQuery,
				useMutation,
				useSubscription,
				useApolloClient,
			}}
		>
			<ApolloProvider
				// ensure context re-renders when user changes
				key={user?.uid}
				client={clientState.client}
			>
				{children}
			</ApolloProvider>
		</Context.Provider>
	);
}

export const useRequester = () => useContext(Context);
