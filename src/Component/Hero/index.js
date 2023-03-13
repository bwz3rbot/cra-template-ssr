import { Grid, Card, Box, Typography } from "@mui/material";
import { useDarkMode } from "../../Theme";
export default function Hero() {
	const { mode } = useDarkMode();
	const img = {
		dark: {
			url: "/hero/dark.webp",
			alt: "Dark Hero",
			href: "/hero/dark.webp",
		},
		light: {
			url: "/hero/light.webp",
			alt: "Light Hero",
			href: "/hero/light.webp",
		},
	};

	return (
		<>
			<link
				rel="preload"
				fetchpriority="high"
				as="image"
				href={mode === "dark" ? img.dark.href : img.light.href}
			/>
			<Box
				sx={{
					width: "100%",
					backgroundColor: "primary.main",
					backgroundImage: `url(${
						mode === "dark" ? img.dark.url : img.light.url
					})`,
					// blur background image
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					maxHeight: "65vh",
					height: "750px",
					marginBottom: 6,
				}}
			>
				<Grid
					item
					sx={{
						// offset items slightly above center line
						transform: "translateY(-10%)",
						// unblur foreground from container
						zIndex: 1,
						filter: "blur(0px)",
					}}
				>
					<Typography
						sx={{
							color: "primary.contrastText",
							fontWeight: "bold",
							fontSize: "2rem",
							textAlign: "center",
							padding: 1,
						}}
					>
						{process.env.REACT_APP_SITE_NAME}
					</Typography>
					<Typography
						sx={{
							color: "primary.contrastText",
							fontWeight: "bold",
							fontSize: "1.5rem",
							textAlign: "center",
							padding: 1,
						}}
					>
						{process.env.REACT_APP_SITE_TAGLINE}
					</Typography>
				</Grid>
			</Box>
		</>
	);
}
