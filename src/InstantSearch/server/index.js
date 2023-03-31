import React, { Component } from "react";
import PropTypes from "prop-types";
import { InstantSearch } from "react-instantsearch-dom";
import { searchClient } from "../algoliasearch";
import View from "../view";

export const InstantSearchSSRContextProvider = ({
	children,
	resultsState,
	searchState,
}) => {
	let options = {
		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		searchClient,
	};
	if (resultsState) options.resultsState = resultsState;
	if (searchState) options.searchState = searchState;
	return <InstantSearch {...options}>{children}</InstantSearch>;
};

export default class PreRenderResultsProvider extends Component {
	static propTypes = {
		indexName: PropTypes.string.isRequired,
		// searchClient: PropTypes.object.isRequired,
		searchState: PropTypes.object,
		resultsState: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.object),
			PropTypes.object,
		]),
	};

	static defaultProps = {
		searchState: {},
	};

	state = {
		searchState: this.props.searchState,
	};

	onSearchStateChange = nextSearchState => {
		this.setState({ searchState: nextSearchState });
	};

	render() {
		const { searchState } = this.state;

		console.log("rendering with searchState:", searchState);

		return (
			<InstantSearch
				{...this.props}
				searchState={searchState}
				onSearchStateChange={this.onSearchStateChange}
			>
				<View />
			</InstantSearch>
		);
	}
}
