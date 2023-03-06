import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoadingScreen from "../Component/Loading";

import { Suspense, lazy } from "react";

import { Restrict } from "./Restrict";
const Page404 = lazy(() => import("../Page/404"));
const PageSignIn = lazy(() => import("../Page/SignIn"));
const PageHome = lazy(() => import("../Page/Home"));

const PageAbout = lazy(() => import("../Page/About"));
const PageLanding = lazy(() => import("../Page/Landing"));
const PageSettings = lazy(() => import("../Page/Settings"));

export default function RouterContextProvider({ children }) {
	return (
		<BrowserRouter
			window={typeof window !== "undefined" ? window : undefined}
			basename="/"
		>
			{children}
		</BrowserRouter>
	);
}

const Suspend = ({ children }) => {
	return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};
export const Pages = () => {
	return (
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
					<Suspend fallback={<LoadingScreen />}>
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
				path="*"
				element={
					<Suspend>
						<Page404 />
					</Suspend>
				}
			/>
		</Routes>
	);
};
