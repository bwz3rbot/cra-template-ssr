import { useContext, createContext } from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	useLazyQuery,
	useMutation,
	useSubscription,
	useApolloClient,
	ApolloLink,
} from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import { createClient } from "graphql-ws";
import fetch from "cross-fetch";
import ws from "ws";
import { setContext } from "@apollo/client/link/context";
import { useCookies } from "../Cookies";

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

export default function ApolloAppContextProvider({ children }) {
	const cookies = useCookies();
	const getAuth = () => {
		return {
			Authorization: cookies.get("token"),
			Workspace: cookies.get("workspace"),
		};
	};

	const client = new ApolloClient({
		cache: new InMemoryCache(), // TODO: add cache config
		link: new ApolloLink.from([
			setContext((_, { headers }) => {
				return {
					headers: {
						...headers,
						...getAuth(cookies),
					},
				};
			}),
			split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return (
						definition.kind === "OperationDefinition" &&
						definition.operation === "subscription"
					);
				},
				new GraphQLWsLink(
					createClient({
						url: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT,

						connectionParams: (
							operation,
							previousConnectionParams
						) => {
							return {
								...previousConnectionParams,
								...getAuth(cookies),
							};
						},
						webSocketImpl:
							typeof window === "undefined" ? ws : null,
					})
				),
				new HttpLink({
					uri: process.env.REACT_APP_API_ENDPOINT,
					fetch,
				})
			),
		]),
		queryDeduplication: true,
	});

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
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</Context.Provider>
	);
}

export const useRequester = () => useContext(Context);
