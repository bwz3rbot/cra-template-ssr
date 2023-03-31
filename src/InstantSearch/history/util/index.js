import qs from "qs";

const createURL = state => `?${qs.stringify(state)}`;

export const searchStateToUrl = searchState =>
	searchState ? createURL(searchState) : "";

export const urlToSearchState = ({ search }) => {
	console.log("converting url to search state:", search);
	const parsed = qs.parse(search.slice(1));
	console.log("parsed:", parsed);
	return parsed;
};
