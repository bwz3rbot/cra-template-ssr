import { BodyHeight, useLayoutVariant } from "../../../../Layout";
import InstantSearchView from "../../../../InstantSearch/view";
export default function SubscribePage() {
	useLayoutVariant({ variant: "SPA" });
	return (
		<BodyHeight>
			<InstantSearchView />
		</BodyHeight>
	);
}
