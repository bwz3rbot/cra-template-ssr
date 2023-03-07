import React from "react";
import "./Google/Analytics/Init";
import "./Google/TagManager/Init";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
