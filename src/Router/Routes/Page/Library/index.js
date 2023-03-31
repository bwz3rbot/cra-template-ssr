import { BodyHeight, useLayoutVariant } from "../../../../Layout";
import InstantSearchContextProviderWithHistory from "../../../../InstantSearch/history";
import InstantSearchView from "../../../../InstantSearch/view";
import { useIsSSR } from "react-aria";
export default function LibraryPage() {
	useLayoutVariant({ variant: "SPA" });
	const isSSR = useIsSSR();
	const SSRContextProvider = () => {
		if (!isSSR) {
			return (
				<InstantSearchContextProviderWithHistory>
					<InstantSearchView />
				</InstantSearchContextProviderWithHistory>
			);
		}
		return <InstantSearchView />;
	};
	return (
		<BodyHeight>
			<SSRContextProvider />
		</BodyHeight>
	);
}
