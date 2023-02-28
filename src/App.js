import HelmetContext from "./Helmet";
import AuthContext from "./Firebase";
import QueryClientContextProvider from "./Query";
import ThemeContext from "./Theme";
import Layout from "./Layout";
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
							<RouterContext>
								<Layout>
									<Pages />
								</Layout>
							</RouterContext>
						</ThemeContext>
					</QueryClientContextProvider>
				</AuthContext>
			</SnackbarProvider>
		</HelmetContext>
	);
}
