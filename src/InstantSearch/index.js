import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "./algoliasearch";
export default function InstantSearchContextProvider({
	children,
	resultsState,
}) {
	let options = {
		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		searchClient,
	};
	if (resultsState) {
		options = {
			...options,
			resultsState,
		};
	}
	return <InstantSearch {...options}>{children}</InstantSearch>;
}
