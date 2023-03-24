import { Routes as RouteContext, Route } from "react-router-dom";
import { Suspend } from "../Suspend";
import { Restrict } from "../Restrict";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import PageError from "./Page/Error"; // can't lazyload the error page. needs to be available immediately
import { lazy } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

// const Page404 = lazy(() => import("./Page/404"));
// const PageContact = lazy(() => import("./Page/Contact"));
// const PageSignIn = lazy(() => import("./Page/SignIn"));
// const PageHome = lazy(() => import("./Page/Home"));
// const PageAbout = lazy(() => import("./Page/About"));
// const PageLanding = lazy(() => import("./Page/Landing"));
// const PageSettings = lazy(() => import("./Page/Settings"));
// const PageSubscribe = lazy(() => import("./Page/Subscribe"));

import Page404 from "./Page/404";
import PageContact from "./Page/Contact";
import PageSignIn from "./Page/SignIn";
import PageHome from "./Page/Home";
import PageAbout from "./Page/About";
import PageLanding from "./Page/Landing";
import PageSettings from "./Page/Settings";
import PageSubscribe from "./Page/Subscribe";
import { useDynamicLocation } from "../../Head/SSRLocationContext";
const ProtectedRoute = ({ component, ...args }) => {
	const Component = withAuthenticationRequired(component, {
		loginOptions: {
			authorizationParams: {
				redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			},
		},
	});
	return <Component {...args} />;
};
export const Routes = () => {
	const location = useDynamicLocation();
	return (
		<ErrorBoundary
			// resetKeys is used to reset the error boundary when the location changes
			// without this the router context will lose its location state
			// and navigating to a new page will not work
			resetKeys={[location.pathname, location.search, location.hash]}
			FallbackComponent={PageError}
		>
			<RouteContext>
				<Route
					path="/"
					element={
						<Suspend>
							<PageLanding />
						</Suspend>
					}
				/>
				<Route
					path="/contact"
					element={
						<Suspend>
							<PageContact />
						</Suspend>
					}
				/>
				<Route
					path="/signin"
					element={
						<Suspend>
							<PageSignIn />
						</Suspend>
					}
				/>
				<Route
					path="/home"
					element={
						<Suspend>
							<ProtectedRoute component={PageHome} />
						</Suspend>
					}
				/>
				<Route
					path="/about"
					element={
						<Suspend>
							<PageAbout />
						</Suspend>
					}
				/>
				<Route
					path={"/settings/:tab?"}
					exact={false}
					element={
						<Suspend>
							<ProtectedRoute component={PageSettings} />
						</Suspend>
					}
				/>
				<Route
					path="/subscribe"
					element={
						<Suspend>
							<ProtectedRoute component={PageSubscribe} />
						</Suspend>
					}
				/>

				<Route
					path="*"
					element={
						<Suspend>
							<Page404 />
						</Suspend>
					}
				/>
			</RouteContext>
		</ErrorBoundary>
	);
};
