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
	});

	const wsLink = new GraphQLWsLink(
		createClient({
			url: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT,
			connectionParams: {
				authorization: idToken ? `Bearer ${idToken}` : "",
				workspace_id,
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
		credentials: "include",
		headers: {
			authorization: idToken ? `Bearer ${idToken}` : "",
			workspace_id,
		},
	});
	return client;
};
export default function ApolloAppContextProvider({ children }) {
	const { user: appUser } = useAuthContext();
	const [clientState, setClientState] = useState({
		client: apolloClientFactory(appUser?.idToken || ""),
		status: "loading",
		user: null,
	});

	useEffect(() => {
		let mounted = true;
		if (appUser?.idToken) {
			const newClient = apolloClientFactory(appUser.idToken);
			if (mounted) {
				setClientState({
					client: newClient,
					status: "ready",
				});
			}
		}
		return () => {
			mounted = false;
		};
	}, [appUser]);

	useEffect(() => {
		let mounted = true;
		if (!appUser) return;
		if (clientState.status !== "ready") return;
		const asyncEffect = async () => {
			const { data } = await clientState.client.query({
				query: definitions.user.query.getUser,
			});

			if (!mounted) return;
			setClientState({
				...clientState,
				user: data.user,
			});
		};
		asyncEffect();

		return () => {
			mounted = false;
		};
	}, [clientState.status, appUser]);

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
			<ApolloProvider client={clientState.client}>
				{clientState?.status === "ready" && children}
			</ApolloProvider>
		</Context.Provider>
	);
}

export const useRequester = () => useContext(Context);
