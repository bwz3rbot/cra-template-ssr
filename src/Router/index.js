import PageLanding from "../Page/Landing";
import PageAbout from "../Page/About";
import Page404 from "../Page/404";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
			<Route path="/about" element={<PageAbout />} />
			<Route path="*" element={<Page404 />} />
		</Routes>
	);
};
