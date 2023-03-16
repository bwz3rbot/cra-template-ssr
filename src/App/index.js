import Logger from "../Logger";
import "../Google/Analytics/Init";
import "../Google/TagManager/Init";

import Head from "../Head";
import Router from "../Router";

import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";

import Firebase from "../Firebase";

import Apollo from "../Apollo";
import Notifications from "../Notifications";

import Layout from "../Layout";
import Uploady from "../Upload";

import { Routes } from "../Router/Routes";

import "./style.css";

export default function App() {
	return (
		<Router>
			<Head />
			<Logger>
				<Theme>
					<Snackbar>
						<Firebase>
							<Apollo>
								<Notifications>
									<Layout variant="standard">
										<Uploady>
											<Routes />
										</Uploady>
									</Layout>
								</Notifications>
							</Apollo>
						</Firebase>
					</Snackbar>
				</Theme>
			</Logger>
		</Router>
	);
}
