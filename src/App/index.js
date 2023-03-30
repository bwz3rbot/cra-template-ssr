import Head from "../Head";
import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";
import Apollo from "../Apollo";
import Notifications from "../Notifications";

import Layout from "../Layout";
import Uploady from "../Upload";

import Routes from "../Router/Routes";

import Auth from "../Auth";
import "./style.css";

export default function App() {
	return (
		<Theme>
			<Head />
			<Snackbar>
				<Auth>
					<Apollo>
						<Notifications>
							<Layout variant="standard">
								<Uploady>
									<Routes />
								</Uploady>
							</Layout>
						</Notifications>
					</Apollo>
				</Auth>
			</Snackbar>
		</Theme>
	);
}
