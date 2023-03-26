import Head from "../Head";
import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";
import Apollo from "../Apollo";
import Notifications from "../Notifications";

import Layout from "../Layout";
import Uploady from "../Upload";

import { Routes } from "../Router/Routes";

import AuthContext from "../Auth";
import Analytics from "../Google/Analytics";
import "./style.css";

export default function App() {
	return (
		<Analytics>
			<Head />
			<Theme>
				<Snackbar>
					<AuthContext>
						<Apollo>
							<Notifications>
								<Layout variant="standard">
									<Uploady>
										<Routes />
									</Uploady>
								</Layout>
							</Notifications>
						</Apollo>
					</AuthContext>
				</Snackbar>
			</Theme>
		</Analytics>
	);
}
