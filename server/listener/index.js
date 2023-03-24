import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { SSRLocationContext } from "../../src/Head/SSRLocationContext";
import Firebase from "../Firebase";
import App from "../App";

const app = express();
let PORT = process.env.PORT || 8080;
PORT = `${PORT}`; // convert to string
const build = path.resolve(__dirname, "..", "..", "build");
const indexFilepath = path.resolve(build, "index.html");

fs.readFile(indexFilepath, "utf-8", async (err, data) => {
	app.use("/eb-health", (req, res) => {
		// Elastic Beanstalk health check endpoint
		res.send("OK");
	});

	app.use(express.static(build));

	app.use(express.json());
	app.post("/api/auth/login", async (req, res) => {
		console.log(req.body);
		res.send("Hello World!");
		const signInResponse = await Firebase.signInWithEmailAndPassword(
			req.body.email,
			req.body.password
		);
		console.log(signInResponse);
		return signInResponse;
	});
	app.post("/api/auth/signup", async (req, res) => {
		let user;
		let error;
		try {
			user = await Firebase.createUser(req.body.email, req.body.password);
			res.status(201).send({ user });
		} catch (err) {
			error = err;
			res.status(400).send({ error });
		}
	});

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
					>
						<App />
					</SSRLocationContext>
				</StaticRouter>
			</HelmetProvider>
		);
		const { helmet } = helmetContext;
		console.log({ routerContext });
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
