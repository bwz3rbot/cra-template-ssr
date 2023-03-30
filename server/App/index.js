import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import Cookies from "../../src/Cookies";
import { SSRProvider } from "react-aria";
import { Auth0SSRUserProvider } from "../../src/Auth";
import InstantSearch from "../../src/InstantSearch";
import App from "../../src/App";
export default function SSRApp({
	req,
	res,
	user,
	instantSearchState,
	helmetContext,
	routerContext,
}) {
	console.log("Rendering SSR App");
	console.log("req?.url:", req?.url);
	console.log("user:", user);
	console.log("instantSearchState:", instantSearchState);
	console.log("helmetContext:", helmetContext);
	console.log("routerContext:", routerContext);

	return (
		<HelmetProvider context={helmetContext}>
			<StaticRouter location={req.url} context={routerContext}>
				<Cookies req={req} res={res}>
					<SSRProvider>
						<Auth0SSRUserProvider user={user}>
							<InstantSearch initialState={instantSearchState}>
								<App />
							</InstantSearch>
						</Auth0SSRUserProvider>
					</SSRProvider>
				</Cookies>
			</StaticRouter>
		</HelmetProvider>
	);
}
