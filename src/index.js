import React, { lazy } from "react";
import ReactDOM from "react-dom";
const App = lazy(() => import("./App"));

ReactDOM.hydrate(<App />, document.getElementById("root"));
