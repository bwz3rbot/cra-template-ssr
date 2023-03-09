import HelmetContext from "../Helmet";
import { SnackbarProvider } from "notistack";

import FirebaseContext from "../Firebase";

import ApolloClientContext from "../Apollo";
import NotificationsContext from "../Notifications";

import UploadyContext from "../Upload";
import ThemeContext from "../Theme";

import RouterContext from "../Router";
import Layout from "../Layout";
import { Routes } from "../Router/Routes";

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
										<Layout variant="SPA">
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
