import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "../algoliasearch";
import { useLocation, useNavigate } from "react-router-dom";
import { urlToSearchState, searchStateToUrl } from "./util";

export default function InstantSearchContextProvider({
	children,
	resultsState,
}) {
	const navigate = useNavigate();
	const location = useLocation();

	const options = {
		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		searchClient,
	};
	if (resultsState) options.resultsState = resultsState;
	return (
		<InstantSearch
			{...options}
			searchState={urlToSearchState(location)}
			onSearchStateChange={updatedSearchState =>
				navigate(searchStateToUrl(updatedSearchState))
			}
		>
			{children}
		</InstantSearch>
	);
}
