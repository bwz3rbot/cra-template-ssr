import HelmetContext from "./Helmet";
import AuthContext from "./Firebase";
import QueryClientContextProvider from "./Query";
import ThemeContext from "./Theme";
import Layout from "./Layout";
import RouterContext, { Pages } from "./Router";
import "./style.css";

export default function App() {
	return (
		<HelmetContext>
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
		</HelmetContext>
	);
}
