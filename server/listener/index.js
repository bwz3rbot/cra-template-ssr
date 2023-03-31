import fs from "fs";
import path from "path";
import express from "express";
import React from "react";

import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { findResultsState } from "react-instantsearch-dom/server";

import { searchClient } from "../../src/InstantSearch/algoliasearch";
import InstantSearch from "../../src/InstantSearch/server";

import SSRApp from "../App";

const app = express();

const PORT = process.env.PORT || 8080;
const build = path.resolve(__dirname, "..", "..", "build");
const indexFilepath = path.resolve(build, "index.html");

fs.readFile(indexFilepath, "utf-8", async (err, data) => {
	app.use("*", (req, res, next) => {
		console.log("request:", req.url);
		next();
	});
	app.use("/eb-health", (req, res) => {
		// Elastic Beanstalk health check endpoint
		console.log("eb-health check");
		res.send("OK");
	});

	// serve all the static files to the client
	app.use(
		express.static(build, {
			// don't serve the index.html page! redirect to the root instead
			index: false,
			// don't cache the static files
			maxAge: 0,
		})
	);

	app.get("*", cookieParser(), async (req, res, next) => {
		const htmlString = `${data}`; // don't alter the original html string - instead make a copy

		const user = await new Promise(async (resolve, reject) => {
			let token = req.cookies.token;
			if (token) token = token.replace("Bearer ", "");
			verify(token, process.env.JWT_SECRET, (err, decoded) => {
				resolve(decoded);
			});
		});
		console.log("got user back:", user);

		let resultsState = {};
		try {
			console.log("findResultsState");
			resultsState = await findResultsState(InstantSearch, {
				searchClient,
				indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
			});
		} catch (err) {
			console.log("findResultsState error:", err);
		}
		const helmetContext = {};
		const routerContext = {};
		console.log(resultsState);

		let markup;
		try {
			markup = await renderToStringWithData(
				<SSRApp
					helmetContext={helmetContext}
					instantSearchResultsState={resultsState}
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
			console.log("Error building the app - redirect to the error page");
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
