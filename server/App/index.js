import React, { useEffect, useState, lazy } from "react";
import Head from "../../src/Head";
// const App = lazy(() => import("../../src/App"));
import App from "../../src/App";
const useIsSsr = () => {
	// we always start off in "SSR mode", to ensure our initial browser render
	// matches the SSR render
	const [isSsr, setIsSsr] = useState(true);

	useEffect(() => {
		// `useEffect` never runs on the server, so we must be on the client if
		// we hit this block
		setIsSsr(false);
	}, []);

	return isSsr;
};

/* 
	This component's purpose is to render the head on the server and the app on the client.
	We only want to render the head so that we can easily set the title and other meta tags
	before returning the html to the client.
 */
export default function SSRApp() {
	const isSsr = useIsSsr();
	// we're on the server, so we need to render the head -
	// these values will be extracted using helmet context and then passed into the html template
	if (isSsr) return <App />;
	// we're on the client, so the head is rendered inside of the app
	return <App />;
}
