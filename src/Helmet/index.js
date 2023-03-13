import { Helmet, HelmetProvider } from "react-helmet-async";
export default function HelmetContext({ children }) {
	return (
		<HelmetProvider>
			<Helmet>
				{/* Basic Tags */}
				<title>{process.env.REACT_APP_SITE_NAME}</title>
				<meta
					name="description"
					content={process.env.REACT_APP_SITE_DESCRIPTION}
				/>
				<link rel="canonical" href={""} />
				{/* Facebook Tags */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content={window.location.href} />

				<meta
					property="og:title"
					content={process.env.REACT_APP_SITE_NAME}
				/>
				<meta
					property="og:description"
					content={process.env.REACT_APP_SITE_DESCRIPTION}
				/>
				<meta property="og:image" content={"/logo/round-56x56.png"} />
				{/* Twitter Tags */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={""} />
				<meta
					property="twitter:title"
					content={process.env.REACT_APP_SITE_NAME}
				/>
				<meta
					property="twitter:description"
					content={process.env.REACT_APP_SITE_DESCRIPTION}
				/>
				<meta property="twitter:image" content={""} />
			</Helmet>
			{children}
		</HelmetProvider>
	);
}
