import "../Google/Analytics/Init";
import "../Google/TagManager/Init";
import Router from "../Router";
import Helmet from "../Helmet";
import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";

import { Routes } from "../Router/Routes";

import Firebase from "../Firebase";

import Apollo from "../Apollo";

import Layout from "../Layout";
import Uploady from "../Upload";

import Notifications from "../Notifications";

import "./style.css";

export default function App() {
	return (
		<Router>
			<Helmet>
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
			</Helmet>
		</Router>
	);
}
