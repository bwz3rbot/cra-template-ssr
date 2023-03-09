import HelmetContext from "../Helmet";
import FirebaseContext from "../Firebase";
import MessagingContext from "../Firebase/Messaging";
import ApolloClientContextProvider from "../Apollo";

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
					<MessagingContext>
						<ApolloClientContextProvider>
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
						</ApolloClientContextProvider>
					</MessagingContext>
				</FirebaseContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
