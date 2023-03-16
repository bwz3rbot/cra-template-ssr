import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { SSRLocationContext } from "../../src/Head/SSRLocationContext";

import App from "../App";

const app = express();
const PORT = process.env.PORT || 8080;
const build = path.resolve(__dirname, "..", "..", "build");
const indexFilepath = path.resolve(build, "index.html");

fs.readFile(indexFilepath, "utf-8", async (err, data) => {
	app.use("/eb-health", (req, res) => {
		// Elastic Beanstalk health check endpoint
		res.send("OK");
	});

	app.use(express.static(build));

	app.get("*", async (req, res, next) => {
		let htmlString = `${data}`;

		const helmetContext = {};
		const markup = ReactDOMServer.renderToString(
			<HelmetProvider context={helmetContext}>
				<StaticRouter location={req.url}>
					<SSRLocationContext
						hostname={req.hostname}
						pathname={req.path}
						port={req.socket.localPort}
						protocol={req.protocol}
					>
						<App />
					</SSRLocationContext>
				</StaticRouter>
			</HelmetProvider>
		);
		const { helmet } = helmetContext;

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
