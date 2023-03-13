import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
const RoundLogo = "logo/round-56x56.png";

export default function HelmetContext({ children }) {
	const location = useLocation();
	const port = window.location.port;
	const protocol = window.location.protocol;
	const hostname = window.location.hostname;
	const url = `${protocol}//${hostname}${port ? ":" + port : ""}${
		location.pathname
	}`;

	const Logo = `${protocol}//${hostname}${
		port ? ":" + port : ""
	}/${RoundLogo}`;

	const title = process.env.REACT_APP_SITE_NAME;
	const description = process.env.REACT_APP_SITE_DESCRIPTION;
	const keywords = process.env.REACT_APP_SITE_KEYWORDS || "";
	const creator = process.env.REACT_APP_SITE_CREATOR || "@BangoBotto";
	return (
		<HelmetProvider>
			<Helmet prioritizeSeoTags>
				{/* Basic Tags */}
				<title>{process.env.REACT_APP_SITE_NAME}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<link rel="canonical" href={""} />
				{/* Open Graph Tags */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={url} />

				<meta property="og:image" content={Logo} />
				<meta property="og:image:secure_url" content={Logo} />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content="56" />
				<meta property="og:image:height" content="56" />
				<meta property="og:image:alt" content={title} />
				<meta property="og:site_name" content={title} />
				<meta property="og:locale" content="en_US" />
				<meta property="og:locale:alternate" content="en_US" />

				{/* Twitter Tags */}

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content={creator} />
				<meta name="twitter:description" content={description} />

				<meta name="twitter:creator" content={creator} />
				<meta name="twitter:title" content={title} />

				<meta name="twitter:image" content={Logo} />
				<meta name="twitter:image:alt" content={title} />
			</Helmet>
			{children}
		</HelmetProvider>
	);
}
