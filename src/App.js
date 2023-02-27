import { ThemeContext } from "./Theme";
import QueryClientContextProvider from "./Query";
import { RouterContext, Pages } from "./Router";
import AuthContext from "./Firebase";
import HelmetContext from "./Helmet";
import Layout from "./Layout";

import "./style.css";

export default function App() {
	return (
		<HelmetContext>
			<AuthContext>
				{/* Query Client must be a child of auth context or fetch will run twice */}
				<QueryClientContextProvider enableLogging>
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
