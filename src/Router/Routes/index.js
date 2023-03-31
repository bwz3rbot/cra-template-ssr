import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Suspend } from "../Suspend";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "./Page/Error"; // can't lazyload the error page. needs to be available immediately
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingScreen from "../../Component/LoadingScreen";

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
import PageHome from "./Page/Home";
import PageAbout from "./Page/About";
import PageLanding from "./Page/Landing";
import PageSettings from "./Page/Settings";
import PageSubscribe from "./Page/Subscribe";
import PageLibrary from "./Page/Library";

import PageAuthorize from "./Page/Authorize";
import PageSignIn from "./Page/SignIn";
import PageSignOut from "./Page/SignOut";

import { Grid } from "@mui/material";

const ProtectedRoute = ({ component }) => {
	const location = useLocation();
	const returnTo = location.pathname + location.search;

	console.log({ returnTo });
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => (
			<Grid
				container
				sx={{
					height: "var(--app-height)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<LoadingScreen loading />
			</Grid>
		),
		loginOptions: {
			authorizationParams: {
				// /authorize page will redirect to the returnTo url
				redirect_uri: `${process.env.REACT_APP_AUTH0_CALLBACK_URL}?returnTo=${location.pathname}`,
				// these scopes are required to create the access token
				// used to interact with the api
				scope: "read:current_user offline_access",
			},
			fragment: location.pathname,
		},
		returnTo,
	});
	return <Component />;
};

export default function AppRoutes() {
	const location = useLocation();
	console.log("rendering route", location.pathname);
	return (
		<ErrorBoundary
			// resetKeys is used to reset the error boundary when the location changes
			// without this the router context will lose its location state
			// and navigating to a new page will not work
			resetKeys={[location.pathname, location.search, location.hash]}
			FallbackComponent={PageError}
			onError={(error, componentStack, resetErrorBoundary) => {
				console.log("Error rendering route: ", {
					error,
					componentStack,
					resetErrorBoundary,
				});
			}}
		>
			<Routes>
				<Route
					path="/"
					element={
						<Suspend>
							<PageLanding />
						</Suspend>
					}
				/>
				<Route
					path="/authorize"
					element={
						<Suspend>
							<PageAuthorize />
						</Suspend>
					}
				></Route>
				<Route
					path="/contact"
					element={
						<Suspend>
							<Helmet title="Contact bingobangobotto" />
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
					path="/library"
					element={
						<Suspend>
							<ProtectedRoute component={PageLibrary} />
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
					path="/signout"
					element={
						<Suspend>
							<PageSignOut />
						</Suspend>
					}
				/>

				<Route
					path="/error"
					element={
						<Suspend>
							<PageError />
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
			</Routes>
		</ErrorBoundary>
	);
}
