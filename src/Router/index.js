import {
	Page404,
	PageSignIn,
	PageHome,
	PageAbout,
	PageLanding,
	PageSettings,
} from "../Page";
import { BrowserRouter, useRoutes } from "react-router-dom";

import { Restrict } from "./Restrict";

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
export const useRouter = () => {
	const element = useRoutes([
		{
			path: "/",
			element: <PageLanding />,
		},
		{
			path: "/signin",
			element: <PageSignIn />,
		},
		{
			path: "/home",
			element: (
				<Restrict>
					<PageHome />
				</Restrict>
			),
		},
		{
			path: "/about",
			element: <PageAbout />,
		},
		{
			path: "/settings",
			element: (
				<Restrict>
					<PageSettings />
				</Restrict>
			),
		},
		{
			path: "*",
			element: <Page404 />,
		},
	]);
	return element;
};
