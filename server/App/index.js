import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import Cookies from "../../src/Cookies";
import { SSRProvider } from "react-aria";
import { Auth0SSRUserProvider } from "../../src/Auth";
import { InstantSearchSSRContextProvider } from "../../src/InstantSearch/server";
import App from "../../src/App";
export default function SSRApp({
	req,
	res,
	user,
	instantSearchResultsState,
	instantSearchSearchState,
	helmetContext,
	routerContext,
}) {
	return (
		<HelmetProvider context={helmetContext}>
			<StaticRouter location={req.url} context={routerContext}>
				<Cookies req={req} res={res}>
					<SSRProvider>
						<Auth0SSRUserProvider user={user}>
							<InstantSearchSSRContextProvider
								resultsState={instantSearchResultsState}
								searchState={instantSearchSearchState}
							>
								<App />
							</InstantSearchSSRContextProvider>
						</Auth0SSRUserProvider>
					</SSRProvider>
				</Cookies>
			</StaticRouter>
		</HelmetProvider>
	);
}
