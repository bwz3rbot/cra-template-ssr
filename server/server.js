import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "../src/App/SSRHandler";

const PORT = 8000;

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("*", (req, res, next) => {
	fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
		console.log("rendering StaticRouter with url:", req.url);
		if (err) {
			console.log(err);
			return res.status(500).send("Some error happened");
		}
		const markup = ReactDOMServer.renderToString(
			<StaticRouter location={req.url}>
				<App />
			</StaticRouter>
		);

		return res.send(
			data.replace(
				'<div id="root"></div>',
				`<div id="root">${markup}</div>`
			)
		);
	});
});

app.listen(PORT, () => {
	console.log(`App launched on ${PORT}`);
});
