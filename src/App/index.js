import Head from "../Head";
import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";
import Apollo from "../Apollo";
import Notifications from "../Notifications";

import Layout from "../Layout";
import Uploady from "../Upload";

import { Routes } from "../Router/Routes";

import "./style.css";
import Cookies from "../Cookies";
import { Auth0Provider } from "@auth0/auth0-react";
import Analytics from "../Google/Analytics";

export default function App() {
	return (
		<Analytics>
			<Cookies>
				<Head />
				<Theme>
					<Snackbar>
						<Auth0Provider
							domain={process.env.REACT_APP_AUTH0_DOMAIN}
							clientId={process.env.REACT_APP_AUTH0_CLIENTID}
							authorizationParams={{
								redirect_uri:
									process.env.REACT_APP_AUTH0_CALLBACK_URL,
							}}
						>
							<Apollo>
								<Notifications>
									<Layout variant="standard">
										<Uploady>
											<Routes />
										</Uploady>
									</Layout>
								</Notifications>
							</Apollo>
						</Auth0Provider>
					</Snackbar>
				</Theme>
			</Cookies>
		</Analytics>
	);
}
