import React from "react";
import "./Google/Analytics/Init";
import "./Google/TagManager/Init";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import LoadingScreen from "./Component/LoadingScreen";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Suspense fallback={<LoadingScreen />}>
			<App />
		</Suspense>
	</React.StrictMode>
);
