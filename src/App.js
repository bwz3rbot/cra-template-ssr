import HelmetContext from "./Helmet";
import AuthContext from "./Firebase";
import QueryClientContextProvider from "./Query";
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
					<QueryClientContextProvider>
						<ThemeContext>
							<NotificationsContext>
								<RouterContext>
									<Layout>
										<Pages />
									</Layout>
								</RouterContext>
							</NotificationsContext>
						</ThemeContext>
					</QueryClientContextProvider>
				</AuthContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
