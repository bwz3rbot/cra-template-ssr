import HelmetContext from "./Helmet";
import AuthContext from "./Firebase";
import UploadyContext from "./Upload";
import ApolloClientContextProvider from "./Apollo";
import ThemeContext from "./Theme";
import Layout from "./Layout";
import NotificationsContext from "./Notifications";
import RouterContext, { Pages } from "./Router";
import { SnackbarProvider } from "notistack";
import SignInDialog from "./Component/SignInDialog";
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
											<SignInDialog />
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
