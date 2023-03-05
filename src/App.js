import HelmetContext from "./Helmet";
import AuthContext from "./Firebase";
import UploadyContext from "./Upload";
import ApolloClientContextProvider from "./Apollo";
import ThemeContext from "./Theme";
import Layout from "./Layout";
import NotificationsContext from "./Notifications";
import RouterContext, { Pages } from "./Router";
import { SnackbarProvider } from "notistack";
import "./style.css";

export default function App({ children }) {
	return (
		<HelmetContext>
			<SnackbarProvider>
				<AuthContext>
					<ApolloClientContextProvider>
						<UploadyContext>
							<ThemeContext>
								<NotificationsContext>
									<RouterContext>
										<Layout>{children}</Layout>
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
