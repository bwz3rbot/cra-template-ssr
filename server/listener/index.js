import fs from "fs";
import path from "path";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import { SSRLocationContext } from "../../src/Head/SSRLocationContext";
import App from "../../src/App";
import Cookies from "../../src/Cookies";
import cookieParser from "cookie-parser";
import { SSRUserProvider } from "../../src/Auth";
import { verify } from "jsonwebtoken";

const app = express();

let PORT = process.env.PORT || 8080;
PORT = `${PORT}`; // convert to string so SSRLocationContext doesn't break
const build = path.resolve(__dirname, "..", "..", "build");
const indexFilepath = path.resolve(build, "index.html");

const createHash = str => {
	// simple hash function used to generate page keys for reac-router-dom while in ssr mode
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
	app.use(cookieParser());

	app.get("*", async (req, res, next) => {
		let htmlString = `${data}`; // don't alter the original html string - instead make a copy

		const user = await new Promise(async (resolve, reject) => {
			let token = req.cookies.token;
			if (token) token = token.replace("Bearer ", "");
			verify(token, process.env.JWT_SECRET, (err, decoded) => {
				resolve(decoded);
			});
		});

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
						<Cookies req={req} res={res}>
							<SSRUserProvider user={user}>
								<App />
							</SSRUserProvider>
						</Cookies>
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

	app.use(express.static(build));

	app.listen(PORT, () => {
		console.log(`App launched on ${PORT}`);
	});
});
