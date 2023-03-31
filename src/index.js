import React from "react";
import { render } from "react-dom";

import { HelmetProvider } from "react-helmet-async";
import Analytics from "./Google/Analytics";

import App from "./App";
import Router from "./Router";
import Cookies from "./Cookies";

// TODO: uninstall unused deps - https://stackoverflow.com/questions/22675725/find-unused-npm-packages-in-package-json

// this script is invoked when using npm run develop
// this will only be called on the client so helmet provider must be passed here.
// the ssr server passes its own instance of helmet provider to the app

const rootElement = document.getElementById("root");

// if (rootElement.hasChildNodes()) {
// 	// this will be called after the app is hydrated on the client
// 	hydrate(<App />, rootElement);
// } else {
// this will be called on the client when the app is first rendered
render(
	// helmet provider must be passed here because the server will pass its own instance of helmet provider to the app
	// in order to gain access to the values set by its children
	<HelmetProvider>
		<Router>
			<Cookies>
				<Analytics>
					<App />
				</Analytics>
			</Cookies>
		</Router>
	</HelmetProvider>,
	rootElement
);
// }
