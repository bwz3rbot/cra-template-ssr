import Head from "../Head";

import Theme from "../Theme";

import { SnackbarProvider as Snackbar } from "notistack";
import Auth from "../Auth";
import Apollo from "../Apollo";
import Notifications from "../Notifications";

import Layout from "../Layout";
import Uploady from "../Upload";

import { Routes } from "../Router/Routes";

import "./style.css";
import Cookies from "../Cookies";

export default function App() {
	return (
		<>
			<Cookies>
				<Head />
				<Theme>
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
			</Cookies>
		</>
	);
}
