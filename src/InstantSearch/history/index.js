import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "../algoliasearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { urlToSearchState, searchStateToUrl } from "./util";

const DEBOUNCE_TIME = 700;
export default function InstantSearchContextProvider({
	children,
	resultsState,
}) {
	const debouncedSetStateRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();

	const defaultSearchState = urlToSearchState(location);

	const [searchState, setSearchState] = useState(defaultSearchState);

	const options = {
		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		searchClient,
	};
	if (resultsState) options.resultsState = resultsState;

	useEffect(() => {
		const newSearchState = urlToSearchState(location);
		setSearchState(newSearchState);
	}, [location]);

	function onSearchStateChange(updatedSearchState) {
		clearTimeout(debouncedSetStateRef.current);

		debouncedSetStateRef.current = setTimeout(() => {
			const newState = searchStateToUrl(updatedSearchState);
			navigate(newState);
		}, DEBOUNCE_TIME);

		setSearchState(updatedSearchState);
	}
	return (
		<InstantSearch
			{...options}
			searchState={searchState}
			onSearchStateChange={onSearchStateChange}
		>
			{children}
		</InstantSearch>
	);
}
