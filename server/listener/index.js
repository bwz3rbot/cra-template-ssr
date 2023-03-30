import fs from "fs";
import path from "path";
import express from "express";
import React from "react";

import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import App from "../../src/App";
import Cookies from "../../src/Cookies";
import cookieParser from "cookie-parser";
import { Auth0SSRUserProvider } from "../../src/Auth";
import { verify } from "jsonwebtoken";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { SSRProvider } from "react-aria";
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

	// serve all the static files to the client
	app.use(
		express.static(build, {
			// don't serve the index.html page! redirect to the root instead
			index: false,
		})
	);

	app.get("*", cookieParser(), async (req, res, next) => {
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
		let markup;
		try {
			markup = await renderToStringWithData(
				<HelmetProvider context={helmetContext}>
					<StaticRouter location={req.url} context={routerContext}>
						<Cookies req={req} res={res}>
							<SSRProvider>
								<Auth0SSRUserProvider user={user}>
									<App />
								</Auth0SSRUserProvider>
							</SSRProvider>
						</Cookies>
					</StaticRouter>
				</HelmetProvider>
			);
		} catch (e) {
			console.log(e);
		}
		if (!markup) {
			// Error building the app - redirect to the error page
			return res.redirect(301, "/error");
		}

		const { helmet } = helmetContext;
		if (routerContext.url) {
			// Somewhere a `<Redirect>` was rendered
			return res.redirect(301, routerContext.url);
		}

		// extract the helmet data from the context
		const head = `
		  ${helmet.title.toString()}
		  ${helmet.priority.toString()}
		  ${helmet.meta.toString()}
		  ${helmet.link.toString()}
		  ${helmet.script.toString()}`;

		// update the html string with the new markup and the helmet data
		// and return it to the client
		res.send(
			htmlString
				.replace(
					'<div id="root"></div>',
					`<div id="root">${markup}</div>`
				)
				.replace("<head>", `<head>${head}`)
		);
	});

	app.listen(PORT, () => {
		console.log(`App launched on ${PORT}`);
	});
});
