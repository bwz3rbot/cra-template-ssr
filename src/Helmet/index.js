import { Helmet, HelmetProvider } from "react-helmet-async";
export default function HelmetContext({ children }) {
	return (
		<HelmetProvider>
			<Helmet>
				<title>App Title</title>
				<meta name="description" content="Helmet application" />
				{/* IOS Search Bar Color */}
				<meta name="theme-color" content={"#000000"} />
			</Helmet>
			{children}
		</HelmetProvider>
	);
}
