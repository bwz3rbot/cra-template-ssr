import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "./algoliasearch";
export default function InstantSearchContextProvider({
	children,
	resultsState,
	searchState,
}) {
	let options = {
		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		searchClient,
	};
	if (resultsState) options.resultsState = resultsState;
	if (searchState) options.searchState = searchState;
	return <InstantSearch {...options}>{children}</InstantSearch>;
}
