import {
	Page404,
	PageSignIn,
	PageHome,
	PageAbout,
	PageLanding,
	PageSettings,
} from "../Page";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useAuthContext } from "../Firebase";

const Restrict = ({ children, allowAnonymous }) => {
	const { user } = useAuthContext();

	// handle anonymous user
	if (user?.isAnonymous && allowAnonymous) {
		return <>{children}</>;
	}

	// handle authenticated user
	if (user && !user.isAnonymous) {
		return <>{children}</>;
	}

	// handle unauthenticated user
	return <Navigate to="/signin" />;
};

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
export const Pages = () => {
	return (
		<Routes>
			<Route path="/" element={<PageLanding />} />
			<Route path="/signin" element={<PageSignIn />} />
			<Route
				path="/home"
				element={
					<Restrict>
						<PageHome />
					</Restrict>
				}
			/>
			<Route path="/about" element={<PageAbout />} />
			<Route
				path="/settings"
				element={
					<Restrict>
						<PageSettings />
					</Restrict>
				}
			/>
			<Route path="*" element={<Page404 />} />
		</Routes>
	);
};
