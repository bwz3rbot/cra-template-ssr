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

export default function App() {
	return (
		<HelmetContext>
			<SnackbarProvider>
				<AuthContext>
					{/* Query Client must be a child of auth context or fetch will run twice */}
					<ApolloClientContextProvider>
						<UploadyContext>
							<ThemeContext>
								<NotificationsContext>
									<RouterContext>
										<Layout>
											<Pages />
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
