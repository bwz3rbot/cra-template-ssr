import React, { Component } from "react";
import PropTypes from "prop-types";
import { InstantSearch } from "react-instantsearch-dom";
import View from "../view";

class App extends Component {
	static propTypes = {
		indexName: PropTypes.string.isRequired,
		searchClient: PropTypes.object.isRequired,
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

	onSearchStateChange = nextSearchState =>
		this.setState({ searchState: nextSearchState });

	render() {
		const { searchState } = this.state;

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

export default App;
