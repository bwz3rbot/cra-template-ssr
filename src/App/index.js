import HelmetContext from "../Helmet";
import AuthContext from "../Firebase";
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
				<AuthContext>
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
				</AuthContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
