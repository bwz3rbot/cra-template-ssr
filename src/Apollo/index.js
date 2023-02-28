import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
const client = new ApolloClient({
	uri:
		process.env.REACT_APP_GQL_ENDPOINT ||
		"https://flyby-router-demo.herokuapp.com/",
	cache: new InMemoryCache(),
});

export default function ApolloAppContextProvider({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
