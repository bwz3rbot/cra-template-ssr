import { Routes as RouteContext, Route } from "react-router-dom";
import { Suspend } from "../Suspend";
import { Restrict } from "../Restrict";

import { lazy } from "react";
const Page404 = lazy(() => import("./Page/404"));
const PageSignIn = lazy(() => import("./Page/SignIn"));
const PageHome = lazy(() => import("./Page/Home"));
const PageAbout = lazy(() => import("./Page/About"));
const PageLanding = lazy(() => import("./Page/Landing"));
const PageSettings = lazy(() => import("./Page/Settings"));
const PageSubscribe = lazy(() => import("./Page/Subscribe"));

export const Routes = () => {
	return (
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
						<PageAbout />
					</Suspend>
				}
			/>
			<Route
				path="/settings"
				element={
					<Suspend>
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
						<Page404 />
					</Suspend>
				}
			/>
		</RouteContext>
	);
};
