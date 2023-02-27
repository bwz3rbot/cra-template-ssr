import useCSSProps from "./useCSSProps";

import { ThemeContext } from "./Theme";
import { RouterContext, Pages } from "./Router";
import HelmetContext from "./Helmet";
import Layout from "./Layout";

import "./style.css";

export default function App() {
	useCSSProps();
	return (
		<HelmetContext>
			<ThemeContext>
				<RouterContext>
					<Layout>
						<Pages />
					</Layout>
				</RouterContext>
			</ThemeContext>
		</HelmetContext>
	);
}
