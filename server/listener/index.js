import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { SSRLocationContext } from "../../src/Head/SSRLocationContext";
import App from "../../src/App";

const Auth = require("../Router/Auth/auth0");
const app = express();
let PORT = process.env.PORT || 8080;
PORT = `${PORT}`; // convert to string
const build = path.resolve(__dirname, "..", "..", "build");
const indexFilepath = path.resolve(build, "index.html");
const createHash = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
};
fs.readFile(indexFilepath, "utf-8", async (err, data) => {
	app.use("/eb-health", (req, res) => {
		// Elastic Beanstalk health check endpoint
		res.send("OK");
	});

	app.use(express.static(build));

	// app.use("/api/auth", express.json(), Auth);

	app.get("*", async (req, res, next) => {
		let htmlString = `${data}`;

		const helmetContext = {};
		const routerContext = {};
		const markup = ReactDOMServer.renderToString(
			<HelmetProvider context={helmetContext}>
				<StaticRouter location={req.url} context={routerContext}>
					<SSRLocationContext
						hostname={req.hostname}
						pathname={req.path}
						port={
							PORT === "80" || PORT === "443" || PORT === "8080"
								? ""
								: PORT
						}
						protocol={req.protocol}
						hash={
							req.url.includes("#")
								? req.url.split("#")[1]
								: createHash(req.url)
						}
					>
						<App />
					</SSRLocationContext>
				</StaticRouter>
			</HelmetProvider>
		);
		const { helmet } = helmetContext;
		if (routerContext.url) {
			// Somewhere a `<Redirect>` was rendered
			res.redirect(301, routerContext.url);
		} else {
			// we're good, send the response
		}

		const head = `
		  ${helmet.title.toString()}
		  ${helmet.priority.toString()}
		  ${helmet.meta.toString()}
		  ${helmet.link.toString()}
		  ${helmet.script.toString()}`;

		res.send(
			htmlString
				.replace(
					'<div id="root"></div>',
					`<div id="root">${markup}</div>`
				) // place the app in the root div
				.replace("<head>", `<head>${head}`) // place the helmet data in the head
		);
	});

	app.listen(PORT, () => {
		console.log(`App launched on ${PORT}`);
	});
});
