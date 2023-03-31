import { RefinementList, Hits } from "react-instantsearch-dom";
export default function View() {
	return (
		<>
			<RefinementList attribute="author_name" />
			<Hits
				hitComponent={({ hit }) => {
					return (
						<div>
							<h6>{hit.post_title}</h6>
							<img src={hit.image} alt={hit.image} />
						</div>
					);
				}}
			/>
		</>
	);
}
