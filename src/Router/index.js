import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "./Routes/Page/Error";

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

export const RouterErrorBoundary = ({ children }) => {
	return (
		<ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>
	);
};
