import { Routes as RouteContext, Route } from "react-router-dom";
import { Suspend } from "../Suspend";
import { Restrict } from "../Restrict";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import PageError from "./Page/Error"; // can't lazyload the error page. needs to be available immediately
import { lazy } from "react";
import { Helmet } from "react-helmet-async";

const Page404 = lazy(() => import("./Page/404"));
const PageContact = lazy(() => import("./Page/Contact"));
const PageSignIn = lazy(() => import("./Page/SignIn"));
const PageHome = lazy(() => import("./Page/Home"));
const PageAbout = lazy(() => import("./Page/About"));
const PageLanding = lazy(() => import("./Page/Landing"));
const PageSettings = lazy(() => import("./Page/Settings"));
const PageSubscribe = lazy(() => import("./Page/Subscribe"));

export const Routes = () => {
	const location = useLocation();
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
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - ${process.env.REACT_APP_SITE_DESCRIPTION}`}
							/>
							<PageLanding />
						</Suspend>
					}
				/>
				<Route
					path="/contact"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - Contact`}
							/>
							<PageContact />
						</Suspend>
					}
				/>
				<Route
					path="/signin"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - Sign In`}
							/>
							<PageSignIn />
						</Suspend>
					}
				/>
				<Route
					path="/home"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - Home`}
							/>
							<Restrict>
								<PageHome />
							</Restrict>
						</Suspend>
					}
				/>
				<Route
					path="/about"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - About Us`}
							/>
							<PageAbout />
						</Suspend>
					}
				/>
				<Route
					path={"/settings/:tab?"}
					exact={false}
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - Settings`}
							/>
							<Restrict>
								<PageSettings />
							</Restrict>
						</Suspend>
					}
				/>
				<Route
					path="/subscribe"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - Subscribe`}
							/>
							<Restrict>
								<PageSubscribe />
							</Restrict>
						</Suspend>
					}
				/>

				<Route
					path="*"
					element={
						<Suspend>
							<Helmet
								title={`${process.env.REACT_APP_SITE_NAME} - 404`}
							/>
							<Page404 />
						</Suspend>
					}
				/>
			</RouteContext>
		</ErrorBoundary>
	);
};
