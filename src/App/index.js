import HelmetContext from "../Helmet";
import AuthContext from "../Firebase";
import UploadyContext from "../Upload";
import ApolloClientContextProvider from "../Apollo";
import ThemeContext from "../Theme";
import NotificationsContext from "../Notifications";
import RouterContext, { Routes } from "../Router";
import { SnackbarProvider } from "notistack";
import View from "../View";
import "./style.css";

export default function App() {
	return (
		<HelmetContext>
			<SnackbarProvider>
				<AuthContext>
					<ApolloClientContextProvider>
						<UploadyContext>
							<NotificationsContext>
								<ThemeContext>
									<RouterContext>
										<View />
									</RouterContext>
								</ThemeContext>
							</NotificationsContext>
						</UploadyContext>
					</ApolloClientContextProvider>
				</AuthContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
