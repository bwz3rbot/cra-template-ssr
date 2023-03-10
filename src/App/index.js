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
			<ThemeContext>
				<RouterContext>
					<SnackbarProvider>
						<FirebaseContext>
							<ApolloClientContext>
								<UploadyContext>
									<NotificationsContext>
										<Layout variant="SPA">
											<Routes />
										</Layout>
									</NotificationsContext>
								</UploadyContext>
							</ApolloClientContext>
						</FirebaseContext>
					</SnackbarProvider>
				</RouterContext>
			</ThemeContext>
		</HelmetContext>
	);
}
