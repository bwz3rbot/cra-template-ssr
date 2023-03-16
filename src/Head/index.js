import React from "react";
import { Helmet } from "react-helmet-async";
import { useDynamicLocation } from "./SSRLocationContext";
import { definePageData } from "./PageData";
const RoundLogo = "logo/round-56x56.png";

export default function HelmetContext() {
	// useDynamicLocation() is a wrapper around react-router-dom useLocation()
	// this hook will get its state from the ssr server request if it exists
	const { hostname, pathname, port, protocol } = useDynamicLocation();

	const url = `${protocol}://${hostname}${port ? ":" + port : ""}${pathname}`;

	const Logo = `${protocol}://${hostname}${
		port ? ":" + port : ""
	}/${RoundLogo}`;

	const keywords = process.env.REACT_APP_SITE_KEYWORDS || "";
	const creator = process.env.REACT_APP_SITE_CREATOR || "@BangoBotto";

	const { title, description } = definePageData(pathname);

	return (
		<Helmet prioritizeSeoTags>
			{/* Basic Tags */}
			<title>{title}</title>
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
	);
}
