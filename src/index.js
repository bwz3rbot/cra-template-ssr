import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Pages } from "./Router";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App>
			<Pages />
		</App>
	</React.StrictMode>
);
