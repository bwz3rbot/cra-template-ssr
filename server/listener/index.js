import fs from "fs";
import path from "path";
import express from "express";
import React from "react";

import SSRApp from "../App";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { findResultsState } from "react-instantsearch-dom/server";

import { searchClient } from "../../src/InstantSearch";

// import template from "./template";

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

		console.log("awaiting resultsState...");
		let resultsState = {};
		// try {
		// 	resultsState = await findResultsState(SSRApp, {
		// 		searchClient,
		// 		indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
		// 		helmetContext: {},
		// 		instantSearchState: {
		// 			searchState: {},
		// 			resultsState: {},
		// 			widgetsCollector: () => {},
		// 			searchClient,
		// 		},
		// 		req,
		// 		res,
		// 		user,
		// 		routerContext: {},
		// 	});
		// } catch (err) {
		// 	console.log("findResultsState error:", err);
		// 	process.exit();
		// }
		console.log("after awaiting resultsState:", resultsState);
		const helmetContext = {};
		const routerContext = {};
		const initialState = {
			searchState: {},
			resultsState,
			searchClient,
			widgetsCollector: () => {},
		};
		let markup;
		console.log("awaiting renderToStringWithData...");
		try {
			markup = await renderToStringWithData(
				<SSRApp
					helmetContext={helmetContext}
					instantSearchState={initialState}
					req={req}
					res={res}
					user={user}
					routerContext={routerContext}
				/>
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
