import HelmetContext from "../Helmet";
import FirebaseContext from "../Firebase";
import ApolloClientContext from "../Apollo";

import { SnackbarProvider } from "notistack";
import NotificationsContext from "../Notifications";

import UploadyContext from "../Upload";

import ThemeContext from "../Theme";

import RouterContext from "../Router";
import { Routes } from "../Router/Routes";
import Layout from "../Layout";

import "./style.css";

export default function App() {
	return (
		<HelmetContext>
			<SnackbarProvider>
				<FirebaseContext>
					<ApolloClientContext>
						<UploadyContext>
							<ThemeContext>
								<NotificationsContext>
									<RouterContext>
										<Layout>
											<Routes />
										</Layout>
									</RouterContext>
								</NotificationsContext>
							</ThemeContext>
						</UploadyContext>
					</ApolloClientContext>
				</FirebaseContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
