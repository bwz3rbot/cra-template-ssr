import Helmet from "../Helmet";
import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";

import Router, { RouterErrorBoundary } from "../Router";
import { Routes } from "../Router/Routes";

import Firebase from "../Firebase";

import Apollo from "../Apollo";

import Layout from "../Layout";
import Uploady from "../Upload";

import Notifications from "../Notifications";

import "./style.css";

export default function App() {
	return (
		<Helmet>
			<Theme>
				<Snackbar>
					<Router>
						<Firebase>
							<Apollo>
								<Layout variant="SPA">
									<Uploady>
										<Notifications>
											<RouterErrorBoundary>
												<Routes />
											</RouterErrorBoundary>
										</Notifications>
									</Uploady>
								</Layout>
							</Apollo>
						</Firebase>
					</Router>
				</Snackbar>
			</Theme>
		</Helmet>
	);
}
